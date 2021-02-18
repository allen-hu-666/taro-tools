import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'
import registPageInterceptor from '../packages/taro-plugin-mini-page-interceptor/dist/registPageInterceptor'
import './app.scss'

const store = {
  counterStore
}

registPageInterceptor(function Page(opt, oldPage) {
  console.log('registPageInterceptor', opt, oldPage)
  return oldPage(opt)
})
class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
