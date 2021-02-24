import initNativeApi from './apis'
import components from './components'

export { initNativeApi, components }
export * from './apis-list'

export const hostConfig = {
  initNativeApi,
  prepareUpdateData(data) {
    Object.keys(data).forEach(key => {
      if(/\.\[/.test(key)) { // 把
        const correctKey = key.replace(/\.\[/g, '[')
        data[correctKey] = data[key]
        delete data[key]
      }
    })
  }
}
