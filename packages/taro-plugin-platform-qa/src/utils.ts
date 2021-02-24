import htmlparser from 'htmlparser2'
import { DomHandler } from 'domhandler'
import domutils from 'domutils'

export function getPlainTextName(level) {
  return `tmpl_${level}__text` // 原本是tmpl_${level}_#text，但快应用不支持#作为name
}


function walkNode(nodes: Array<any> = [], handlers) {
  nodes.forEach(node => {
    /* node钩子 */
    if(handlers.node) {
      handlers.node(node)
    }
    /* tag钩子 */
    if(handlers.tag && node.type === 'tag') {
      handlers.tag(node)
    }
    /* text钩子 */
    if(handlers.text && node.type === 'text') {
      handlers.text(node)
    }
    /* attribute钩子 */
    if(handlers.attribute && node.attribs) {
      const attribs = node.attribs
      node.attribs = {}
      Object.keys(attribs).forEach(attribName => {
        const attribute = {
          name: attribName,
          value: attribs[attribName]
        }
        handlers.attribute(attribute, node)
        node.attribs[attribute.name] = attribute.value
      })
    }
    walkNode(node.children, handlers)
  })
}


export function modifyXml(xmlString, handlers) {
  const handler = new DomHandler()
  const parser = new htmlparser.Parser(handler)
  parser.parseComplete(xmlString)
  walkNode(handler.dom, handlers || {})
  return domutils.getOuterHTML(handler.dom, { xmlMode: true})
}
