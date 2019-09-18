import { querySuvInstanceByCode } from '../../config/api'
import env from '../../config/env'

Page({
  data: {},
  onLoad(t) {
    console.log('t', t)
    const instanceCode = t.code
    instanceCode ? this.setData({ instanceCode }) : my.navigateBack()
    this._querySuvInstanceByCode()
    my.showLoading()
  },
  async _querySuvInstanceByCode() {
    let res = await querySuvInstanceByCode({
      instanceCode: this.data.instanceCode
    })
    if (res.data.code === 0) {
      my.hideLoading()
      console.log(res.data.data)
    } else {
      my.hideLoading()
      my.showToast({ content: res.data.message })
    }
  },
  start () {
    my.navigateTo({
      url: `/pages/co-test/co-test?code=${this.data.instanceCode}`
    })
  }
});
