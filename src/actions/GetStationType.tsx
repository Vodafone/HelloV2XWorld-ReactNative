import {getStoredData} from '../helpers/StorageHelper.tsx';
import { Constants } from "../utils/Contants.tsx";

export class GetStationType {
    async run(): Promise<String> {
      return await getStoredData(Constants.station_type) ?? "5";
    }
}
