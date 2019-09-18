import { querySuvInstancePage } from '../../config/api'

Page({
  data: {
    list: [],
    code: null,
    type: null
  },
  onLoad() {},
  onShow() {
    this._querySuvInstancePage()
  },
  // to中醫測評
  toMedical() {
    my.navigateTo({
      url: "/pages/medical/medical"
    })
  },
  // 首页问卷分页查询
  async _querySuvInstancePage() {
    my.showLoading()
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
  }
});
