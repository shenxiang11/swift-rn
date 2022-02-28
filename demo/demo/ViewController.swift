//
//  ViewController.swift
//  demo
//
//  Created by Xiang Shen on 2022/2/22.
//

import UIKit
//import Flutter
import React

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func showFlutter() {
        if let manager = RNManager.shared {
            manager.open("Profile")
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let target = segue.destination as? RNViewController {            
            let props: [String:Any] = [
                "message": "Hello from Native",
                "code": 200
            ]
        
            let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "Home", initialProperties: props, launchOptions: nil)
            target.view = rootView
        }
    }
}
