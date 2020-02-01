package breakout;
import java.awt.Color; 
import wheels.users.Ellipse; 

public class Ball extends grafik{ 
	private final int STORLEK = 10;
	private Ellipse ball; 

	//Bollen 
	public Ball(int ettX, int ettY) { 
	ball = new Ellipse(Color.BLACK);
	yspeed = 1;
	xspeed = 1;
	
	ball.setSize(STORLEK, STORLEK); 
	x = ettX;
	y = ettY;
	
	ball.setLocation(x, y); 
	} 
	public void setLocation(int x, int y) { 
		ball.setLocation(x,y); 
	}
	
	public void move (int x, int y) {
		setX(x);
		setY(y);
		ball.setLocation(x, y);

		
	}
	@Override
	public int getWidth() {
		return ball.getWidth();
	}
	@Override
	public int getHeight() {
		
		return ball.getHeight();
	}
	public void setX(int ettX) {
		super.setX(ettX);
	}
	public void setY(int ettY) {
		super.setY(ettY);
	
}
	@Override
	public void move() {
		super.move();
		ball.setLocation(x, y);
	}

	
	

}