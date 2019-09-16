import { queryPageByParam } from '/config/api'
Page({
  data: {
    lists: [],
    pages: {
      size: 10,
      pages: 1,
      page: 1
    },
  },
  onLoad(t) {
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
      this.getReportLst()
    }
  },
  // 获取的历史测评列表
  getReportLst() {
    let n = this
    my.showLoading({
      content: "加载中...",
    }), queryPageByParam({
      pageNum: n.data.pages.page,
      pageSize: n.data.pages.size,
    }).then(s => {
      // console.log('--------->s', s.data.data.rows)
      if (my.hideLoading(), s.data && s.data.data.rows) {
        n.setData({
          lists: [...this.data.lists, ...s.data.data.rows],
          pages: {
            size: this.data.pages.size,
            pages: s.data.data.total / this.data.pages.size,
            page: this.data.pages.page
          },
          str: this.transformStr()
        })
      }
    }).catch(e => {
      my.hideLoading();
      try {
        t.default.showToast(e.data.message)
      } catch (t) { }
    })
  },
  // 处理数据
  transformStr(type) {
    switch (type) {
      case '1':
        return '视力'
        break
      case '2':
        return '散光'
        break
      case '3':
        return '色盲'
        break
    } 
  }
})