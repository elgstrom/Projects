package dcbreakout1;

import java.awt.BorderLayout;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import wheels.users.*;

//import boll_swing.Boll;

public class Huvudpanel extends JPanel implements ActionListener, MouseMotionListener{

	private Boll mboll;
	//private int oldX=-1, oldY=-1;
	//private JFrame mframe;
	private Brick[] bricks = new Brick[24];
	private Bat mbat;
	protected int oldpoints;
	private JLabel liv, points;
	//private int point = 0;
	//CARL KOD 
	private JLabel text1;
	private JLabel text2;
	private JFrame scoreB;
	private JLabel health;
	private int score1;
	private JButton click; //ny 
	public int score = 0;
	private int life = 3;
	private int clicka = 0;

	
	public Huvudpanel(){
	
		text1 = new JLabel();
		text1.setHorizontalAlignment(JLabel.CENTER);
		text1.setText("Välkommen till vårt spel");
		
		
		text2 = new JLabel();
		text2.setHorizontalAlignment(JLabel.CENTER);
		text2.setText("Kör hårt!");
		
		points = new JLabel();
		points.setHorizontalAlignment(JLabel.CENTER);
		points.setText("Antal points: " + score);
		
		
		health = new JLabel();
		health.setHorizontalAlignment(JLabel.CENTER);
		health.setText("Antal liv kvar: " + life);
		
		
		scoreB = new JFrame();
		click = new JButton("QUIT");
		click.addActionListener(this);//lyssnaren
		
		scoreB.setLayout(new GridLayout(6,1));
		scoreB.setLocation(750,0);
		scoreB.setVisible(true);
		scoreB.add(health);
		scoreB.add(points);
		scoreB.add(text1);
		scoreB.add(text2);
		scoreB.setSize(300,300);
		scoreB.add(click);
		
		
		this.setSize(700, 500);
		this.addMouseMotionListener(this);
		mboll = new Boll(20, 300, 20, 20, Color.white);
		mbat = new Bat(this.getWidth()/2-30,this.getHeight()-30, 80, 30, Color.ORANGE);// 60,20
		

		for(int i=0; i<24; i++){	
			if(i>=0 && i<=7){
				bricks[i]= new Brick(10 +70*i, 10, 60, 30);
				bricks[i].setlevel(3);
			}
			if(i>=8 && i<=15){
				bricks[i]= new Brick(10+ 70*(i-8), 50, 60, 30);
				bricks[i].setlevel(2);
			}

			if(i>15 && i<=24){
				bricks[i] = new Brick(10+70*(i-16), 90, 60, 30);
				bricks[i].setlevel(1);
			}

		}

	}

	@Override
	public void paintComponent(Graphics g)
	{
		this.setBackground(Color.black);
		super.paintComponent(g);
		mboll.paintComponent(g);
		mbat.paintComponent(g);
		for(int i=0; i<bricks.length; i++ )
		bricks[i].paintComponent(g);
		
	}

