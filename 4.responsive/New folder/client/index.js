var datas = [];
var fdes = [];
var finalData = [];
var dropImg = [];
var dropDes = [];
var outputData = [];
var array = new Array();
var contentarr = new Array();
var contentarr1 = new Array();
var fiRes = new Array();
var tableimg;
var tabledes;
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("subbtn").disabled = true;
    var tableImage = document.getElementById('datas');
    var tableDes = document.getElementById('desdatas');
    tableimg = document.getElementById('myTable');
    tabledes = document.getElementById('mydesTable');
     if(tableImage.rows.length == 0){
         if(!!tableimg){tableimg.hidden = true;}
     };
     if(tableDes.rows.length == 0){
        if(!!tabledes){tabledes.hidden = true;}
    };
});

function changeImg() {
    var eID = document.getElementById("cimg");
    dropImg = eID.options[eID.selectedIndex].text;
    if (dropImg == 'Logo') {
        document.getElementById('ichange').innerHTML = " upload image dimension 75*52";
    } else if (dropImg == 'Top Banner') {
        document.getElementById('ichange').innerHTML = " upload image dimension 1348*415";
    } else {
        document.getElementById('ichange').innerHTML = " upload image dimension 1280*1280";
    }
}
function changeDes() {
    var eID = document.getElementById("cdes");
    dropDes = eID.options[eID.selectedIndex].text;
}

function checkSize(file) {
    if (file.files.length == 0) {
        document.getElementById('ichange').innerHTML = "File NOT upload";
    } else {
        var id = Math.floor(100000 + Math.random() * 900000);
        var img = document.getElementById("imagefile").files[0];

        var e = document.getElementById("cimg");
        var strUser = e.options[e.selectedIndex].text;

        if (strUser.length == 0) {
            document.getElementById('select').innerHTML = "Select any one Category";
        } else if (strUser == "Logo") {
            document.getElementById('select').innerHTML = "";
            if (img.size >= 2000000) {
                document.getElementById('ichange').innerHTML = "File too Big, please select a file less than 2mb";
                document.getElementById('imagefile').value = "";
                document.getElementById('select').innerHTML = "";
            } else if (img.size < 50000) {
                document.getElementById('ichange').innerHTML = "File too small, please select a file greater than 50kb";
                document.getElementById('imagefile').value = "";
                document.getElementById('select').innerHTML = "";
            } else {
                call(id, img, strUser);
            }
        } else if (strUser == "Top Banner") {
            if (img.size >= 3000000) {
                document.getElementById('ichange').innerHTML = "File too Big, please select a file less than 3mb";
                document.getElementById('imagefile').value = "";
                document.getElementById('select').innerHTML = "";
            } else if (img.size < 200000) {
                document.getElementById('ichange').innerHTML = "File too small, please select a file greater than 200kb";
                document.getElementById('imagefile').value = "";
                document.getElementById('select').innerHTML = "";
            } else {
                call(id, img, strUser);
            }
        } else if (strUser == "Main Banner") {
            if (img.size >= 4000000) {
                document.getElementById('ichange').innerHTML = "File too Big, please select a file less than 4mb";
                document.getElementById('imagefile').value = "";
                document.getElementById('select').innerHTML = "";
            } else if (img.size < 1000000) {
                document.getElementById('ichange').innerHTML = "File too small, please select a file greater than 1mb";
                document.getElementById('imagefile').value = "";
                document.getElementById('select').innerHTML = "";
            } else {
                call(id, img, strUser);
            }
        }
    }
}

function call(id, img, strUser) {
    var obj = {};
    console.log(img.type);
    console.log(img.size);
    console.log(img.name);
    obj.file_id = id;
    obj.file_name = img.name;
    obj.file = img;
    obj.file_type = img.type;
    obj.file_size = img.size;
    obj.file_category = strUser;
    obj.web_id = "325461";
    obj.btn = document.createElement('input');
    obj.btn.type = "button";
    obj.btn.id = "delete";
    obj.btn.className = "btn btn-default btn-sm delete";
    obj.btn.onclick = "delete(x)";
    obj.btn.value = "Delete";

    document.getElementById('select').innerHTML = "";
    table(obj);
}

