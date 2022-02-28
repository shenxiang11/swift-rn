//
//  RNViewController.swift
//  demo
//
//  Created by Xiang Shen on 2022/2/23.
//

import UIKit
import React

class RNViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func trigger(_ sender: Any) {
        if let manager = RNManager.shared {
            manager.sendEvent(withName: "testEvent", body: ["a": 1, "s": "2", "d": nil])
        }
    }
    
    @IBAction func callJS(_ sender: Any) {
        if let bridge = (self.view as? RCTRootView)?.bridge {
            var inputText = UITextField()
            let alertController = UIAlertController.init(title: "提示", message: "请输入要存储的值", preferredStyle: .alert)
            let cancel = UIAlertAction.init(title: "取消", style: .cancel)
            let ok = UIAlertAction.init(title: "确定", style: .default) { _ in
                bridge.enqueueJSCall("SharedStore", method: "setItem", args: ["example", inputText.text], completion: {
                })
            }
            alertController.addAction(cancel)
            alertController.addAction(ok)
            alertController.addTextField { textField in
                inputText = textField
                inputText.placeholder = "请输入"
            }
            
            self.present(alertController, animated: true)
        }
        
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
