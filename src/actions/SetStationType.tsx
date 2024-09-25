import {storeData} from '../helpers/StorageHelper.tsx';
import { Constants } from "../utils/Contants.tsx";

export class SetStationType {
  async run(newStationTypeId: Number) {
    await storeData(Constants.station_type, String(newStationTypeId));
  }
}