function table(arr) {
    if(arr.length==0){
        $('#datas').empty();
        array = [];
        document.getElementById('ichange').innerHTML = "";
        tableimg.hidden = true;
    }else{
        var data = arr;
        tableimg.hidden = false;
        document.getElementById("myBtn").disabled = false;
        document.getElementById("subbtn").disabled = true;
        document.getElementById('imagefile').value = "";
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
        Object.keys(data).forEach(key => data[key] === 0 && delete data[key]);
        array.push(data);
        document.getElementById('ichange').innerHTML = "file upload";
        var table = document.getElementById("datas");
        table.innerHTML = "";
        var tr = "";
        var counter = 1;
    
        array.forEach(x => {
            tr += '<tr class="res">';
            tr += '<td>' + counter++ + '</td>' + '<td>' + x.file_type + '</td>' + '<td>' + x.file_size + '</td>' + '<td>' + x.file_name + '</td>' + '<td>' + x.file_category + '</td>' + '<td id="btn">' + x.btn.outerHTML + '</td>'
            tr += '</tr>'
        })
    
        table.innerHTML += tr;
    }
   

 
    $('#myTable tbody tr').on('click', function (e) {
        $(this).siblings('.selected').removeClass('selected');
        $(this).addClass('selected');
    })
    $("#myTable .delete").on('click', function (x) {
        var row = $(this).closest('tr');
        const index = array.findIndex(y => y.btn === x);
        if (index !== undefined) array.splice(index, 1);
        row.remove();
        if(array.length == 0){
            tableimg.hidden = true;
        }

    });
}
function save1() {
    var sData = {
        sImage: array,
        sDes: contentarr1,
    }
    if ((sData.sImage.length == 0) && (sData.sDes.length == 0)) {
        document.getElementById('demo').innerHTML = "Please Upload Files"
    } else if (sData.sImage.length == 0) {
        document.getElementById('demo').innerHTML = "Image Category file not missing"
    } else if (sData.sDes.length == 0) {
        document.getElementById('demo').innerHTML = "Content Category file not missing"
    } else {
        var darray = sData.sImage;
        darray.map(function (nameObj) {
            var formData = new FormData();
            Object.keys(nameObj).forEach(function (key) {
                formData.append(key, nameObj[key]);
            });
            var xhttp = new XMLHttpRequest();
            xhttp.open('POST', 'http://localhost/project/server/index.php');
            xhttp.onreadystatechange = function (event) {
                if (this.readyState == 4 && this.status == 200) {
                    var response1 = JSON.parse(this.responseText);
                    fiRes.imgRes = response1;
                }

            }
            xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

            xhttp.send(formData);
        })

        var formData1 = new FormData();
var dses = sData.sDes;
        formData1.append("content", JSON.stringify(dses));

        console.log(dses);


        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'http://localhost/project/server/content.php');
        xhttp.onreadystatechange = function (event) {
            if (this.readyState == 4 && this.status == 200) {
                var response1 = JSON.parse(this.responseText);
                fiRes.desRes = response1;
                console.log(fiRes.desRes.message);
                document.getElementById("demo").innerHTML = fiRes.desRes.message;
            }
        }
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

        xhttp.send(formData1);
        console.log(fiRes);

        Object.keys(fiRes).forEach(key => fiRes[key] === "" && delete fiRes[key]);
        document.getElementById("subbtn").disabled = false;
        document.getElementById("myBtn").disabled = true;
    }

  
}
function del(){
    var delarray =  new Array();
    var delcontent =  new Array();
    table(delarray);
    dtables(delcontent);
   }
   

function Publish() {

    
//         outputData = 
//                 {
//                     "web_id": "325461",
//                     "web_name": "ecosultancyserv.com",
//                     "web_status": "Active",
//                 }
//   console.log(outputData)
  var formData1 = new FormData();
        formData1.append("web_id", "325461");
        formData1.append("web_name", "ecosultancyserv.com");
        formData1.append("web_status", "Active");

        


        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'http://localhost/project/server/setstatus.php');
        xhttp.onreadystatechange = function (event) {
            if (this.readyState == 4 && this.status == 200) {
                var response1 = JSON.parse(this.responseText);
                // fiRes.desRes = response1;
                console.log(response1);
                // document.getElementById("demo").innerHTML = fiRes.desRes.message;
            }
        }
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

        xhttp.send(formData1);
    modal.style.display = "none";

}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);
}

function checkDes() {


    var des = [];
    var e = document.getElementById("cdes");
    var strUser1 = e.options[e.selectedIndex].text;
    des.category = strUser1;
    des.description = "";
    if (strUser1.length == 0) {
        document.getElementById('deselect').innerHTML = "Select any one Category";
    } else

    if (des.description != "") {
        document.getElementById('dselect').innerHTML = "Select ";
    } else {
        var myContent = tinymce.get("editor").getContent({ format: "text" });
        tinyMCE.activeEditor.setContent('');
        document.getElementById('dselect').innerHTML = "";
        if (myContent == "") {
            document.getElementById('dselect').innerHTML = "Please Insert text in Textarea";
        } else if (myContent.length == 1) {
            document.getElementById('dselect').innerHTML = "Please Insert text in Textarea";
        } else {
            var contentobj = {};
            contentobj.content_category = strUser1;
            contentobj.content = myContent;
            contentobj.web_id = "325461";
            contentobj.web_name = "ecosultancyserv.com";
            contentobj.btn = document.createElement('input');
            contentobj.btn.type = "button";
            contentobj.btn.id = "delete";
            contentobj.btn.className = "btn btn-default btn-sm delete";
            contentobj.btn.onclick = "delete(x)";
            contentobj.btn.value = "Delete";
         //   contentarr1.push(contentobj);
            dtables(contentobj)
        }

    }

}
function dtables(arr) {
    if(arr.length==0){
        $('#desdatas').empty();
        contentarr = [];
        document.getElementById('dselect').innerHTML = "";
        tabledes.hidden = true;
    }else{
    tabledes.hidden = false;
    document.getElementById("myBtn").disabled = false;
    document.getElementById("subbtn").disabled = true;
    Object.keys(arr).forEach(key => arr[key] === 0 && delete arr[key]);
    contentarr1.push(arr);
    var dtable = document.getElementById("desdatas");
    dtable.innerHTML = "";
    var tr = "";
    var counter = 1;

    contentarr1.forEach(x => {
        tr += '<tr class="res">';
        tr += '<td>' + counter++ + '</td>' + '<td>' + x.content_category + '</td>' + '<td>' + x.content + '</td>' + '<td id="btn">' + x.btn.outerHTML + '</td>'
        tr += '</tr>'


    })

    dtable.innerHTML += tr;
 //   contentarr.push(fdes);
}
    $('#mydesTable tbody tr').on('click', function (e) {
        $(this).siblings('.selected').removeClass('selected');
        $(this).addClass('selected');
    })
    $("#mydesTable .delete").on('click', function (x) {
        var row = $(this).closest('tr');
        const index = contentarr1.findIndex(y => y.btn === x);
        if (index !== undefined) contentarr1.splice(index, 1);
        row.remove();
        if(contentarr1.length == 0){
            tabledes.hidden = true;
        }

    });
}
