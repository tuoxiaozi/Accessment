const app = getApp();
// import {batchSetQuestionIsRead,queryMyQuestionPageByParam,qusUserDeleteById} from '../../config/api'

Page({
  data: {
    swipeIndex: null,
    curIndex: 0,
    all: true,
    vison: false,
    astigmia: false,
    colorBlind: false,
    pages: '',
    pageNum: 1,
    isReplay: 'Z',
    twArr: [],
    showbtline: false,
    delId: '',
  },

  onLoad() {
    // this._batchSetQuestionIsRead()
  },
  onShow() {
    this.setData({
      all: !0,
      noFlag: !1,
      curIndex: 0,
      pages: '',
      pageNum: 1,
      twArr: [],
      showbtline: false,
      delId: '',
    })
    // this._queryMyQuestionPageByParam()
  },
  onReady() {

  },
  // tab点击切换
  tabClick(e) {
    let index = e.currentTarget.dataset['index'];
    this.setData({
      curIndex: index,
      pages: '',
      pageNum: 1,
      twArr: [],
      showbtline: false,
    })
    switch (index) {
      case 0:
            this.setData({
              all: true,
              vison: false,
              astigmia: false,
              colorBlind: false,
            })
            break
      case 1:
            this.setData({
              all: false,
              vison: true,
              astigmia: false,
              colorBlind: false,
            })
            break
      case 2:
            this.setData({
              all: false,
              vison: false,
              astigmia: true,
              colorBlind: false,
            })
            break
      case 3:
            this.setData({
              all: false,
              vison: false,
              astigmia: false,
              colorBlind: true,
            })
            break

    }
    // this._queryMyQuestionPageByParam()
  },
  //标记为已读
  async _batchSetQuestionIsRead() {
    const result = await batchSetQuestionIsRead({
      type: 0,
    })
    //console.log('已读',result)
  },
  //列表
  async _queryMyQuestionPageByParam() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryMyQuestionPageByParam({
      pageNum: this.data.pageNum,
      pageSize: 10,
      queState: this.data.isReplay
    })
    console.log('list', result)
    my.hideLoading()
    this.setData({ pages: result.data.data.pages })
    let list = result.data.data.rows
    this.data.twArr = this.data.twArr.concat(list)
    this.setData({ twArr: this.data.twArr })
    console.log(this.data.twArr)
  },
  //to 详情
  toDetail(e) {
    let index = e.currentTarget.dataset['index'];
    let id = this.data.twArr[index].id
    my.navigateTo({ url: '/pages/circledetail/circledetail?id=' + id })
  },
  //to 回答
  toAnswer(e) {
    let index = e.currentTarget.dataset['index'];
    let id = this.data.twArr[index].id
    my.navigateTo({ url: '/pages/answer/answer?id=' + id })
  },
  //删除
  async _qusUserDeleteById() {
    const result = await qusUserDeleteById(this.data.delId)
    //console.log('删除',result)
    if (result.data.code === 0) {
      my.showToast({
        content: '删除成功',
        success: () => {
          this.setData({
            pageNum: 1,
            twArr: [],
            showbtline: false,
          })
          this._queryMyQuestionPageByParam()
        },
      });
    } else {
      my.showToast({
        content: result.data.message,
      });
    }
  },
  onRightItemClick(e) {
    my.confirm({
      title: '提示',
      content: '确定要删除吗？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let indx = this.data.swipeIndex
          let id = this.data.twArr[indx].id
          this.setData({ delId: id })
          this._qusUserDeleteById()
          e.done();
        } else {

        }
      },
    });
  },
  onItemClick(e) {

  },
  onSwipeStart(e) {
    this.setData({
      swipeIndex: e.index,
    });
  },
  onReachBottom(e) {
    if (this.data.pages > this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        // this._queryMyQuestionPageByParam()
      })
    } else {
      this.setData({ showbtline: true })
    }
  },
});
