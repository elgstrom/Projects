package breakout;
import wheels.users.*;
public class Wall {
private Line wall;

public Wall() {
	wall = new Line();
	wall.setThickness(10);
	wall.setColor(java.awt.Color.BLACK);
	
	
}
	public void setLocation(int x1, int y1, int x2, int y2) {
		wall.setPoints(x1, y1, x2, y2);
		
	}
	

}
