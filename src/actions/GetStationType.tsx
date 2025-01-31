import {getStoredData} from '../helpers/StorageHelper.tsx';
import {Constants} from '../utils/Contants.tsx';

export class GetStationType {
  async run(): Promise<string> {
    return (await getStoredData(Constants.station_type)) ?? '5';
  }
}
