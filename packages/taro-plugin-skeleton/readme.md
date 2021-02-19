# Taro 骨架屏插件
优化原理类似Taro3的[Prerender](https://taro-docs.jd.com/taro/docs/prerender)
Taro page 初始化setData() 需要传递一个比较大的数据，导致初始化页面时会一段白屏的时间，这样的情况通常发生在页面初始化渲染的 wxml 节点数比较大或用户机器性能较低时发生。
所以该方案在白屏这段时间用一个无状态(dataless)的 wxml来显示给用户

## 相对Prerender的优势
*  wxml完全由自己控制，增加的size可控
*  避免了侵入项目写一些适配Prerender的代码
*  一些动态变化的css，如statusBarHeight，Prerender是写死的，不能随机型变化，所以有些机型会出现错位感，如这个(issue)[https://github.com/NervJS/taro/issues/6488]
*  Prerender经常会运行不起来
  
## 相对Prerender的劣势
* 需要自己写wxml代码，不过不用写css，所以工作量很少
## Install
```
  npm install taro-plugin-skeleton --save-dev
```

## Taro 项目中使用
``` javascript
  /* config/index.js */
  {
    plugins: [
      'taro-plugin-skeleton'
    ]
  }
```

## 添加骨架屏
每个页面的入口文件旁加一个pageName.skeleton.wxml文件来编写骨架屏wxml，插件会自动读取page入口文件旁的.skeleton.wxml，仿照页面的wxml结构即可，css不用重复写。
wxml里是以微信小程序wxml语法，其它小程序会自动编译为对应平台语法，但只支持一些基本语法，如for循环、条件判断、include
``` javascript
  /* src/pages/page.jsx */
  class Page{
    render() {
      return (
        <View className='page-root'>
          <View className='nav-bar' style={{height: (Taro.getSystemInfoSync().statusBarHeight + 50) + 'px'}}>首页</View>
          <Button onClick={this.increment}>+</Button>
          <Button onClick={this.decrement}>-</Button>
          <Button onClick={this.incrementAsync}>Add Async</Button>
          <Text>{counter}</Text>
        </View>
      )
    }
  }
```
``` html
  <!-- src/pages/page.skeleton.wxml -->
  <view class="page-root">
    <view className='nav-bar' style='height: {{statusBarHeight + 50}}px'>首页<View>
    <button>+</button>
    <button>-</button>
    <button>Add Async</button>
    <text>0</text>
  </view>
```
page.skeleton.wxml例子中的statusBarHeight变量可用这个插件来初始化
## 插件配置

``` typescript
  interface SkeletonPluginOptions {
    commonFolderName?: string // 公共模板的文件夹，默认skeleton-common，即公共wxml模板文件可放在src/skeleton-common文件夹内
  }
```
