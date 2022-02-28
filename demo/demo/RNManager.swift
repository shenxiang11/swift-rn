//
//  RNManager.swift
//  demo
//
//  Created by Xiang Shen on 2022/2/24.
//

import UIKit
import React

@objc(RNManager)
class RNManager: RCTEventEmitter {
    
    static var shared: RNManager?
    
    override init() {
        super.init()
        RNManager.shared = self
    }
        
    override static func moduleName() -> String! {
        "RNManager"
    }
    
    override func supportedEvents() -> [String]! {
        return ["testEvent"]
    }
    
    @objc func pop() {
        DispatchQueue.main.async {
            if let navigationController = UIApplication.shared.windows.first?.rootViewController as? UINavigationController {
                navigationController.popViewController(animated: true)
            }
        }
    }
    
    @objc func open(_ moduleName: String) {
        DispatchQueue.main.async {
            if let navigationController = UIApplication.shared.windows.first?.rootViewController as? UINavigationController {
                let rootView = RCTRootView(
                    bundleURL: jsCodeLocation,
                    moduleName: moduleName,
                    initialProperties: nil,
                    launchOptions: nil
                )
                let vc = UIViewController()
                vc.view = rootView
                navigationController.pushViewController(vc, animated: true)
            }
        }
    }
    
    @objc func sayHelloWorld(_ callback: RCTResponseSenderBlock) -> Void {
        callback([nil, ["success": true]])
    }
        
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
