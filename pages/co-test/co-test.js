import { tsLst, secLst, alps } from '/mock/data.js'
import { saveQuestionAndAnswers, querySuvGroupQuestionAnswers } from '/config/api.js'
import env from '../../config/env'

Page({
  data: {
    tsLst: [], // 题目信息
    reStart: !1, // 重新开始标志位
    testCount: 0, // 当前题目索引,
    asLst: [], // 提交答案信息
    instanceCode: '', // 问卷代码
    groupCode: void 0
  },
  onLoad(t) {
    this.setData({
      instanceCode: t.code || 'healthQuotient5'  // 设置默认参数，便于调试
    })

    this._querySuvGroupQuestionAnswers()
    this.initTest()
  },
  onShow() {
    setTimeout(() => {
      my.hideLoading();
    }, 2000);
  },

  // 查詢題目信息
  async _querySuvGroupQuestionAnswers() {
    my.showLoading({ content: '加载中...' })
    let res = await querySuvGroupQuestionAnswers({
      instanceCode: this.data.instanceCode
    })
    if (!res.data.code && res.data.data) {
      my.hideLoading()
      console.log('題目信息', res.data)
      // 暂时没有考虑到分组的情况，后续如需分组， 需要遍历该数组
      const [list, ...arr] = res.data.data.suvGroupList
      const groupCode = list.groupCode
      const tsLst = list.suvQuestionAndAnswerList
      this.setData({ tsLst, groupCode })
      console.log(this.data.tsLst)
    }
  },

  // 题目初始化
  initTest() {
    this.setData({
      tsLst,
      testCount: 0
    })
  },
  // 点击答案
  changeSimTest(t) {
    const e = t.currentTarget.dataset, n = this, asLst = this.data.asLst
    const { i, j, answerId, questionId } = e
    console.log('类型', typeof answerId)
    console.log(e)
    asLst[i] = {
      "answerRecordList": [
        {
          "answerId": answerId
        }
      ],

      "questionId": questionId
    },
      n.setData({ asLst })
    n.nextQs(e.i, e)
    if (this.data.tsLst.length === e.i + 1 || this.data.asLst.length === this.data.tsLst.length) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  // 跳转到下一题
  nextQs(s, i) {
    let n = this, o = this.data.tsLst, d = i.i
    console.log(s, i.i)
    if (null != i.i && null != i.j) {
      for (let u = 0; u < o[i.i].answerList.length; u++) o[i.i].answerList[u].isAct = !1
      o[i.i].answerList[i.j].isAct = !0
    }
    i.i + 1 >= o.length && (d = i.i - 1),
      n.setData({
        testCount: d + 1,
        tsLst: o
      })
  },

  // 跳转到上一题
  preQs() {
    this.setData({ testCount: this.data.testCount - 1 })
  },
  // 提交数据
  submitTest() {
    let e = this
    if (tsLst.length > e.data.asLst.length) {
      my.showToast({
        type: 'fail',
        content: '选择不全',
        duration: 3e3
      })
      return;
    }
    my.showLoading({
      content: "正在保存...",
    })
    saveQuestionAndAnswers({
      instanceCode: this.data.instanceCode,
      saveGroupCode: this.data.groupCode,
      replyRecordList: this.data.asLst // 答案
    }).then(t => {
      console.log(t)
      if (t.data.code === 0) {
        const { score, shortSummary, questionNumber } = t.data.data
        my.hideLoading()
        my.redirectTo({
          url: `/pages/co-testResult/co-testResult?score=${score}&summary=${shortSummary}&num=${questionNumber}`
        })
      } else {
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
  }
})