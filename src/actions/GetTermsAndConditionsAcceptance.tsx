import {getStoredData} from '../helpers/StorageHelper.tsx';
import {Constants} from '../utils/Contants.tsx';

export class GetTermsAndConditionsAcceptance {
  async run(): Promise<boolean> {
    return (
      (await getStoredData(Constants.terms_and_conditions_acceptance)) ===
      'true'
    );
  }
}
