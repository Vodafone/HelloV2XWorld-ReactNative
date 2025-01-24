import {Platform} from 'react-native';

export const Images = {
  zoomOutIcon:
    Platform.OS === 'ios'
      ? {uri: 'zoomOut'}
      : require('../../android/app/src/main/assets/zoom_out.png'),
  zoomInIcon:
    Platform.OS === 'ios'
      ? {uri: 'zoomIn'}
      : require('../../android/app/src/main/assets/zoom_in.png'),
  settingsIcon:
    Platform.OS === 'ios'
      ? {uri: 'settings'}
      : require('../../android/app/src/main/assets/settings.png'),
  currentLocationArrow:
    Platform.OS === 'ios'
      ? {uri: 'currentLocation'}
      : require('../../android/app/src/main/assets/current_location-prod.png'),
  camUserArrow:
    Platform.OS === 'ios'
      ? {uri: 'camUserArrow'}
      : require('../../android/app/src/main/assets/cam_user_arrow-prod.png'),
};
