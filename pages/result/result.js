import { resultLst } from '/mock/data.js'
import {queryMyAcctUserInfoAndPoint} from '../../config/api'
import env from '../../config/env'


Page({
  data: {
    conclusions: [],
    conclusionTxts: [],
    resultLst: []
  },
  onLoad(options) {
    const conclusion = options.conclusion
    const conclusionTxt = options.conclusionTxt
    
    // const conclusion = '1,2,10'
    // const conclusionTxt = '中国、美国、日本'
    var conclusions = conclusion.split(",").map(function (item) {
      return item > 9? item-9:item;
    });
    console.log(conclusions);
    this.setData({
      conclusions: conclusions,
      conclusionTxts: conclusionTxt.split("、"),
      resultLst: resultLst
    })
  },

  onShow() {
    this._queryMyAcctUserInfoAndPoint()
  },

  // 获取个人信息
  async _queryMyAcctUserInfoAndPoint() {
    let result = await queryMyAcctUserInfoAndPoint()
    console.log('我的',result)
    if(result.data.code === 0){
      this.setData({
        userMsg:result.data.data
      })
      console.log('用户信息',this.data.userMsg)
    }else{
      console.log(result)
    }
  },

  reTest() {
    my.redirectTo({
      // url: `/pages/result/result&id=${this.data.resId}`
      url: `/pages/index/index`
    })
  },
  // tap分享
share() {
  my.showSharePanel()
}
});