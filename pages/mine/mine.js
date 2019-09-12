import { queryMyAcctUserInfoAndPoint, queryUserEyeTestReport } from '../../config/api'
import env from '../../config/env'

Page({
  data: {
    myopiaLeft: '',
    myopiaRight: '',
    astigmatismIsNormal: '',
    colorBlindIsNormal: '',
    userSuveryRecordNumber: 0,
    userEyeTestRecordNumber: 0

  },
  onLoad() { },

  onShow() {
    this._queryMyAcctUserInfoAndPoint()
    this._queryUserEyeTestReport()
  },

  // 获取个人信息
  async _queryMyAcctUserInfoAndPoint() {
    let res = await queryMyAcctUserInfoAndPoint()
    console.log('我的', res)
    if (res.data.code === 0) {
      this.setData({
        userMsg: res.data.data
      })
      console.log('用户信息', this.data.userMsg)
    } else {
      console.log(res)
    }
  },

  // 查询用户眼睛健康测试报告
  async _queryUserEyeTestReport() {
    let res = await queryUserEyeTestReport()
    console.log(res)
    if (res.data.code === 0) {
      let { astigmatismIsNormal, colorBlindIsNormal, myopiaLeft, myopiaRight, userSuveryRecordNumber, userEyeTestRecordNumber } = res.data.data
      this.setData({
        astigmatismIsNormal: this.transformStr(astigmatismIsNormal),
        colorBlindIsNormal: this.transformStr(colorBlindIsNormal),
        myopiaLeft,
        myopiaRight,
        userSuveryRecordNumber,
        userEyeTestRecordNumber
      })
    }
  },
  // 测评记录
  accessRecord() {
    my.navigateTo({
      url: "/pages/mytest/mytest"
    })
  },

  // 视力记录
  visonRecord() {
    my.navigateTo({
      url: "/pages/visonRecord/visonRecord"
    })
  },

  // 处理字符串
  transformStr(val) {
    if (val !== 'undefined') {
      if (val === 1) {
        return '正常'
      } else if (val === 0) {
        return '疑似'
      }
    } else {
      return '--'
    }
  }
});
