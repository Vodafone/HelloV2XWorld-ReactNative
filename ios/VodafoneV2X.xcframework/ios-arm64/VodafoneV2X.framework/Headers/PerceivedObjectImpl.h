//
//  PerceivedObjectImpl.h
//  VodafoneV2X
//
//  Created by Ahmed Hamdy Fahmy, Vodafone on 10/11/2023.
//

#import <Foundation/Foundation.h>
#import "CodingProtocols.h"
#import "CartesianPosition3dWithConfidenceImpl.h"

NS_ASSUME_NONNULL_BEGIN

@protocol PerceivedObject <NSObject, InitializableWithPointer, PublicPointer, UPERCodable>

@property(nonatomic) long objectId;
@property(nonatomic) long measurementDeltaTime;
@property(nonatomic) CLLocationDegrees latitude;
@property(nonatomic) CLLocationDegrees longitude;
@property(readonly) CartesianPosition3dWithConfidenceImpl *position;
@property(nonatomic) StationKind objectType;
@property(nonatomic) long ageInMs;
@property(nonatomic) float speedInKmH;
@property(nonatomic) float headingInDegree;
@property(nonatomic) long dimensionXInCm;
@property(nonatomic) long dimensionYInCm;

-(CLLocationCoordinate2D) getCoordinates:(CLLocationCoordinate2D) refPoint;

@end


@interface PerceivedObjectImpl : NSObject<PerceivedObject>

@end

NS_ASSUME_NONNULL_END
