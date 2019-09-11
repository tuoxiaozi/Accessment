import { queryPageByParam } from '/config/api'
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
    this.getReportLst()
  },
  onReachBottom() {
    if(this.data.pages.page < this.data.pages.pages) {
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
    var e = t.currentTarget.dataset.tag,n = this
    e != n.data.nowTag && n.setData({
      nowTag: e,
      leftPt: 25 * e
    }), this.getReportLst(e)
  },
  // 获取的历史测评列表
  getReportLst(st) {
    let n = this
    n.setData({st})
    my.showLoading({
      content: "加载中...",
    }), queryPageByParam({
      pageNum: n.data.pages.page,
      pageSize:n.data.pages.size,
      myState: st
    }).then(s => {
      console.log('--------->s', s.data.data.rows)
      if (my.hideLoading(), s.data && s.data.data.rows){
        n.setData({
          lists:  [...this.data.lists,...s.data.data.rows],
          pages: {
            size: this.data.pages.size,
            pages: s.data.data.total / this.data.pages.size,
            page: this.data.pages.page
          }
        })
      }
    }).catch(e=> {
      my.hideLoading();
      try {
        t.default.showToast(e.data.message)
      } catch (t) { }
    })
  }
})