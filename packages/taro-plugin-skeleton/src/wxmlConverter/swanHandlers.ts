export default {
  attribute: function(attribute, node) {
    attribute.name = attribute.name.replace(/wx:/g, 's-')
    if(attribute.name === 'src' && node.name === 'include') {
      attribute.value = attribute.value.replace('.wxml', '.swan')
    }
    /* 丢掉两边的花括号 */
    if (hasBrackets(attribute.value)) {
      attribute.value = dropBrackets(attribute.value)
    }
  }
}


/**
 * 丢掉属性值两侧的花括号
 *
 * @param {string} value 属性值
 * @return {string}
 */
function dropBrackets(value = '') {
  const trimed = value.trim();
  if (/^{{.*}}$/.test(trimed)) {
      return trimed.slice(2, -2);
  }
  return value;
}

/**
 * 判断是否{{}}数据绑定
 *
 * @param {string} value 属性值
 * @return {boolean}
 */
function hasBrackets(value = '') {
  const trimed = value.trim();
  return /^{{.*}}$/.test(trimed);
}