	private void krock()
	{
		//FÖRLORAR 
	if(mboll.getY()+mboll.getHeight() == 480) {
			life = life -1;
			System.out.println(life); //kollar bara att de funkar
			
			if( life == 3) {
				
				health.setText("Antal liv: " + life);
			}
			if( life == 2) {
				text1.setText("Tyvärr, du förlorade ett liv");
				health.setText("Antal liv kvar: " + life);
				mboll = new Boll(20, 200, 20, 20, Color.WHITE);
			}
			if( life == 1) {
				text1.setText("Tyvärr, du förlorade ett liv");
				//text2.setText("Ny boll skapas om: 2 sekunder");
				health.setText("Antal liv kvar: " + life);
				mboll = new Boll(20, 200, 20, 20, Color.WHITE);
			}
			if( life == 0) {
				text1.setText("Tyvärr, du förlorade");
				text2.setText("Bättre lycka nästa gång");
				health.setText("Antal liv kvar: " + life);
				mboll = new Boll(200, 3000, 20, 20, Color.WHITE); //Flyttar bort bollen
				
			}
			if (score == 50) {
				text1.setText("Du vann!!");
				text2.setText("Snyggt");
				mboll = new Boll(200, 3000, 20, 20, Color.WHITE); //Flyttar bort bollen
			}
		}
		for(int i=0; i<24;i++){
				//kollar om brickans vänstersida krockar med bollens högersida
				//inversar bollens xhastighet och minskar level med 1
			if((mboll.getX()+mboll.getWidth()) == bricks[i].getx() && (mboll.getY()+mboll.getHeight()) >= bricks[i].gety() && mboll.getY()<= (bricks[i].gety()+bricks[i].getHeight())){
				if(mboll.getxhast()>0){
					mboll.setxhast(-1*mboll.getxhast());
					bricks[i].setlevel(bricks[i].getlevel()-1);
					mbat.counter(bricks[i].getlevel());
				}
				else{
					bricks[i].setlevel(bricks[i].getlevel()-1);
					mbat.counter(bricks[i].getlevel());
				}
			}
			
				//kollar om brickans högersida krockar med bollens vänstersid
				//inversar bollens xhastihet och minskar level med 1
			if(mboll.getX() == (bricks[i].getx()+bricks[i].getWidth()) && (mboll.getY()+mboll.getHeight()) >= bricks[i].gety() && mboll.getY()<= (bricks[i].gety()+bricks[i].getHeight())){
				if(mboll.getxhast()<0){
					mboll.setxhast(-1*mboll.getxhast());
					bricks[i].setlevel(bricks[i].getlevel()-1);
					mbat.counter(bricks[i].getlevel());
				}
				else{
					bricks[i].setlevel(bricks[i].getlevel()-1);
					mbat.counter(bricks[i].getlevel());
				}

					
			}
			
				//kollar om brickans översida krockar med bollen undersida
				//inversar bollens yhastighet minskar level med 1
			if((mboll.getY()+mboll.getHeight()) == bricks[i].gety() && (mboll.getX()+mboll.getWidth()>= bricks[i].getx() && mboll.getX()<= (bricks[i].getx()+bricks[i].getWidth()))){
				if(mboll.getyhast()>0){
				mboll.setyhast(-1*mboll.getyhast());
				bricks[i].setlevel(bricks[i].getlevel()-1);
				mbat.counter(bricks[i].getlevel());
				}
				else{
				bricks[i].setlevel(bricks[i].getlevel()-1);
				mbat.counter(bricks[i].getlevel());
				}
				
			}
			
				//kollar om brickans undersida krockar med bollens översida
				//inversal bollens yhastighet och minskar level med 1
			if(mboll.getY()== (bricks[i].gety()+bricks[i].getHeight()) && (mboll.getX()+mboll.getWidth()>= bricks[i].getx() && mboll.getX()<= (bricks[i].getx()+bricks[i].getWidth()))){
				if(mboll.getyhast()<0){
				mboll.setyhast(-1*mboll.getyhast());
				bricks[i].setlevel(bricks[i].getlevel()-1);
				mbat.counter(bricks[i].getlevel());
				}
				else{
					bricks[i].setlevel(bricks[i].getlevel()-1);
					mbat.counter(bricks[i].getlevel());
				}
			}
			
		}
		
		//kollar om bollen krockar med väggarna
		if(mboll.getX()<0 ||(mboll.getX()+mboll.getWidth())> this.getWidth())
			mboll.setxhast(-1*mboll.getxhast());
		
		//kollar om bollen krockar med tak och golv
		if(mboll.getY() < 0 || ((mboll.getY()+mboll.getHeight()) > this.getHeight())){
			mboll.setyhast(-1*mboll.getyhast());
			
		}

		//CARL
				if(mboll.getY()+mboll.getHeight()*1>mbat.gety() && mboll.getY()+mboll.getHeight()*0< mbat.gety()+ mbat.getheight()) 
				{
					if(mboll.getX()+mboll.getWidth()==mbat.getx() || mboll.getX() == mbat.getx()+ mbat.getwidth())
					mboll.setxhast(-mboll.getxhast());


				}
				//CARL
				
				//CARL
				if(mboll.getY()+mboll.getHeight() == mbat.gety() ) 
				{
			
					if(mboll.getxhast()>0)
					{
						if(mboll.getX()+mboll.getWidth() == mbat.getx())
						{
							mboll.setyhast(-mboll.getyhast());
							mboll.setyhast(-mboll.getyhast());

						}
					}
					if(mboll.getxhast()<0)
					{
						if(mboll.getX()==mbat.getx()+mbat.getwidth())
						{
							mboll.setyhast(-mboll.getyhast());
							mboll.setyhast(-mboll.getyhast());

						}
					}
				}
				//CARL
		
		//kollar om bollen undersida krickar med slagträdets översida
		if((mboll.getY()+mboll.getHeight()) == mbat.gety() && (mboll.getX()+mboll.getWidth())>= mbat.getx() && mboll.getX()<= (mbat.getx()+mbat.getwidth()))
			mboll.setyhast(-1*mboll.getyhast());
		
		//räknar poäng CARL
			if(oldpoints != mbat.getpoints()){
			oldpoints = mbat.getpoints();
			score = oldpoints;
			points.setText("Antal points: " + score);
			}
	}

	
	

//	@Override
	public void actionPerformed(ActionEvent e)
	{
			if(e.getSource() == click) {//om knappen blir 1 så stängs programmet ner
				clicka = clicka + 1;
				}
			if (clicka == 1) {
				System.exit(0);
			}
		mbat.getx();
		mboll.move();
		krock();
		this.repaint();
		
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		mbat.setx(e.getX());
		
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		mbat.setx(e.getX());
		
	}





}
