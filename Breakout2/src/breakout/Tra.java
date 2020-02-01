package breakout;
import wheels.users.*;
public class Tra extends grafik {
private Rectangle tra;	
	
	public Tra() {

		tra = new Rectangle(java.awt.Color.BLACK);
		tra.setSize(73, 6);

		x=350-tra.getWidth()*1/2;
		y=480;
		xspeed=0;
		yspeed=0;
		
		tra.setLocation(x, y);
		
	}

public void setLocation(int x, int y) {
	tra.setLocation(x, y);
	
}
@Override
public void move(int x, int y) {
	
	setX(x);
	setY(y);
	
	tra.setLocation(x, y);
	
	}

	public void move() 
	{
		super.move();
		tra.setLocation(x, y);
	}
	
	@Override
	public int getWidth() {
	
		return tra.getWidth();
	}
	@Override
	public int getHeight() {
	
		return tra.getHeight();
	}


}
