Page({
  data: {
    rightEye: "",  //右眼视力
    leftEye: "",    // 左眼视力
    value: null,
    testdata: [{  // 视力数据
      sight: "1.0",
      size: "20"
    }, {
      sight: "0.8",
      size: "40"
    }, {
      sight: "0.6",
      size: "80"
    }, {
      sight: "0.5",
      size: "100"
    }, {
      sight: "0.4",
      size: "120"
    }, {
      sight: "0.3",
      size: "160"
    }, {
      sight: "0.2",
      size: "180"
    }, {
      sight: "0.1",
      size: "200"
    }],
    testindex: 0, // 初始视力索引
    testStr: "测右眼，闭左眼",
    curDirection: "right", // 当前方向
    isRight: !0, // 是否右眼
    testDirection: [{ // 图片方向数据
      direction: "right",
      degree: "0"
    }, {
      direction: "down",
      degree: "90"
    }, {
      direction: "left",
      degree: "180"
    }, {
      direction: "up",
      degree: "-90"
    }],
    imgWidth: "0", // 图片宽度
    imgDegree: "",  // 图片角度
    rightNums: 0, // 正确数目
    wrongNums: 0, // 错误数目
    eitherEye: "right", // 左右眼
    showRes: "", // '1'：正确， '2'：错误
    tipStr: ""
  },
  onLoad() {
    this.initTest()
  },

  // 测视力初始化
  initTest() {
    let t = Math.floor(4 * Math.random());
    this.setData({
      imgDegree: this.data.testDirection[t].degree,
      imgWidth: "20", // 初始视力1.0
      curDirection: this.data.testDirection[t].direction
    });
  },

  // 方向判别
  direction(e) {
    e.currentTarget.dataset.dir == this.data.curDirection ? (this.setData({
      showRes: "1", // 回答正确
      rightNums: this.data.rightNums + 1
    }), setTimeout(() => {
      console.log('对', this.data.showRes, this.data.curDirection)
      if (this.data.rightNums >= 2) { // 正确超过两个
        if ("right" == this.data.eitherEye) { // 当前为右眼， 测左眼
          this.setData({
            rightEye: this.data.testdata[this.data.testindex].sight,
            eitherEye: "left"
          })
          console.log('=====>右眼视力', this.data.rightEye)
          this.setData({ // 开始测左眼
            isRight: !1,
            testindex: this.data.testdata.findIndex(e => e.sight == this.data.rightEye) // 左眼使用上一次的数据
            // testindex: 0
          })
          console.log('===========>testindex', this.data.testindex)
          let n = Math.floor(4 * Math.random())
          this.setData({ // 抽到随机
            imgWidth: this.data.testdata[this.data.testindex].size,
            imgDegree: this.data.testDirection[n].degree,
            curDirection: this.data.testDirection[n].direction,
            rightNums: 0,
            showRes: ""
          })
        } else { // 当前为左眼
          this.setData({
            leftEye: this.data.testdata[this.data.testindex].sight
          })
          console.log('=====>左眼视力', this.data.leftEye)
          this.navtoRes()
        }
      } else {  // 正确低于两个，继续切换
        let n = Math.floor(4 * Math.random());
        this.setData({
          imgDegree: this.data.testDirection[n].degree,
          curDirection: this.data.testDirection[n].direction,
          showRes: "",
        })
      }
    }, 2e2)) : (this.setData({
      showRes: "2",// 回答错误
      wrongNums: this.data.wrongNums + 1
    }), setTimeout(() => {
      console.log('错', this.data.showRes, this.data.curDirection)
      if (this.data.wrongNums >= 2) { // 错误超过两个
        if (this.data.testindex >= 7) { // 错误超过七个
          if ("right" == this.data.eitherEye) { // 当前为右眼
            this.setData({ // 开始测左眼
              rightEye: this.data.testdata[this.data.testindex].sight,
              eitherEye: 'left',
              isRight: !0,
              testindex: 0
            })
            console.log('=====>右眼视力', this.data.rightEye)
            debugger
            let a = Math.floor(4 * Math.random());
            this.data.curDirection = this.data.testDirection[a].direction, this.setData({
              imgWidth: this.data.testdata[this.data.testindex].size,
              imgDegree: this.data.testDirection[a].degree,
              showRes: ""
            }), this.data.wrongNums = 0;
          } else { // 当前为右眼
            this.data.leftEye = this.data.testdata[this.data.testindex].sight
            this.navtoRes()
          }
        } else { // 错误超过两个， 但少于7个
          let a = Math.floor(4 * Math.random())
          this.setData({
            testindex: this.data.testindex + 1
          })
          console.log('索引', this.data.testindex)
          this.setData({
            imgWidth: this.data.testdata[this.data.testindex].size,
            imgDegree: this.data.testDirection[a].degree,
            curDirection: this.data.testDirection[a].direction,
            wrongNums: 0,
            showRes: "",
          })
        }
      } else {
        let a = Math.floor(4 * Math.random());
        this.setData({
          imgDegree: this.data.testDirection[a].degree,
          showRes: "",
          curDirection: this.data.testDirection[a].direction
        })
      }
    }, 2e2))
  },
  navtoRes() {
    this.setData({
      value: { leftEye: this.data.leftEye, rightEye: this.data.rightEye }
    }),
      my.navigateTo({ url: '/pages/testResult/testResult?type=0&res=' + this.data.value })
  }
})