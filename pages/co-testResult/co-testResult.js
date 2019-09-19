Page({
  data: {
    score: 0,
    summary: '',
    num: 0
  },
  onLoad(t) {
    console.log(t)
    const {score,summary, num} = t
    this.setData({score,summary, num})
   },
  onShow() { },
  reStart() {
    my.navigateBack({
      delta: 1
    })
  }
});
