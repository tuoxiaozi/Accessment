Page({
  data: {
    title: '',
    res: '',
    tip: ''
  },
  onLoad(t) {
    this.showRes(t)
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
          break
        // 散光结果
        case '1':
          this.setData({
            title: '散光',
            res: t.res === '1' ? '正常' : '疑似散光',
            tip: t.res === '1' ? '恭喜您，您没有散光症状' : '您的疑似有散光症状，建议到专业机构检查'
          }),
            console.log('当前散光结果')
          break;
        // 色盲结果
        case '2':
          this.setData({
            title: '色盲',
            res: t.res === '1' ? '正常' : '疑似色盲',
            tip: t.res === '1' ? '恭喜您，您没有色盲症状' : '您的疑似有色盲症状，建议到专业机构检查'
          }),
            console.log('当前色盲为结果')
      }
    } else {
      // my.navigateBack()
    }
  },
  reTest(e) {
    const type = e.currentTarget.dataset.type
    console.log('type', type)
    switch(type) {
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
