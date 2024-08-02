//
//  CPMImpl.h
//  VodafoneV2X
//
//  Created by Ahmed Hamdy Fahmy, Vodafone on 25/08/2023.
//

#import <Foundation/Foundation.h>
#import "CPMManagmentContainerImpl.h"
#import "CodingProtocols.h"
#import "CommonEnums.h"
#import "WrappedCpmContainerImpl.h"

NS_ASSUME_NONNULL_BEGIN

@protocol CPM <NSObject, InitializableWithPointer, PublicPointer, UPERCodable>

// ItsPduHeader
@property(readonly) NSUInteger stationID;
@property(readonly) ProtocolVersion protocolVersion;
@property(readonly) MessageID messageID;

// Payload
@property(readonly) CPMManagementContainerImpl* managementContainer;
@property(readonly) NSArray<id<WrappedCpmContainer>> *wrappedCpmContainers;

- (void)locationSource:(CLLocation*)location heading:(nullable CLHeading *)heading;

@end

@interface CPMImpl : NSObject<CPM>

// ItsPduHeader
@property(nonatomic) NSUInteger stationID;
@property(nonatomic) ProtocolVersion protocolVersion;
@property(nonatomic) MessageID messageID;

// CPMManagementContainer
@property(nonatomic) NSDate* referenceTime;
@property(nonatomic) CLLocationDegrees latitude;
@property(nonatomic) CLLocationDegrees longitude;
@property(nonatomic) NSDate* generationUTCTimeInMs;
@property(nonatomic, nullable) NSMutableArray<id<PerceivedObject>>* perceivedObjects;

@end

NS_ASSUME_NONNULL_END
