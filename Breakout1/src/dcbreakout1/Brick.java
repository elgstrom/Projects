package dcbreakout1;
import java.awt.Color;
import java.awt.Graphics;

public class Brick {
	
	private int x,y;
	private int width, height;
	private int level=1;
	private boolean alive = true;
	private Color color;
	
	public Brick(int ax, int ay, int w, int h){
		x= ax;
		y=ay;
		width= w;
		height=h;
		color= Color.white;
		
		
	}
	
	public void setx(int ax){
		ax= x;
	}
	public int getx(){
		return x;
	}
	public void sety(int ay){
		y= ay;
	}
	public int  gety(){
		return y;
	}
	public void setcolor(Color c){
		color= c;
	}
	public Color getcolor(){
		return color;
	}
	public void setWidth(int w){
		width= w;
	}
	public int getWidth(){
		return width;
	}
	public void setHeight(int h){
		height=h;
	}
	
	public int getHeight(){
		return height;
	}
	public void setalive(boolean value){
		alive = value;
		if(alive==false){
			this.setcolor(Color.black);
			this.setWidth(1);
			this.setHeight(1);
			this.setx(1000);
			this.sety(1000);
		}
	}
	public boolean getalive(){
		return alive;
	}
	
	public int getlevel(){
		return level;
	}
	
	public void setlevel(int alevel){
		level = alevel;
		if (level==3){
			this.setcolor(Color.red);
			this.setalive(true);
			}
		else if(level==2){
			this.setcolor(Color.blue);
			this.setalive(true);
			}
		else if(level==1){
			this.setcolor(Color.white);
			this.setalive(true);
			}
		else {
			this.setalive(false);
		}
	}
	

	
	
	public void paintComponent(Graphics g){
		Color tmpColor = g.getColor();
		g.setColor(color);
		g.fillRect(x, y, width, height);
		g.setColor(tmpColor);
		}
	
	

}
