
/* eslint-disable no-undef */
declare const wx: any

declare const swan: any

declare const my: any

declare const tt: any

declare const qq: any

declare const qa: any

let isRegisted = false
export function registPageInterceptor(interceptor: (options: Object, oldPage: Function) => undefined, globalKey: string = '__page_interceptor') {
  if(isRegisted) return;
  isRegisted = true

  setGlobalVariable(globalKey, function(oldPage) {
    return function Page(options) {
      interceptor(options, oldPage)
    }
  })
}

export function assignPageOptions(options, newOptions) {
  options.data = Object.assign(options.data || {}, newOptions.data || {})

  Object.keys(newOptions).forEach(key => {
    if(key === 'data') return;
    if(typeof newOptions[key] === 'function' && typeof options[key] === 'function') {
      const oldFn = options[key],
        newFn = newOptions[key]
      options[key] = function() {
        newFn.apply(this, arguments)
        oldFn.apply(this, arguments)
      }
    } else {
      options[key] = newOptions[key]
    }
  })

  return options
}


function setGlobalVariable(key, value) {
  switch (process.env.TARO_ENV) {
    case 'weapp':
      wx[key] = value
      break;
    case 'swan':
      swan[key] = value
      break;
    case 'alipay':
      my[key] = value
    break;
    case 'tt':
      tt[key] = value
    break;
    case 'qq':
      qq[key] = value
    break;
    case 'quickapp':
      qa[key]  = value
    break;
    case 'h5':
      window[key] = value
    break;
    default:
      break;
  }
}
