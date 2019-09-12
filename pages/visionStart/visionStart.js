import env from '../../config/env'
const imgbase = env.pic_url

Page({
  data: {
    imgUrl: imgbase + 'guide.png'
  },
  onLoad() { },
  toVisionTest() {
    my.navigateTo({
      url: '/pages/visonTest/visonTest'
    })
  },

});
