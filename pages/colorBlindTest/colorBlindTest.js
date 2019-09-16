import { addEyeTestRecord } from '../../config/api'
import env from '../../config/env'
const imgbase = env.pic_url
const n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Page({
  data: {
    seCurrentNumber: 5,
    imgNum: 0,
    imgUrl: '',
    column: n,
    seNumber: ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "", ""],
    rightNum: 0,
    wrongNum: 0,
    value: 0, // 判定结果
    tempdata: [{ // 色盲数据
      url: "daltonismo1",
      num: 1
    }, {  // 色盲数据
      url: "daltonismo2",
      num: 2
    }, {
      url: "daltonismo3",
      num: 3
    }, {
      url: "daltonismo4",
      num: 4
    }, {
      url: "daltonismo5",
      num: 5
    }, {
      url: "daltonismo6",
      num: 6
    }, {
      url: "daltonismo7",
      num: 7
    }, {
      url: "daltonismo8",
      num: 8
    }, {
      url: "daltonismo9",
      num: 9
    }],
    //* tempdata: [],
    count: 0,
    imgbase
  },
  onLoad() {
  },
  onShow() {
    //const testdata = this.data.testdata
    this.setData({
      rightNum: 0,
      wrongNum: 0,
      count: 0,
      tempdata: [{ // 色盲数据
        url: "daltonismo1",
        num: 1
      }, {  // 色盲数据
        url: "daltonismo2",
        num: 2
      }, {
        url: "daltonismo3",
        num: 3
      }, {
        url: "daltonismo4",
        num: 4
      }, {
        url: "daltonismo5",
        num: 5
      }, {
        url: "daltonismo6",
        num: 6
      }, {
        url: "daltonismo7",
        num: 7
      }, {
        url: "daltonismo8",
        num: 8
      }, {
        url: "daltonismo9",
        num: 9
      }]
    }),
      this.initTest()
    console.log(this.data.tempdata)
  },
  // 色盲测试初始化
  initTest() {
    let t = Math.floor(this.data.tempdata.length * Math.random())
    const tempdata = this.data.tempdata
    this.setData({
      imgUrl: tempdata[t].url,
      imgNum: tempdata[t].num,
    })
    this.data.tempdata.splice(t, 1)
    this.setData({
      tempdata: this.data.tempdata
    })
    console.log('当前数组', this.data.tempdata)
  },

  // 绑定picker
  bindChangepicker(e) {
    const t = e.detail.value ? e.detail.value : 5;
    console.log(t), this.setData({
      seCurrentNumber: this.data.column[t[0]] // 当前只为一位数,后续可加
    }), console.log("此刻" + this.data.seCurrentNumber);
  },

  // 点击确定
  confirm() {
    if (this.data.seCurrentNumber == this.data.imgNum) { // 回答正确计数，跳下一题
      this.setData({
        rightNum: this.data.rightNum + 1,
        count: this.data.count + 1
      })
      console.log('正确次数', this.data.rightNum)
      if (this.data.rightNum < 3) { // 正确次数小于3
        this.initTest()
      } else { // 正确次数超过3， 判定正常
        this.judgment()
      }
    } else { // 回答错误
      this.setData({
        wrongNum: this.data.wrongNum + 1,
        count: this.data.count + 1
      })
      console.log('错误次数', this.data.wrongNum)
    }
    this.judgment()
  },

  // 点击取消
  cancel() {
    console.log('当前count', this.data.count)
    this.setData({
      wrongNum: this.data.wrongNum + 1,
      count: this.data.count + 1
    })
    this.judgment()
      console.log('错误次数', this.data.wrongNum)

  },

  // 判定结果
  judgment() {
    if (this.data.count >= 3) {
      if (this.data.wrongNum >= 1) {
        this.setData({
          value: '0' // 疑似色盲
        })
        this._addEyeTestRecord()
        console.log('检测结果： 疑似色盲')
      } else if (this.data.rightNum >= 3) {
        this.setData({
          value: '1' // 正常
        })
        this._addEyeTestRecord()
        console.log('检测结果： 正常')
      }
    } else {
      this.initTest()
    }
  },

  async _addEyeTestRecord() {
    let value = this.data.value
    console.log(value)
    let res = await addEyeTestRecord({
      colorBlindIsNormal: value,
      type: 3 // 色盲类型
    })
    if (res.data.code === 0) {
      this.navtoRes()
    } else {
      console.log(res)
    }
  },
  // 跳转结果页
  navtoRes() {
    my.redirectTo({ url: '/pages/testResult/testResult?type=2&res=' + this.data.value })
  }
});
