package dcbreakout1;

import javax.swing.JButton;
import javax.swing.JFrame; 
import javax.swing.Timer;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Frame extends JFrame {
	
	private Huvudpanel hvpanel;
	Timer t;
	private int delay=10;
	private int clicka = 0;
	private JButton click; //ny 
	public Frame(){
		
		hvpanel= new Huvudpanel();
		hvpanel.setPreferredSize(new Dimension(700,500));
		this.add(hvpanel);
		t = new Timer(delay, hvpanel);
		t.start();
		setSize(575, 500);
		setVisible(true);
		this.setResizable(true);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setTitle("Boll-fönster");
		
		

	}
	

	
		
	}
	
	

