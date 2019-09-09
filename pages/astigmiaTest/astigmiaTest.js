Page({
  data: {
    value: ''
  },
  onLoad() { },
  radiochange(e) {
    const value = e.detail.value
    this.setData({
      value
    })
  },
  submit() {
    if ('' == this.data.value) {
      my.showToast({
        content: '选项不能为空'
      })
      return !1
    }
    console.log('提交成功', this.data.value)
  }
})
