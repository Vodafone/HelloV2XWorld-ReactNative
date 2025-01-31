import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';

export class MapButtonView extends React.Component<{
  image: any;
  onPress: () => void;
}> {
  render() {
    let {image, onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: Colors.grayColorOpacity70,
          borderRadius: 20,
          maxWidth: 75,
          maxHeight: 60,
          padding: 15,
        }}>
        <Image
          source={image}
          style={{
            tintColor: Colors.blackColor,
            justifyContent: 'center',
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    );
  }
}
