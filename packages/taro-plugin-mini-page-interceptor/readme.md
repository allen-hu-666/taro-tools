# Taro 小程序Page拦截器
这个插件可以让你劫持Page构造器，实现更底层的逻辑
## Install
```
  npm install taro-plugin-mini-page-interceptor --save-dev
```

## Taro 项目中使用
``` javascript
  /* config/index.js */
  {
    plugins: [
      'taro-plugin-mini-page-interceptor'
    ]
  }
```
## 插件配置

``` typescript
  interface MiniPageInterceptorOptions {
    globalKey?: string // 插件会使用这个key来挂载拦截器到全局变量，默认为__page_interceptor，如wx.__page_interceptor、swan.__page_interceptor
  }
```

## 注入代码
请在入口文件app.js顶部注册拦截器
``` javascript
  import { registPageInterceptor, assignPageOptions } from 'taro-plugin-mini-page-interceptor/dist/pageInterceptor'

  // registPageInterceptor只能被调用一次，多次调用无效
  registPageInterceptor(function MyPage(pageOptions, oldPage) { // options为page配置，oldPage为原生Page构造器
    // 在这里可以劫持options，做一些自己的操作，如添加data
    pageOptions = assignPageOptions(pageOptions, {
      data: {
        statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
        // 初始data，会被assign到pageOptions.data
      },
      onLoad(options) { // function会和pageOptions的function合并

      }
    })
    oldPage(pageOptions)
  }, '__page_interceptor') // 第二个参数为globalKey，默认__page_interceptor
```
