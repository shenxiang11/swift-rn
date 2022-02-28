//
//  RNManagerBridge.m
//  demo
//
//  Created by Xiang Shen on 2022/2/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNManager, NSObject)
RCT_EXTERN_METHOD(pop)
RCT_EXTERN_METHOD(open:(NSString*)moduleName)
RCT_EXTERN_METHOD(sayHelloWorld:(RCTResponseSenderBlock)callback)
@end
