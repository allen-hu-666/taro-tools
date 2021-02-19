import { IPluginContext } from '@tarojs/service'
import wxmlConverter from './wxmlConverter/index'
const path = require('path')
const fs = require('fs');

const htmlExtnameMap = {
  weapp: 'wxml',
  swan: 'swan',
  tt: 'ttml',
  alipay: 'axml',
  qq: 'qml'
}

interface SkeletonPluginOptions {
  commonFolderName?: string
}

export default (ctx: IPluginContext, options: SkeletonPluginOptions = {}) => {
  const htmlExtname = htmlExtnameMap[process.env.TARO_ENV]
  if (!htmlExtname) return
  const commonFolderName = options.commonFolderName || 'skeleton-common'
  const skeletonTmpWarrper = '<block wx:if="{{!root.cn || !root.cn[0]}}">${skeletonTmp}</block>';

  ctx.modifyBuildAssets(({ assets }) => {
    const pages = JSON.parse(assets['app.json'].source()).pages
    pages.forEach(pagePath => {
      const skeletonPath = path.resolve(process.cwd(), './src/' + pagePath) + `.skeleton.wxml`
      try {
        const skeletonTmpData = fs.readFileSync(skeletonPath, 'utf-8');
        const pageTmpAsset = assets[pagePath + `.${htmlExtname}`]
        const prevSource = pageTmpAsset.source
        const onlyShowSkeletonView = JSON.parse(assets[pagePath + `.json`].source()).onlyShowSkeletonView
        pageTmpAsset.source = function() {
          if(onlyShowSkeletonView) return wxmlConverter(skeletonTmpData, process.env.TARO_ENV);
          const oldSource = prevSource.call(pageTmpAsset)
          return oldSource + '\n' + wxmlConverter(skeletonTmpWarrper.replace('${skeletonTmp}', skeletonTmpData), process.env.TARO_ENV)
        }
      } catch (_error) {

      }
    });
    /* 处理commonFolder里面的wxml */
    const files = []
    try {
      const files = fs.readdirSync(path.resolve(process.cwd(), './src/' + commonFolderName))
    } catch (error) {
      // console.error(error)
    }

    files.forEach(file => {
      if(path.extname(file) !== '.wxml') return
      const fileString = fs.readFileSync(path.resolve(process.cwd(), `./src/${commonFolderName}/${file}`), 'utf-8')
      const resultTemplate = wxmlConverter(fileString, process.env.TARO_ENV)
      assets[commonFolderName + '/' + file.replace('.wxml', `.${htmlExtname}`)] = {
        size: function() {
          return resultTemplate.length
        },
        source: function() {
          return resultTemplate
        }
      }
    })
  })


}

