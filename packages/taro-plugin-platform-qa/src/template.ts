import { RecursiveTemplate, Shortcuts } from '@tarojs/shared'
import { modifyXml } from './utils'


/* ide下测试支持template递归调用 */
export default class Template extends RecursiveTemplate {
  supportXS = true
  Adapter = {
    if: 'qa:if',
    else: 'qa:else',
    elseif: 'qa:elif',
    for: 'qa:for',
    forItem: 'qa:for-item',
    forIndex: 'qa:for-index',
    key: 'qa:key',
    xs: 'qjs',
    type: 'qa'
  }

  buildXsTemplate () {
    return '<qjs module="xs" src="./utils.qjs" />'
  }

  replacePropName (name: string, value: string, componentName: string) {
    if (value === 'eh') {
      const nameLowerCase = name.toLowerCase()
      if (nameLowerCase === 'bindlongtap' && componentName !== 'canvas') return 'bindlongpress'
      return nameLowerCase
    }
    return name
  }

  buildContainerTemplate(level: number, restart = false) {
    const resTemplate = super.buildContainerTemplate(level, restart)

    return modifyXml(resTemplate, {
      attribute: function(attribute, node) {
        if(attribute.name === 'is' && node.name === 'template') {
          attribute.value = attribute.value.replace('#', 'i_')
        }
      }
    })
  }

  /*原本是tmpl_${level}_#text， 但快应用不支持#作为template name，所以把#替换成i_ */
  buildPlainTextTemplate(level: number): string {
    return `
<template name="tmpl_${level}_i_text" >
  <block>{{i.${Shortcuts.Text}}}</block>
</template>
    `
  }

  buildXSTmplName() {
    return `function (l, n) {
    return ('tmpl_' + l + '_' + n).replace('#', 'i_')
  }`
  }
}
