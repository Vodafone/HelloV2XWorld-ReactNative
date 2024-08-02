import {storeData} from '../helpers/StorageHelper.tsx';
import { Constants } from "../utils/Contants.tsx";

export class AcceptTermsAndConditions {
  async run(accepted: boolean) {
    await storeData(Constants.terms_and_conditions_acceptance, String(accepted));
  }
}
