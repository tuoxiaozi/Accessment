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
    // console.log(resultLst)
    
    // const conclusion = '9,11'
    // const conclusionTxt = '中国、美国'
    var conclusions = conclusion.split(",").map(item => {
      return (item > 9? item-9:item).toString()
    })
    console.log(conclusions);
    this.setData({
      conclusions: conclusions,
      conclusionTxts: conclusionTxt.split("、"),
      resultLst
    })
    // console.log('conclusions----------->',this.data.conclusions,'conclusionTxts--------->',this.data.conclusionTxts,'resultLst----->',this.data.resultLst)
  },

  onShow() {
    this._queryMyAcctUserInfoAndPoint()
  },

  // 获取个人信息
  async _queryMyAcctUserInfoAndPoint() {
    let result = await queryMyAcctUserInfoAndPoint()
    // console.log('我的',result)
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
      url: `/pages/medical/medical`
    })
  },
  // tap分享
share() {
  my.showSharePanel()
}
});