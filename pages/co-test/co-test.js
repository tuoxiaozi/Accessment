import { querySuvGroupQuestionAnswers,saveData } from '/config/api.js'
import env from '../../config/env'

Page({
  data: {
    tsLst: [], // 题目信息
    asLst: [], // 答案信息
    reStart: !1, // 重新开始标志位
    testCount: 0, // 当前题目id,
    asLst: [], //答案
    disabled: !1,
    instanceCode: ''
  },
  onLoad(t) {
    console.log('====>携带参数',t)
    this.setData({
      instanceCode: t.code
    })
    this._querySuvGroupQuestionAnswers()
    this.initTest()
  },
  onShow(){
    setTimeout(() => {
      my.hideLoading();
    }, 2000);
  },
  async _querySuvGroupQuestionAnswers() {
    my.showLoading()
    let res = await querySuvGroupQuestionAnswers({
      instanceCode: this.data.instanceCode
    })
    if (!res.data.code && res.data.data) {
      my.hideLoading()
      const list = res.data.data
      console.log(list)
    }
  },

  // 题目初始化
  initTest() {
    let e = this
    e.setData({
      asLst: [],
      testCount: 0
    })
  },
  // 点击答案
  changeSimTest(t) {
    const e = t.currentTarget.dataset, n = this, asLst = this.data.asLst
    const { i, j, ...o } = e
    asLst[i] = o
    n.setData({ asLst })
    n.nextQs(e.i, e)
    if(this.data.tsLst.length === e.i + 1 || this.data.asLst.length === this.data.tsLst.length){
      this.setData({
        disabled: false
      })
    }else{
      this.setData({
        disabled: true
      })
    }
  },
  // 跳转到下一题
  nextQs(s, i) {
    let n = this, o = this.data.tsLst, d = i.i
    if (null != i.i && null != i.j) {
      for (let u = 0; u < o[i.i].Select.length; u++) o[i.i].Select[u].isAct = !1
      o[i.i].Select[i.j].isAct = !0
    }
    i.i + 1 >= o.length && (d = i.i - 1),
    n.setData({
      testCount: d + 1,
      tsLst: o
    })
  },

  // 跳转到上一题
  prevQs() {
    let n = this
    n.setData({ testCount: n.data.testCount - 1 })
  },

  // 提交数据
  submitTest() {
    let e = this, c = e.data.curSec
    if(tsLst[c].length > e.data.asLst.length){
      my.showToast({
        type: 'fail',
        content: '选择不全',
        duration: 3000,
        success: () => {
        },
      });
      return;
    }
    my.showLoading({
      content: "正在保存...",
    })
      saveData({
        saveGroupCode: e.data.secLst[e.data.curSec].key,
        gender: e.data.gender,
        replyRecordList: e.data.asLst // 答案
      }).then(t => {
        console.log(t);
        if(t.data.code === 0){
          my.hideLoading()
        }else {
          my.showToast({
            content: t.data.message,
            success: () => {
              my.navigateBack()
            },
          })
        }
      }).catch(e => {
        my.hideLoading()
        try {
          my.showToast({ content: t.data.message })
        } catch (t) { }
      })
  },
  reStart() {
    var e = this
    e.setData({
      tsLst: [],
      reStart: !1,
      testCount: 0,
      curSec: 0
    }), e.initTest()
  },
  showReport(conclusion, conclusionTxt) {
    my.redirectTo({
      // url: `/pages/result/result&id=${this.data.resId}`
      url: '/pages/result/result?conclusion=' + conclusion + '&conclusionTxt=' + conclusionTxt
    })
  }
})