//
//  CartesianPosition3dWithConfidenceImpl.h
//  VodafoneV2X
//
//  Created by Ahmed Hamdy Fahmy, Vodafone on 10/11/2023.
//

#import <Foundation/Foundation.h>
#import "CodingProtocols.h"
#import "CartesianCoordinateWithConfidenceImpl.h"
NS_ASSUME_NONNULL_BEGIN

@protocol CartesianPosition3dWithConfidence <NSObject, InitializableWithPointer, PublicPointer, UPERCodable>

@property (readonly) CartesianCoordinateWithConfidenceImpl *xCoordinate;
@property (readonly) CartesianCoordinateWithConfidenceImpl *yCoordinate;
@property (readonly, nullable) CartesianCoordinateWithConfidenceImpl *zCoordinate;

@end


@interface CartesianPosition3dWithConfidenceImpl : NSObject<CartesianPosition3dWithConfidence>

@property(nonatomic) NSInteger xCoordinateValue;
@property(nonatomic) NSInteger xCoordinateConfidence;

@property(nonatomic) NSInteger yCoordinateValue;
@property(nonatomic) NSInteger yCoordinateConfidence;

@property(nonatomic) NSInteger zCoordinateValue;
@property(nonatomic) NSInteger zCoordinateConfidence;

@end


NS_ASSUME_NONNULL_END
