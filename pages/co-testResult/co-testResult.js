import { querySuvUserReportDetail } from '/config/api.js'
import env from '../../config/env'
Page({
  data: {
    score: 0,
    summary: '',
    num: 0,
    instanceCode: ''
  },
  onLoad(t) {
    console.log(t)
    const { reportId, jumpType } = t
    console.log('t------>', t)
    this._querySuvUserReportDetail(reportId)
  },
  onShow() { },

  async _querySuvUserReportDetail(reportId) {
    my.showLoading({ content: '加载中...' })
    let res = await querySuvUserReportDetail({
      reportId
    })
    console.log(res)
    if (!res.data.code && res.data.data) {
      my.hideLoading()
      console.log(res.data.data)
      const data = res.data.data
      const { score, summary, questionNumber: num, instanceCode } = data
      this.setData({ score, summary, num ,instanceCode})
    } else {
      my.showToast({ content: res.data.message, instanceCode})
    }
  },
  reStart() {
    my.redirectTo({
      url:`/pages/co-testStart/co-testStart?code=${this.data.instanceCode}`
    })
  }
});
