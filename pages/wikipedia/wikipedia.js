import env from '../../config/env'
const imgbase = env.pic_url

Page({
  data: {
    imgbase,
    current: 0,
    currentIndex: 0,
    swiperError: 0,
    wikiLst: [{
      pic: 'wiki_01',
      title: '适当看望远方',
      content: '长时间的看电子屏幕，距离比较近，很多都是小于半米的，比较伤害眼睛，长时间这样就会出现疲劳的情况，这个时候需要站起来看远方，同时舒展一下身体，找一个远处的参照物看10分钟左右，可以有效的缓解视疲劳。'
    }, {
      pic: 'wiki_02',
      title: '眼部按摩',
      content: '中指和食指轻轻按压颧骨，然后轻轻按摩眼睛周围，顺时针和逆时针各四圈，然后中指和食指轻轻按压太阳穴，同时深呼吸，经常的做眼保健操可以缓解眼干眼涩的情况，也可以放松眼部肌肉，促进眼部的血液循环，从而达到这样的效果。'
    }, {
      pic: 'wiki_03',
      title: '屏幕背景',
      content: '看手机、电脑的时候最好是把模式改为护眼模式，屏幕和网页背景改为浅绿色，要被比白色的柔和，刚开始的时候可能不太适应，慢慢的你会发现这个颜色看着眼睛要舒服一些。'
    }, {
      pic: 'wiki_04',
      title: '休息',
      content: '闭眼几秒钟你有眼睛酸酸、涩涩的感觉吗？眼睛比较酸是因为长时间的看近，眼睛比较累了，眼睛比较涩的话是因为眼睛比较干，当我们很专注的看屏幕的话，很少眨眼的，当我们开始注意的时候，泪液已经蒸发了，这样就会出现酸涩的情况了，闭眼的时候可以促进泪液的分泌，这个时候眼睛不要调节来看东西了，睫状肌也会放松一些。'
    }, {
      pic: 'wiki_05',
      title: '营养',
      content: '在日常饮食的过程中可以注意补充维生素A和维C摄取富含维生素A、C、E等抗氧化剂的食物，比如菠菜、玉米、蛋黄、西红柿、胡萝卜等有助于皮脂腺的正常分泌。'
    }, {
      pic: 'wiki_06',
      title: '用眼卫生',
      content: '一定要注意用眼卫生，要经常的洗手，不要揉眼睛，揉眼睛是病毒传播的主要途径，所以一定要注意卫生。建议学生每隔3-6个月去专业的眼镜店进行视力检查并且保养眼镜。如果出现近视，及时的配一副适合自己的眼镜。'
    }]
  },
  onLoad() { },

  // 轮播转换
  swiperChange(t) {
    if ("touch" == t.detail.source) {
      if (0 == t.detail.current) {
        var a = this.data.swiperError;
        a += 1, this.setData({
          swiperError: a
        }), a >= 3 ? (console.error(this.data.swiperError), this.setData({
          current: this.data.preIndex
        }), this.setData({
          swiperError: 0
        })) : this.setData({
          currentIndex: t.detail.current
        });
      } else {
        this.setData({
          currentIndex: t.detail.current
        }), this.setData({
          swiperError: 0
        })
      }
    } else this.setData({
      currentIndex: t.detail.current
    });
  },
});
