//
//  ViewController.swift
//  Dog Years App
//
//  Created by Carl Elgström  on 2020-02-05.
//  Copyright © 2020 Carl Elgström . All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    
    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var textField: UITextField!
    @IBAction func buttonClicked(_ sender: Any) {
        
        if let age = textField.text {
            if let ageAsNumber = Int(age){

                let ageInDogYears = ageAsNumber * 7
                
                label.text = "Your dog is " + String(ageInDogYears) + " dog years"
        }
    }
}
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

