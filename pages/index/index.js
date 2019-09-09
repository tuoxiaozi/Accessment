Page({
  data: {
    banner: [
      // '/assets/banner.png',
      '/assets/banner.png'
    ]
  },
  onLoad(query) {
    // 页面加载
  },

  onReachBottom() {
    // 页面被拉到底部
  },

  // 视力检测
  toVisonTest() {
    my.navigateTo({
      url: '/pages/visionStart/visionStart'
    })
  },

  // 散光检测
  toAstigmiaTest() {
    my.navigateTo({
      url: '/pages/astigmiaTest/astigmiaTest'
    })
  },

  // 色盲检测
  toAchromatopsia() {
    my.navigateTo({
      url: '/pages/colorBlindTest/colorBlindTest'
    })
  },

  // 护眼百科
  toWikipedia() {
    my.navigateTo({
      url: '/pages/wikipedia/wikipedia'
    })
  },

  // 睡眠神器
  toSleep() {
    // my.navigateTo({
    //   url: ''
    // })
    my.showToast({
      content: '该功能正在开发中，敬请期待...'
    })
  },

  // 更多
  toHealth() {
    my.switchTab({
      url: '/pages/health/health'
    })
  }
});
