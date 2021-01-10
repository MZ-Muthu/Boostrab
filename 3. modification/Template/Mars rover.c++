#include<bits/stdc++.h>
using namespace std;

class Mrover{
	int x;
	int y;
	char o;

	public:
		Mrover(){
			x = 0;
			y = 0;
			o ='N';
		}
		Mrover(int xp, int yp, char op){
			x = xp;
			y = yp;
			o = op;
		}
		void leftrotate()
		{
			switch(o)
			{
				case 'N' : o = 'W';break;
				case 'W' : o = 'S';break;
				case 'S' : o = 'E';break;
				case 'E' : o = 'N';break;
				
			}
		}
		void rightrotate()
		{
			switch(o)
			{
				case 'N' : o = 'E';break;
				case 'W' : o = 'N';break;
				case 'S' : o = 'W';break;
				case 'E' : o = 'S';break;
				
			}
		}
		void movement()
		{
			switch(o)
			{
				case 'N' : o = y++;break;
				case 'W' : o = x--;break;
				case 'S' : o = y--;break;
				case 'E' : o = x++;break;
				
			}
		}
		void display()
		{
			cout<<x<<"\t"<<y<<"\t"<<o;
		}

};

int main()
{
	int xx,yy;
	char oo;
	cin>>xx>>yy>>oo;
	Mrover r(xx,yy,oo);

	string s;
	cin>>s;

	for(int i=0;i<s.size();i++)
	{
		if(s[i] == 'L')
			r.leftrotate();
		else if(s[i] == 'R')
			r.rightrotate();
		else if(s[i] == 'M')
			r.movement();
	}
	r.display();
	return 0;
}