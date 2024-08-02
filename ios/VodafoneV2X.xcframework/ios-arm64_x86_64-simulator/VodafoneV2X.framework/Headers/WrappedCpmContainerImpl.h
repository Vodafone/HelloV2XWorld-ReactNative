//
//  WrappedCpmContainerImpl.h
//  VodafoneV2X
//
//  Created by Ahmed Hamdy Fahmy, Vodafone on 10/11/2023.
//

#import <Foundation/Foundation.h>
#import "CodingProtocols.h"
#import "PerceivedObjectContainerImpl.h"

NS_ASSUME_NONNULL_BEGIN

@protocol WrappedCpmContainer <NSObject>

@property(nonatomic) NSInteger containerId;
@property(readonly) PerceivedObjectContainerImpl* containerData;



@end


@interface WrappedCpmContainerImpl : NSObject<WrappedCpmContainer, InitializableWithPointer, PublicPointer, UPERCodable>

@end

NS_ASSUME_NONNULL_END
