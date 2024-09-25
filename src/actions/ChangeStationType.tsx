import {changeStationType} from '../data/SDKClient.tsx';

export class ChangeStationType {
  run(stationType: number) {
    changeStationType(stationType);
  }
}
