import { getmeCategory,querySuvInstancePage } from '../../config/api'
import env from '../../config/env'


Page({
  data: {
    banner: [
      // '/assets/banner.png',
      '/assets/banner.png'
    ],
    list: []
  },
  onLoad(query) {
    // 页面加载
    this._getCategory()
    this._querySuvInstancePage()
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
  },
  // to中醫測評
  toMedical() {
    my.navigateTo({
      url: "/pages/medical/medical"
    })
  },

  // 轮播图列表
  async _getCategory() {
    let result = await getmeCategory()
    // console.log('getCategory',result)
    let category = result.data.data
    this.setData({ category })
    if (category.length > 0) {
      let imgUrl = category.map(v => v.pictureUrl)
      this.setData({ banner: imgUrl })
    }
  },
  // 点击轮播图跳转
  goToLinkPage(e) {
    console.log(e);
    const indx = e.currentTarget.dataset.index
    this.categoryJump(indx)
  },

  categoryJump(idx) {
    const cat = this.data.category, n = this
    if (cat[idx].isJump === 'Y') {
      let url = cat[idx].linkUrl
      const webviewPath = '/pages/webview/webview'
      switch (cat[idx].type) {
        case '1':
          app.webViewUrl = url
          my.navigateTo({ url: webviewPath })
          break
        case '2':
          my.navigateTo({ url })
          break
        case '3':
          my.ap.navigateToAlipayPage({
            path: url,
          })
          break
        case '4': const paraLst = url.split(',') // 小程序与小程序间跳转
          const [appId, minpath] = paraLst
          appId && minpath && my.navigateToMiniProgram({
            path: `${minpath}`,
            appId
          })
          console.log(`${minpath}`)
          // console.log('appid', appId)
          break
      }
    }
  },

  // 首页问卷分页查询
  async _querySuvInstancePage () {
    my.showLoading({content:'加载中...'})
    let res = await querySuvInstancePage({
      pageNum: 1,
      pageSize: 3
    })
    if (!res.data.code && res.data.data) {
      my.hideLoading()
      const list = res.data.data.rows
      this.setData({list})
      console.log(this.data.list)
    } else {
      my.hideLoading()
      my.showToast({
        content: res.data.message
      })
    }
  },
  toWelcome (e) {
    const {code, type} = e.target.dataset
    type? my.navigateTo({
      url: `/pages/medical/medical`
    })
    :code && my.navigateTo({
      url: `/pages/co-testStart/co-testStart?code=${code}&type=${type}`
    })
  }
});
