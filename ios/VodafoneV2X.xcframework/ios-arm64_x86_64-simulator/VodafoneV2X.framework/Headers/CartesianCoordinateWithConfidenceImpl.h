//
//  CartesianCoordinateWithConfidenceImpl.h
//  VodafoneV2X
//
//  Created by Ahmed Hamdy Fahmy, Vodafone on 10/11/2023.
//


#import <Foundation/Foundation.h>
#import "CodingProtocols.h"

NS_ASSUME_NONNULL_BEGIN

@protocol CartesianCoordinateWithConfidence <NSObject, InitializableWithPointer, PublicPointer, UPERCodable>

@property(nonatomic) NSInteger value;
@property(nonatomic) NSInteger confidence;

@end


@interface CartesianCoordinateWithConfidenceImpl : NSObject<CartesianCoordinateWithConfidence>

@end

NS_ASSUME_NONNULL_END
