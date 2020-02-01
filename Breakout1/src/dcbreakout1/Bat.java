package dcbreakout1;

import java.awt.Color;
import java.awt.Graphics;


public class Bat {
	private int x,y;
	private int width, height;
	private int xhast=1;
	private Color color = Color.ORANGE;
	private int points;
	
	public Bat(int ax, int ay, int aw, int ah, Color acolor){
		x=ax;
		y=ay;
		width=aw;
		height=ah;
		color = acolor;
	}
	public void setcolor(Color acolor){
		color = acolor;
	}
	
	public Color getcolor(){
		return color;
	}
	public void setx(int ax){
		x= ax;
	}
	
	public int getx(){
		return x;
	}
	public void sety(int ay){
		y= ay;
	}
	
	public int gety(){
		return y;
	}
	public void setxhast(int axhast){
		xhast= axhast;
	}
	
	public int getxhast(){
		return xhast;
	}
	
	public void setwidth(int aw){
		width=aw;
	}
	
	public int getwidth(){
		return width;
	}
	
	public void setheight(int ah){
		height=ah;
	}
	
	public int getheight(){
		return height;
	}
	
	public void move(){
		x= x +xhast;
	}
	public void counter(int alevel){ // Är batten som har koll på poäng så man kan ha ny boll efter man förlorat liv
		if(alevel == 2)
			points += 1;
		if(alevel ==1)
			points += 1;
		if(alevel == 0)
			points +=1;
	}
	
	public int getpoints(){
		return points;
	}
	
	public void paintComponent(Graphics g){
		Color tmpColor = g.getColor();//wtf? fråga om hjälp
		g.setColor(color);
		g.fillRect(x, y, width, height);
		g.setColor(tmpColor);
		}
	
	
	
	
	

}
