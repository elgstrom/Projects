package breakout;
import java.awt.Color; 

import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Timer;
import javax.swing.JLabel;
import javax.swing.JFrame;
import wheels.users.*;


public class Board extends Frame implements ActionListener, KeyListener {

	private Wall leftW;
	private Wall rightW;
	private Wall upperW;
	
	private Brick[] bricks; 
	
	private Ball boll;
	
	private Tra tra;
	
	private final int BRICKOR = 45;
	
	private Timer t;
	int speed = 3;
	
	private int score = 0;
	private int life = 3;
	
	private JFrame scoreB;
	private JLabel health;
	private JLabel points;
	private JLabel text1;
	private JLabel text2;
	private Object[] Brickor;
	
	
	public Board() {
		
		text1 = new JLabel();
		text1.setHorizontalAlignment(JLabel.CENTER);
		text1.setText("Välkommen till vårt spel");
		
		text2 = new JLabel();
		text2.setHorizontalAlignment(JLabel.CENTER);
		text2.setText("Kör hårt!");
		
		points = new JLabel();
		points.setHorizontalAlignment(JLabel.CENTER);
		points.setText("Antal points: " + points);
		
		health = new JLabel();
		health.setHorizontalAlignment(JLabel.CENTER);
		health.setText("Antal liv kvar: " + life);
		
		scoreB = new JFrame();
		scoreB.setLayout(new GridLayout(4,1));
		scoreB.setLocation(750,0);
		scoreB.setVisible(true);
		scoreB.add(points);
		scoreB.add(health);
		scoreB.add(text1);
		scoreB.add(text2);
		scoreB.setSize(400,400);
		
		
		
		
		boll = new Ball(290, 300);
		
		leftW = new Wall();
		leftW.setLocation(0,0,0,500);
		
		upperW = new Wall();
		upperW.setLocation(700,0,700,0);
		
		rightW = new Wall();
		rightW.setLocation(700,0,700,500);
		
		bricks = new Brick [BRICKOR];
		for (int i =0; i<BRICKOR; i++) {
			
			bricks[i] = new Brick();
			if (i <15) {
				bricks[i].setLocation(15+45*i, 40);
				bricks[i].setVarde(3);
			}
			if (i >= 15 && i<30) {
				bricks[i].setLocation(15+45*(i-15), 60);
				bricks[i].setVarde(2);	
			}
			if( i>=30) 
			{
				bricks[i].setLocation(15+45*(i-30), 80);
				bricks[i].setVarde(1);	
			
			}
			
			
		}
		
	tra = new Tra();
	
	_dp.addKeyListener(this);
	_dp.grabFocus();
	
	t = new Timer (4, this);
	t.start();
	boll.setX(90);
	
	}
		
