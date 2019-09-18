Page({
  data: {
    showModal: !1
  },
  onLoad() {},
  onShow () {
    my.isCollected({
  success:(res) => {
    console.warn(res)
    if (!res.isCollected) {
      this.toggleModal()
    }
  },
  fail:(error)=>{
    
  },
});
  },
  toggleModal () {
    this.setData({
      showModal: !this.showModal
    })
  },
  reStart() {
    my.navigateBack({
      delta: 2
    })
  }
});
