import { IPluginContext } from '@tarojs/service'

interface MiniPageInterceptorOptions {
  globalKey?: string
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
    const appJsonAsset = assets['app.json']
    const pages = JSON.parse(appJsonAsset.source()).pages || []

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
