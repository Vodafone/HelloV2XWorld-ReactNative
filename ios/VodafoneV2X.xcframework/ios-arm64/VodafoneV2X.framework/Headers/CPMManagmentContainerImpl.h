//
//  CPMManagmentContainerImpl.h
//  VodafoneV2X
//
//  Created by Ahmed Hamdy Fahmy, Vodafone on 08/11/2023.
//

#import <Foundation/Foundation.h>
#import "CodingProtocols.h"

NS_ASSUME_NONNULL_BEGIN

@protocol CPMManagementContainer <NSObject>

@property(nonatomic) NSDate* referenceTime;
@property(nonatomic) CLLocationDegrees latitude;
@property(nonatomic) CLLocationDegrees longitude;

@property(nonatomic) NSInteger semiMajorConfidence;
@property(nonatomic) NSInteger semiMinorConfidence;
@property(nonatomic) V2XHeadingValue semiMajorOrientation;

@property(nonatomic) V2XAltitudeConfidence altitudeConfidence;
@property(nonatomic) CLLocationDistance altitudeValue;

@end


@interface CPMManagementContainerImpl : NSObject<CPMManagementContainer, InitializableWithPointer, PublicPointer, UPERCodable>

@end

NS_ASSUME_NONNULL_END
