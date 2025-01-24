import {initSDK} from '../data/SDKClient.tsx';
import {storeData} from '../helpers/StorageHelper.tsx';
import {Constants} from '../utils/Contants.tsx';

export class InitSDK {
  run(
    camListener: (event: any) => void,
    itsListener: (event: any) => void,
    connectivityListener: (event: any) => void,
  ) {
    initSDK(camListener, itsListener, async event => {
      connectivityListener(event);
      await storeData(Constants.connectivity_status, event.connectivity);
    });
  }
}
