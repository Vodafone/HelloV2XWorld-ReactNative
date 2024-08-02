//
//  PerceivedObjectContainerImpl.h
//  VodafoneV2X
//
//  Created by Ahmed Hamdy Fahmy, Vodafone on 09/11/2023.
//

#import <Foundation/Foundation.h>
#import "CodingProtocols.h"
#import "PerceivedObjectImpl.h"

NS_ASSUME_NONNULL_BEGIN

@protocol PerceivedObjectContainer <NSObject>

@property(readonly) NSInteger numberOfPerceivedObjects;
@property(readonly, nullable) NSArray<id<PerceivedObject>>* perceivedObjects;

@end


@interface PerceivedObjectContainerImpl : NSObject<PerceivedObjectContainer, InitializableWithPointer, PublicPointer, UPERCodable>

@end

NS_ASSUME_NONNULL_END





