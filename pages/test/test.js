import { tsLst, secLst, alps } from '/mock/data.js'
import { saveData } from '/config/api.js'
import env from '../../config/env'

Page({
  data: {
    secLst: [], //组成部分名称
    tsLst: [], // 题目信息
    asLst: [], // 答案信息
    reStart: !1, // 重新开始标志位
    testCount: 0, // 当前题目id,
    alps: [], // 字母表
    asLst: [], //答案
    curSec: 0,
    curSecOri: 0,
    gender: 1, // 性别 1 男 2 女
    resId: "",
    showSele: false,
    disabled: true,
  },
  onLoad(opt) {
    console.log('====>携带参数',opt)
    const {gender, curSec, state} = opt
    if(gender){
      this.setData({
        gender
      })
    }
   state && this.setData({curSec: +curSec})

    let c = this.data.curSec
    this.initTest(c)
  },
  onShow(){
    setTimeout(() => {
      my.hideLoading();
    }, 2000);
  },

  // 题目初始化
  initTest(sec) {
    let e = this
    e.setData({
      tsLst: tsLst[sec],
      asLst: [],
      alps,
      secLst,
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
  // 跳转到下一部分
  toNextSec() {
    let n = this, c = this.data.curSec, s = this.data.secLst
    if (c !== null && c < s.length) {
      n.setData({
        curSec: c + 1,
        tsLst: tsLst[++c]
      })
      
      if(this.data.curSec > this.data.curSecOri){
        this.setData({
          curSecOri: this.data.curSec
        })
      }
    }
    if(this.data.curSec === 3){
      if(this.data.gender === '1') {
        this.data.tsLst[10].Q = "您的阴囊潮湿吗？（限男性回答）";
      }else{
        this.data.tsLst[10].Q = "您带下色黄（白带颜色发黄）吗？（限女性回答）";
      }
    }
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
          my.hideLoading();
          if(e.data.secLst.length === e.data.curSec + 1){
            e.reStart();
            e.showReport(t.data.data.conclusion, t.data.data.conclusionTxt);
          }else{
            e.initTest(c);
            e.toNextSec();
          }
        }else{
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
    }), e.initTest(0)
  },
  showReport(conclusion, conclusionTxt) {
    my.redirectTo({
      // url: `/pages/result/result&id=${this.data.resId}`
      url: '/pages/result/result?conclusion=' + conclusion + '&conclusionTxt=' + conclusionTxt
    })
  },

  showSele() {
    if(this.data.curSecOri > 0){
      this.setData({
        showSele: !this.data.showSele
      })
    }
  },

  toSel(e){
    const i = e.currentTarget.dataset.i-1;
    if(this.data.curSecOri > i){
      this.setData({
        curSec: i,
        showSele: !this.data.showSele
      })
      this.initTest(i);
      this.toNextSec();
    }
  }
})