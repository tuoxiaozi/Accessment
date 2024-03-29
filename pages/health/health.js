import { querySuvInstancePage } from '../../config/api'

Page({
  data: {
    list: [],
    code: void 0,
    type: void 0
  },
  onLoad() { },
  onShow() {
    this._querySuvInstancePage()
  },
  // 首页问卷分页查询
  async _querySuvInstancePage() {
    my.showLoading({ content: '加载中...' })
    let res = await querySuvInstancePage({
      pageNum: 1,
      pageSize: 3
    })
    if (!res.data.code && res.data.data) {
      my.hideLoading()
      const list = res.data.data.rows
      this.setData({ list })
      console.log(this.data.list)
    } else {
      my.hideLoading()
      my.showToast({
        content: res.data.message
      })
    }
  },
  toWelcome(e) {
    const { code, type } = e.target.dataset
    type ? my.navigateTo({
      url: `/pages/medical/medical`
    })
      : code && my.navigateTo({
        url: `/pages/co-testStart/co-testStart?code=${code}&type=${type}`
      })
  }
})
