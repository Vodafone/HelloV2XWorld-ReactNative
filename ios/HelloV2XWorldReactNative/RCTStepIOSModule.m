//
//  RCTStepModule.m
//  ReactNative4IOS
//
//  Created by Aya Hamoud on 01/05/2024.
//

#import "RCTStepIOSModule.h"
#import <React/RCTLog.h>
#import "hellov2xworld_reactnative-Swift.h"

@implementation RCTStepIOSModule {
  bool hasListeners;
}

RCT_EXPORT_MODULE(NativeSDKModule);

RCT_EXPORT_METHOD(printText:(NSString *)name) {
 RCTLogInfo(@"Pretending to create an event %@", name);
}

RCT_EXPORT_METHOD(initSDKModule: (NSDictionary *)credentials) {
  StepSdkHelper * sdkHelper = [StepSdkHelper sharedInstance];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(triggerEvent:) name:@"SendNewEvent" object:nil];
  [sdkHelper initSDKWithCredentials:credentials];
}

RCT_EXPORT_METHOD(stopSDKModule) {
  StepSdkHelper * sdkHelper = [StepSdkHelper sharedInstance];
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  [sdkHelper stopSDK];
}

RCT_EXPORT_METHOD(updateStationType: (NSInteger) stationType) {
  StepSdkHelper * sdkHelper = [StepSdkHelper sharedInstance];
  [sdkHelper updateStationTypeWithStationType: stationType];
}

- (void)triggerEvent:(NSNotification *)notification {
  if (hasListeners) {// Only send events if anyone is listening
    NSDictionary* userInfo = notification.userInfo;
    NSDictionary* newData = (NSDictionary*)userInfo[@"Data"];
    NSString* eventName = (NSString*)userInfo[@"EventName"];

    [self sendEventWithName:eventName body: newData];
   }
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"V2X_CONNECTIVITY_STATE_CHANGED", @"ITS_LOCATION_LIST_CHANGED", @"CAM_LIST_CHANGED"];
}

- (void)startObserving {
  hasListeners = YES;
}

- (void)stopObserving {
  hasListeners = NO;
}

@end




