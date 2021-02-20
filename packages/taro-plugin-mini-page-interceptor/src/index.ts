import { IPluginContext } from '@tarojs/service'
import { ConcatSource } from 'webpack-sources'
import { promoteRelativePath, META_TYPE } from '@tarojs/helper'

interface MiniPageInterceptorOptions {
  globalKey?: string;
  pages?: Array<String>;
}
const GLOBALE_VAR_MAP = {
  weapp: 'wx',
  swan: 'swan',
  alipay: 'my',
  tt: 'tt',
  qq: 'qq',
  quickapp: 'qa'
}

export default (ctx: IPluginContext, pluginOpts: MiniPageInterceptorOptions = {}) => {
  const GLOBALE_VAR = GLOBALE_VAR_MAP[process.env.TARO_ENV]
  if(!GLOBALE_VAR) return
  const globalKey = pluginOpts.globalKey || '__page_interceptor'

  ctx.modifyBuildAssets(({ assets }) => {
    const pages = pluginOpts.pages || JSON.parse(assets['app.json'].source()).pages || []

    pages.forEach(pagePath => {
      const asset = assets[pagePath + '.js']
      const prevSource = asset.source
      const pageScript = `var oldPage = Page; Page = ${GLOBALE_VAR}.${globalKey}(oldPage);`;

      asset.source = function() {
        return `${pageScript};${prevSource.call(asset)}`
      }
    });
  })
}
