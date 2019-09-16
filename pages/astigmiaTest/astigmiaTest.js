import { addEyeTestRecord } from '../../config/api'
import env from '../../config/env'
Page({
  data: {
    value: '',// (1:正常,0:疑是散光)
    astigmatism: env.pic_url + 'astigmatism.png',

  },
  onLoad() { },
  radiochange(e) {
    const value = e.detail.value
    this.setData({
      value
    })
  },
  submit() {
    if ('' == this.data.value) {
      my.showToast({
        content: '选项不能为空'
      })
      return !1
    }
    this._addEyeTestRecord()
  },

  async _addEyeTestRecord() {
    let value = this.data.value
    console.log(value)
    let res = await addEyeTestRecord({
      astigmatismIsNormal: value,
      type: 2 // 散光类型
    })
    if (res.data.code === 0) {
      my.redirectTo({ url: '/pages/testResult/testResult?type=1&res=' + this.data.value })
    } else {
      console.log(res)
    }
  },

})
