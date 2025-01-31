import {
  NativeModules,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';
import {Credentials} from '../utils/Credentials.tsx';
import {SetStationType} from '../actions/SetStationType.tsx';
import {GetStationType} from '../actions/GetStationType.tsx';
import RNRestart from 'react-native-restart';

let camEventListener: (event: any) => void;

let itsEventListener: (event: any) => void;

let connectivityEventListener: (event: any) => void;

if (Platform.OS === 'android') {
  DeviceEventEmitter.addListener('CAM_LIST_CHANGED', data =>
    camEventListener(data),
  );
  DeviceEventEmitter.addListener('ITS_LOCATION_LIST_CHANGED', data =>
    itsEventListener(data),
  );
  DeviceEventEmitter.addListener('V2X_CONNECTIVITY_STATE_CHANGED', data =>
    connectivityEventListener(data),
  );
} else {
  const myModuleEvt = new NativeEventEmitter(NativeModules.NativeSDKModule);
  myModuleEvt.addListener('CAM_LIST_CHANGED', data => camEventListener(data));
  myModuleEvt.addListener('ITS_LOCATION_LIST_CHANGED', data =>
    itsEventListener(data),
  );
  myModuleEvt.addListener('V2X_CONNECTIVITY_STATE_CHANGED', data =>
    connectivityEventListener(data),
  );
}

export function initSDK(
  camListener: (event: any) => void,
  itsListener: (event: any) => void,
  connectivityListener: (event: any) => void,
) {
  camEventListener = camListener;
  itsEventListener = itsListener;
  connectivityEventListener = connectivityListener;
  if (Platform.OS === 'ios') {
    new GetStationType().run().then(stationType =>
      NativeModules.NativeSDKModule.initSDKModule({
        APP_ID: Credentials.APPLICATION_ID,
        APP_TOKEN: Credentials.APPLICATION_TOKEN,
        CAM_PUBLISH_GROUP: Credentials.CAM_PUBLISH_GROUP,
        CAM_SUBSCRIBE_GROUP: Credentials.CAM_SUBSCRIBE_GROUP,
        STATION_TYPE_ID: stationType,
      }),
    );
  } else {
    NativeModules.NativeSDKModule.initSDK(
      Credentials.APPLICATION_ID,
      Credentials.APPLICATION_TOKEN,
      Credentials.CAM_PUBLISH_GROUP,
      Credentials.CAM_SUBSCRIBE_GROUP,
    );
  }
}

export function changeStationType(stationType: number) {
  if (Platform.OS === 'ios') {
    NativeModules.NativeSDKModule.updateStationType(stationType);
    new SetStationType().run(stationType).then(() => RNRestart.restart());
  } else {
    NativeModules.NativeSDKModule.updateStationType(stationType);
    RNRestart.restart();
  }
}

export function stopSDK() {
  camEventListener = _ => {};
  itsEventListener = _ => {};
  connectivityEventListener = _ => {};
  Platform.OS === 'android'
    ? NativeModules.NativeSDKModule.stopSDK()
    : NativeModules.NativeSDKModule.stopSDKModule();
}
