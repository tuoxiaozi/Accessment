import { queryMyReportListPage } from '/config/api'
import { JIBEN, PEACE, QIXIANG, QIXUXIANG, QIYU, SHIRE, SHIXIANG, TAN, TANGXIANG, TEBING, TEXIANG, XUEXIANG, XUEYU, YANG, YINXIANG, YIN, YANGXIANG } from '/mock/base64image'
import env from '../../config/env'

Page({
  data: {
    lists: [],
    nowTag: 0,
    tsStateImg: null,
    st: 0,
    pages: {
      size: 10,
      pages: 1,
      page: 1
    }
  },
  onLoad(t) {
   },
  onShow() {
    this.setData({lists: []})
    this.getReportLst()
  },
  onReachBottom() {
    if (this.data.pages.page < this.data.pages.pages) {
      this.setData({
        pages: {
          size: this.data.pages.size,
          pages: this.data.pages.pages,
          page: this.data.pages.page + 1
        }
      })
      this.getReportLst(this.data.st)
    }
  },
  // 切换tabBar
  switchHomeTag(t) {
    this.setData({
      lists: [],
      pages: {
        size: this.data.pages.size,
        pages: 1,
        page: 1
      }
    })
    var e = t.currentTarget.dataset.tag, n = this
    e != n.data.nowTag && n.setData({
      nowTag: e,
      leftPt: 33.3 * e
    }), this.getReportLst(e)
  },
  // 获取的历史测评列表
  getReportLst(st) {
    let n = this
    n.setData({ st })
    my.showLoading({
      content: "加载中...",
    }), queryMyReportListPage({
      pageNum: n.data.pages.page,
      pageSize: n.data.pages.size,
      myState: st
    }).then(s => {
      if (my.hideLoading(), s.data && s.data.data.rows) {
        n.setData({
          lists: [...this.data.lists, ...s.data.data.rows],
          pages: {
            size: this.data.pages.size,
            pages: s.data.data.total / this.data.pages.size,
            page: this.data.pages.page
          }
        })
        console.log('list', this.data.lists)
      }
    }).catch(e => {
      my.hideLoading();
      try {
        t.default.showToast(e.data.message)
      } catch (t) { }
    })
  },
  switchStateImg() {
    let n = this
    console.log(n.lists)
    n.lists.map(v => {
      v.conclusion.split(',')
    })
    console.log(n.lists)
  },

  toRepeat(e) {
    const { state, type, conclusion, conclusionTxt, reportId } = e.currentTarget.dataset
    if (type === 'zytcpg') {
      if (state == 1 || state == 0) {
        console.log(state)
        my.navigateTo({
          url: `/pages/medical/medical`
        })
      } else {
        my.navigateTo({
          url: `/pages/result/result?conclusion=${conclusion}&conclusionTxt=${conclusionTxt}`
        })
      }
    } else {
      my.navigateTo({
        url: `/pages/co-testResult/co-testResult?reportId=${reportId}&jumpType=2`
      })
    }
  }

})