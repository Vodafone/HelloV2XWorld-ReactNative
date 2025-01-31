import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  openSettings,
  RESULTS,
} from 'react-native-permissions';
import {okAlert, okCancelAlert} from '../components/Dialogs.tsx';
import {Strings} from '../utils/Strings.tsx';

export class CheckLocationPermission {
  public async run(): Promise<boolean> {
    return Platform.OS === 'ios'
      ? this.checkIosPermission()
      : this.checkAndroidPermission();
  }

  private async checkAndroidPermission(): Promise<boolean> {
    let result = await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ]);
    let fineLocationPermissionResult =
      result['android.permission.ACCESS_FINE_LOCATION'];
    let coarseLocationPermissionResult =
      result['android.permission.ACCESS_COARSE_LOCATION'];

    if (
      fineLocationPermissionResult === RESULTS.BLOCKED ||
      coarseLocationPermissionResult === RESULTS.BLOCKED
    ) {
      okCancelAlert(
        Strings.permission_block_title,
        Strings.permission_block_message,
        () => openSettings(),
      );
      return false;
    } else if (
      fineLocationPermissionResult === RESULTS.DENIED ||
      coarseLocationPermissionResult === RESULTS.DENIED
    ) {
      okAlert('', Strings.permission_rejection_message);
      return false;
    } else {
      return (
        fineLocationPermissionResult === RESULTS.GRANTED &&
        coarseLocationPermissionResult === RESULTS.GRANTED
      );
    }
  }

  private async checkIosPermission(): Promise<boolean> {
    let result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (result === RESULTS.BLOCKED) {
      okCancelAlert(
        Strings.permission_block_title,
        Strings.permission_block_message,
        () => openSettings(),
      );
      return false;
    } else if (result === RESULTS.DENIED) {
      okAlert('', Strings.permission_rejection_message);
      return false;
    } else {
      return result === RESULTS.GRANTED;
    }
  }
}
