package dcbreakout1;

import java.awt.Color; 

import java.awt.Graphics;
import wheels.users.*;

public class Boll {

	private int x, y;//kordinater
	private int width, height;//bredd och höjd
	private int xhast, yhast; // olika hastigheter
	private int points;
	private Color color;
	
	public Boll(int ax, int ay, int aw, int ah, Color ac){
		
		
		this.x = ax;
		this.y = ay;
		width=aw;
		height=ah;
		color=ac;
		xhast=2;
		yhast=2;
				
	}
	
	public int getX(){
		return x;
	}
	
	public void setX(int ax){
		
		x= ax;
	}
	
	public int getY(){
		return y;
	}
	
	public void setY(int ay){
		
		y= ay;
	}
	
	public int getWidth(){
		return width;
	}
	
	public void setwidth(int awidth){
		
		width= awidth;
	}
	
	public int getHeight(){
		return height;
	}
	
	public void setHeight(int aheight){
		
		height= aheight;
	}
	
	public int getxhast(){
		return xhast;
	}
	
	public void setxhast(int axhast){
		
		xhast= axhast;
	}
	
	public int getyhast(){
		return yhast;
	}
	
	public void setyhast(int ayhast){
		
		yhast= ayhast;
	}
	
	public void move(){
		
		x= x +xhast;
		y= y +yhast;
	}
	
	
	public void paintComponent(Graphics g){
		Color tmpColor = g.getColor();//wtf? fråga om hjälp
		g.setColor(color);
		g.fillOval(x, y, width, height);
		g.setColor(tmpColor);
		}
}
