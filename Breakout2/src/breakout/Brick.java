package breakout;
import wheels.users.*;


public class Brick extends grafik implements krock {
	
	private int Varde;
	private Rectangle brick;
	
	public Brick() {
		
	brick = new Rectangle(java.awt.Color.RED);
	brick.setSize(40, 15);
	
	}
	
	public void setLocation(int x1, int y1) {
	brick.setLocation(x1,y1);
	
	}
	
	public void setColor(int c) {
	
		if (c==1)
			
		brick.setColor(java.awt.Color.GREEN);
	
		if (c==2)
			
		brick.setColor(java.awt.Color.RED);
	
		if (c==3)
			
		brick.setColor(java.awt.Color.BLUE);
	
	}
	
	@Override
	public void krocken(int x, int y) {	
		
	}
	
	@Override
	public int getX() {
		return brick.getXLocation();
	
	}
	@Override
	public int getY() {
		return brick.getYLocation();
	
	}
	@Override
	public void move(int x, int y) 
	{	
	
	}
	@Override
	public int getWidth() {
	
		return brick.getWidth();
	}
	@Override
	public int getHeight() {
		
		return brick.getHeight();
	}
	@Override
	public void setVarde(int ettVarde) 
	{
		Varde = ettVarde;	
	}
	public int getVarde() 
	{
		return Varde;
	}
	public void setX(int ettX) 
	{
		x=ettX;
	}
	public void setY(int ettY) 
	{
		y=ettY;
	}
}
