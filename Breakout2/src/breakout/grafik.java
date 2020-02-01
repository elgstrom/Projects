package breakout;

public abstract class grafik implements flytta {
protected int x;
protected int y;
protected int xspeed;
protected int yspeed;

public void move() 
{
	x=x+xspeed;
	y=y+yspeed;
}
	public void setXspeed(int aSpeed)
	{
		xspeed = aSpeed;
	}
	public void setYspeed(int Yhast)
	{
		yspeed = Yhast;
	}
	public int getXspeed() 
	{
		return xspeed;
	}
	public int getYspeed() 
	{
		return yspeed;
	}

	public void setX(int ettX) 
	{
		x=ettX;
	}
	public void setY(int ettY) 
	{
	y=ettY;
}

	@Override
	public int getX() 
	{
		return x;
	}

	@Override
	public int getY() 
	{
	
		return y;
	}
	public abstract int getWidth();
	public abstract int getHeight();

}
