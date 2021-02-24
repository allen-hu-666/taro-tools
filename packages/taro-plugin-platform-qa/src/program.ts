import { TaroPlatformBase } from '@tarojs/service'
import Template from './template'

const PACKAGE_NAME = 'taro-plugin-platform-qa'

export default class Qa extends TaroPlatformBase {
  platform = 'qa'
  globalObject = 'qa'
  runtimePath = `${PACKAGE_NAME}/dist/runtime`
  fileType = {
    templ: '.qxml',
    style: '.css',
    config: '.json',
    script: '.js',
    xs: '.qjs'
  }

  template = new Template()

  /**
   * 调用 mini-runner 开启编译
   */
}
