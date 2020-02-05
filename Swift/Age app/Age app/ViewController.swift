//
//  ViewController.swift
//  Age app
//
//  Created by Carl Elgström  on 2020-02-05.
//  Copyright © 2020 Carl Elgström . All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var textField: UITextField!
    
    @IBOutlet weak var label: UILabel!
    
    @IBAction func clicked(_ sender: Any) {
        
        if let age = textField.text {
        
        label.text = "Your age is " + age + " years old" 
            
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

