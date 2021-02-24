import { processApis } from '@tarojs/shared';
import { noPromiseApis, needPromiseApis} from './apis-list'

declare const qa

export default function initNativeApi(taro) {
  processApis(taro, qa, {
      noPromiseApis,
      needPromiseApis
  });
}

