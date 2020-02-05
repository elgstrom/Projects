//
//  ViewController.swift
//  First App
//
//  Created by Carl Elgström  on 2020-02-05.
//  Copyright © 2020 Carl Elgström . All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    
    @IBOutlet weak var textField: UITextField!
    
    @IBAction func ButtonClicked(_ sender: Any) {
        
       print("Button clicked")
        
        if let name = textField.text {
            
            label.text = "Hello " + name 
            
        }
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        
    }


}

