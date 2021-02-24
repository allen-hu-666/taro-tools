import { IPluginContext } from '@tarojs/service'
import Qa from './program'

export { Qa }

export default (ctx: IPluginContext) => {
  ctx.registerPlatform({
    name: 'qa',
    useConfigName: 'mini',
    async fn ({ config }) {
      const program = new Qa(ctx, config)
      program.start()
    }
  })

  ctx.modifyBuildAssets(({ assets }) => {

    /* 快应用page的height必须为100% */
    const appCss = assets['app.css']
    const appCssSource = appCss.source
    appCss.source = function() {
      return appCssSource.call(appCss) + ';page{height: 100%};'
    }
  })
}