	@Override
	public void actionPerformed(ActionEvent e)
	{
		if (tra.getX() < 10)
			tra.setX(10);
		if(tra.getX() + tra.getWidth() > _dp.getWidth() - 10)
			tra.setX(_dp.getWidth() - 10- tra.getWidth());
		
		
		points.setText("Poäng: " + score );
		health.setText("Liv: " + life);
		
		if (life == 0) {
			text1.setText("Du förlorade");
			text2.setText("Spela gärna igen");
		}
		if (score == 900) {
			text1.setText("Du vann!!");
			text2.setText("Snyggt");
			boll.setYspeed(0);
			boll.setXspeed(0);
		}
		tra.move();
		boll.move(); //Bollen hpller sig i fönstret
		
		if (boll.getX() > _dp.getWidth()-10-boll.getWidth() || boll.getX() < 0+10)
			boll.setXspeed(-boll.getXspeed());
		if (boll.getY() < 10 /*|| boll.getY() > _dp.getHeight()-boll.getHeight()*/)
			boll.setYspeed(-boll.getYspeed());
		
		
		// TRÄFFAR HÖRN
				if(boll.getY()+boll.getHeight() == tra.getY() ) 
				{
//					
					if(boll.getXspeed()>0)
					{
						if(boll.getX()+boll.getWidth() == tra.getX())
						{
							boll.setYspeed(-boll.getYspeed());
							boll.setXspeed(-boll.getXspeed());
						}
					}
					if(boll.getXspeed()<0)
					{
						if(boll.getX()==tra.getX()+tra.getWidth())
						{
							boll.setYspeed(-boll.getYspeed());
							boll.setXspeed(-boll.getXspeed());
						}
					}
				}
		
		// STUDS PÅ BOLLTRÄ
				// TRÄFFAR OVANSIDA
				if (boll.getY()+boll.getHeight() == tra.getY() && boll.getX() + boll.getWidth()>= tra.getX() && boll.getX()<= tra.getX()+tra.getWidth()*4/4) {
					boll.setYspeed(-boll.getYspeed());
					
					if(boll.getX() +boll.getWidth()>= tra.getX() && boll.getX()<= tra.getX()+tra.getWidth()*1/4)
					{

						boll.setXspeed(-1);
					}
					if(boll.getX()>= tra.getX()+tra.getWidth()*3/4 && boll.getX()<= tra.getX()+tra.getWidth()*4/4)
					{

						boll.setXspeed(1);
					}
					
					
					}
				
				// TRÄFFAR SIDORNA
				if(boll.getY()+boll.getHeight()*1>tra.getY() && boll.getY()+boll.getHeight()*0< tra.getY()+ tra.getHeight()) 
				{
					if(boll.getX()+boll.getWidth()==tra.getX() || boll.getX() == tra.getX()+ tra.getWidth())
					boll.setXspeed(-boll.getXspeed());
					
				}
				//FÖRLORAT
				if (boll.getY()== _dp.getHeight()) {
					life = life -1;
					text1.setText("Tyvärr, du förlorade ett liv!");
					text2.setText("Ny boll skapas om: 2 sekunder");

				}
				// SKAPAR EN NY BOLL
				if (life>0) {
				if (boll.getY()== _dp.getHeight()+200)
				{
					text2.setText("Ny boll skapas om: 1 sekund");
				}
				if (boll.getY()== _dp.getHeight()+400) {
					text1.setText("Ny boll har skapats");
					text2.setText("Lycka till!");
					//_boll =  new Ball(100,250);
					boll.move(100, 250);
					boll.setXspeed(1);
				}

				}

		
		
				// STUDS PÅ BRICKOR
				for(int k=0;k< BRICKOR ;k++)
				{
					bricks[k].setColor(bricks[k].getVarde());
					
					// TRÄFFAR HÖRN
					if(boll.getY()+boll.getHeight() == bricks[k].getY() || boll.getY() == bricks[k].getY()+bricks[k].getHeight()) 
					{
						if(boll.getX()+boll.getWidth() == bricks[k].getX() ||boll.getX()==bricks[k].getX()+bricks[k].getWidth()) {
							boll.setYspeed(-boll.getYspeed());
							boll.setXspeed(-boll.getXspeed());
							bricks[k].setVarde(bricks[k].getVarde()-1);
							
						}	
					}
					// TRÄFFAR OVANSIDAN
					if(bricks[k].getY() == boll.getY()+boll.getHeight())
					{
						if(boll.getX() +boll.getWidth()> bricks[k].getX() -1 && boll.getX() < 1+bricks[k].getX()+bricks[k].getWidth())
						{
							boll.setYspeed(-boll.getYspeed());
							bricks[k].setVarde(bricks[k].getVarde()-1);
							
							
						}
					}
					// TRÄFFAR UNDERSIDAN
					if(bricks[k].getY()+bricks[k].getHeight() == boll.getY())
					{
						if(boll.getX() +boll.getWidth()> bricks[k].getX()-1 && boll.getX() < 1+bricks[k].getX()+bricks[k].getWidth())
						{
							boll.setYspeed(-boll.getYspeed());
							bricks[k].setVarde(bricks[k].getVarde()-1);	
							
						}
					}
		
		
					// TRÄFFAR SIDORNA
					if(boll.getY()+boll.getHeight()*1>bricks[k].getY() && boll.getY()+boll.getHeight()*0<bricks[k].getY()+bricks[k].getHeight()) 
						{
						if(boll.getX()+boll.getWidth()==bricks[k].getX() || boll.getX() == bricks[k].getX()+bricks[k].getWidth())
						{
							boll.setXspeed(-boll.getXspeed());
							bricks[k].setVarde(bricks[k].getVarde()-1);
							
							
						}
						}
					if(bricks[k].getVarde() == 0 && bricks[k].getX()>0)
					{
						if (k<15) 
						{
							score = score + 30;
						}
						if(k>=15 && k<30) 
						{
							score = score + 20;
						}
						if( k>=30) 
						{
							score = score + 10;
						}	
					}
					// FLYTTAR BRICKS NÄR DE BLIR TRÄFFADE
					if(bricks[k].getVarde() == 0) 
					{
						bricks[k].setLocation(-100, -100);
						
					}	
					
				}				
				
			}

			@Override
			public void keyPressed(KeyEvent e) {
				if (e.getKeyCode() == 39) 
				{
			
					
					if(tra.getX()+tra.getWidth()< _dp.getWidth()-10)
					tra.setXspeed(2);
					
//			
					
				}
				
				if (e.getKeyCode() == 37)
				{
					
					if(tra.getX()>10) 
					tra.setXspeed(-2);
				
				}	
				
					
			}

			@Override
			public void keyReleased(KeyEvent e) {
				if (e.getKeyCode() == 39) 
					tra.setXspeed(0);
				if (e.getKeyCode() == 37)
					tra.setXspeed(0);
				
				
			}

			@Override
			public void keyTyped(KeyEvent e) {
				// TODO Auto-generated method stub
				
			}
		
			
			}
