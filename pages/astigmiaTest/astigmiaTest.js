Page({
  data: {
    value: '' // (1:正常,0:疑是散光)
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

    my.redirectTo({ url: '/pages/testResult/testResult?type=1&res=' + this.data.value })

    console.log('提交成功', this.data.value)
  }
})
