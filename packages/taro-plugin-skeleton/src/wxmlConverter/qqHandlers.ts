export default {
  attribute: function(attribute, node) {
    attribute.name = attribute.name.replace(/wx:/g, 'qq:')
    if(attribute.name === 'src' && node.name === 'include') {
      attribute.value = attribute.value.replace('.wxml', '.qml')
    }
  }
}
