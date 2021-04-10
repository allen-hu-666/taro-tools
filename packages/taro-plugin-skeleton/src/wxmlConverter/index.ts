import htmlparser from 'htmlparser2'
import DomHandler from 'domhandler'
import domutils from 'domutils'

import swanHandlers from './swanHandlers'
import qqHandlers from './qqHandlers'
import alipayHandlers from './alipayHandlers'
import ttHandlers from './ttHandlers'
import quickappHandlers from './quickappHandlers'

const handlerMap = {
  swan: swanHandlers,
  tt: ttHandlers,
  alipay: alipayHandlers,
  qq: qqHandlers,
  quickapp: quickappHandlers
}

function walkNode(nodes = [], handlers) {
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

export default function wxmlConverter(wxmlString, platfrom) {
  const handler = new DomHandler()
  const parser = new htmlparser.Parser(handler)
  parser.parseComplete(wxmlString)
  walkNode(handler.dom, handlerMap[platfrom] || {})
  return domutils.getOuterHTML(handler.dom, { xmlMode: true})
}
