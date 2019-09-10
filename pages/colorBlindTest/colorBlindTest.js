import { addEyeTestRecord } from '../../config/api'
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
    testdata: [{ // 色盲数据
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
  },
  onLoad() {
    this.initTest()
    this.setData({
      rightNum: 0,
      wrongNum: 0
    })
  },
  onShow() {
    console.log('=========>app onShow<===============')
  },
  // 测视力初始化
  initTest() {
    let t = Math.floor(this.data.testdata.length * Math.random())
    const testdata = this.data.testdata
    this.setData({
      imgUrl: testdata[t].url,
      imgNum: testdata[t].num
    })
    console.log('当前数值', this.data.imgNum)
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
        rightNum: this.data.rightNum + 1
      })
      console.log('正确次数', this.data.rightNum)
      if (this.data.rightNum < 3) { // 正确次数小于3
        this.initTest()
      } else { // 正确次数超过3， 判定正常
        this.judgment()
      }
    } else { // 回答错误
      this.setData({
        wrongNum: this.data.wrongNum + 1
      })
    }
    this.judgment()
  },

  // 点击取消
  cancel() {
    this.setData({
      wrongNum: this.data.wrongNum + 1,
    })
    this.judgment()
  },

  // 判定结果
  judgment() {
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
