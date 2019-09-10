import { queryUserEyeTestReport } from '../../config/api'
Page({
  data: {
    title: '',
    res: '',
    tip: '',
    bgimg: '',
    myopiaLeft: '',
    myopiaRight: '',
    astigmatismIsNormal: '',
    colorBlindIsNormal: ''
  },
  onLoad(t) {
    this.showRes(t)
  },
  onShow() {
    this._queryUserEyeTestReport()
  },
  // 查询用户眼睛健康测试报告
  async _queryUserEyeTestReport() {
    let res = await queryUserEyeTestReport()
    console.log(res)
    if (res.data.code === 0) {
      let { astigmatismIsNormal, colorBlindIsNormal, myopiaLeft, myopiaRight } = res.data.data
      this.setData({
        astigmatismIsNormal: this.transformStr(astigmatismIsNormal),
        colorBlindIsNormal: this.transformStr(colorBlindIsNormal),
        myopiaLeft,
        myopiaRight
      })
    }
    console.log(this.data.astigmatismIsNormal)
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
      return '未檢測'
    }
  },
  // 展示结果
  showRes(t) {
    console.log('携带参数=>', t.res)
    if (typeof t.type !== 'undefined' && typeof t.res !== 'undefined') {
      this.setData({ type: t.type })
      switch (t.type) {
        // 视力结果
        case '0':
          console.log('当前视力结果')
          this.setData({
            leftEye: res.leftEye,
            rightEye: res.rightEye,
            res: t.res === '1' ? '正常' : '疑似散光',
            tip: t.res === '1' ? '恭喜您，您没有散光症状' : '您的疑似有散光症状，建议到专业机构检查',
            bgimg: t.res === '1' ? 'vision-suspected' : 'vision-normal'
          })
          break
        // 散光结果
        case '1':
          this.setData({
            title: '散光',
            res: t.res === '1' ? '正常' : '疑似散光',
            tip: t.res === '1' ? '恭喜您，您没有散光症状' : '您的疑似有散光症状，建议到专业机构检查',
            bgimg: t.res === '1' ? 'ast-suspected' : 'ast-normal'
          }),
            console.log('当前散光结果')
          break;
        // 色盲结果
        case '2':
          this.setData({
            title: '色盲',
            res: t.res === '1' ? '正常' : '疑似色盲',
            tip: t.res === '1' ? '恭喜您，您没有色盲症状' : '您的疑似有色盲症状，建议到专业机构检查',
            bgimg: t.res === '1' ? 'color-normal' : 'color-suspected'
          }),
            console.log('当前色盲为结果')
      }
    } else {
      my.navigateBack()
    }
  },
  reTest(e) {
    const type = e.currentTarget.dataset.type
    console.log('type', type)
    switch (type) {
      case '0': //视力检测
        my.redirectTo({
          url: "/pages/visonTest/visonTest"
        })
        break
      case '1': // 散光检测
        my.redirectTo({
          url: "/pages/astigmiaTest/astigmiaTest"
        })
        break
      case '2': // 色盲检测
        my.redirectTo({
          url: "/pages/colorBlindTest/colorBlindTest"
        })
        break
    }
  }
});
