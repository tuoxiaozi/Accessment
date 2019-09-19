import { querySuvInstanceByCode } from '../../config/api'
import env from '../../config/env'
import parse from 'mini-html-parser2'

Page({
  data: {
    comments: '',
    img: '',
    name: ''
  },
  onLoad(t) {
    const instanceCode = t.code
    this.setData({ instanceCode })
    this._querySuvInstanceByCode()
  },
  async _querySuvInstanceByCode() {
    my.showLoading({ content: '加载中...' })
    let res = await querySuvInstanceByCode({
      instanceCode: this.data.instanceCode
    })
    if (!res.data.code && res.data.data) {
      my.hideLoading()
      // console.log(res.data.data)
      const data = res.data.data
      const { comments: html, welcomeImg: img, name: nameOri } = data
      const [title, name] = nameOri.split('·')
      this.setData({ title, name })
      parse(html, (err, comments) => !err && this.setData({ img, comments }))
    } else {
      my.hideLoading()
      my.showToast({ content: res.data.message })
    }
  },
  start() {
    my.navigateTo({
      url: `/pages/co-test/co-test?code=${this.data.instanceCode}`
    })
  }
});
