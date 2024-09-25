import {getStoredData} from '../helpers/StorageHelper.tsx';
import { Constants } from "../utils/Contants.tsx";

export class GetRecentConnectivityStatus {
  run(listener: (status: string) => void){
    getStoredData(Constants.connectivity_status).then((data) => {
      listener(data ?? "Connecting ..");
    });
  }
}
