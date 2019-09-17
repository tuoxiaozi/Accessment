const app = getApp()
import { getTokenByCode, getAlipayTradeCreate, queryUserTcdPositionFlagUsingGET, queryUserTcdPositionFlag, savePayCallBack, queryUserSuvTcdAnswerDetail } from '/config/api'
Page({
  data: {
    isPaying: false, //支付状态
    isPay: 0, // 是否支付
    state: 0, // 是否测评
    gender: void 0, // 性别 1 男 2 女
    showSele: !1,
    reportId: null, // 用户答题id
    curSec: 0 // 测评完成进度
  },
  onLoad() { },
  onShow() {
    // app.getUserInfo();
    // let t = new Date().getTime();
    // let flagT = app.authIsOrNot(t);
    // if (flagT) {
    //   return !1
    // } else {
    // this.auth()
    // }
    let that = this
    this.setData({
      isPaying: false, //支付状态
      isPay: 0, // 是否支付
      state: 0, // 是否测评
      gender: void 0, // 性别 1 男 2 女
      showSele: !1,
      reportId: null, // 用户答题id
    })
    queryUserTcdPositionFlag({
      instanceCode: 'zytcpg'
    }).then(result => {
      if (result.data.code === 0) {
        console.log(result.data)
        // 开发调试隐藏
        this.setData({
          isPay: result.data.data.isNeedPay,
          state: result.data.data.userEvaluationState,
          originalPrice: result.data.data.originalPrice,
          price: result.data.data.price,
          gender: result.data.data.gender,
          reportId: result.data.data.reportId,
        }),
          queryUserSuvTcdAnswerDetail({
            reportId: this.data.reportId
          }).then(result => {
            let data = result.data.data
              this.setData({
                curSec: data.positionFlag,
                state: data.positionFlag
              })
          })
      }
    })
  },
  startTest() {
    console.log(this.data.gender)
    if (void 0 === this.data.gender) {
      this.setData({
        showSele: !0
      })
    } else {
      my.navigateTo({
        url: "/pages/test/test?curSec=" + this.data.curSec +"&state="+this.data.state
      });
    }
  },
  // 认证方法
  auth() {
    app.getUserInfo().then(
      auth => {
        let auth_code = auth.auth_code.authCode;
        getTokenByCode({
          appClient: '',
          code: auth_code,
          identityType: 1,
          mac: '',
          registePlat: 2,
          alipaySmallProgramIdentity: 3
        }).then(result => {
          if (result.data.code === 0) {
            console.log(result.data.data);
            my.setStorageSync({
              key: 'token',
              data: result.data.data
            });

            queryUserTcdPositionFlag({
              instanceCode: 'zytcpg'
            }).then(result => {
              if (result.data.code === 0) {
                // 开发调试隐藏
                this.setData({
                  isPay: result.data.data.isNeedPay,
                  state: result.data.data.userEvaluationState,
                });
              }
            })

          } else {
            my.showToast({
              content: '授权失败，请重试！'
            });
          }
        })
      })
  },

  async onClickHandler() {
    this.setData({
      isPaying: true
    });

    try {

      const trade = await this.getTradeNo();
      const tradeNo = trade.tradeNo;

      const payStatus = await this.cashPaymentTrade(tradeNo);
      // const  payStatus = 'callbackUrl: "", extendInfo: {…}, memo: "", result: "app_name="alipay"&trade_no="2019082222001447000501…appid=alipay^version=10.1.70.8308"&success="true"", resultCode: "9000"}';
      console.log('111');
      this.updatePaymentListByTradeNo(tradeNo, payStatus);
      console.log(payStatus);

      if (payStatus.status) {
        this.setData({
          isPaying: false,
          isPay: 0,
          state: 0
        });

        my.showToast({
          content: '支付成功！'
        });
        console.log('支付成功')
      } else {
        this.setData({
          isPaying: false,
          isPay: 1,
          state: 0
        });

        my.showToast({
          content: '支付失败！'
        });
        console.log('支付失败')
      }

    } catch (error) {
      this.setData({
        isPaying: false,
        isPay: 1,
        state: 0
      });
      my.showToast({
        content: '支付失败，请重试！'
      });
    }
  },

  getTradeNo() {
    return new Promise((resolve, reject) => {
      getAlipayTradeCreate({
        instanceCode: 'zytcpg'
      }).then(result => {
        console.log(result)
        console.log(result.data.data.tradeNo)
        if (result.data.code === 0) {
          // this.tradeNo = result.data.data.tradeNo
          resolve({
            status: true,
            tradeNo: result.data.data.tradeNo,
            message: '获取支付订单号成功'
          });
        } else {
          reject({
            ...err,
            message: '获取支付订单号异常'
          });
        }
      })
    });
  },

  cashPaymentTrade(tradeNo) {
    return new Promise((resolve, reject) => {
      my.tradePay({
        tradeNO: tradeNo,
        success: (result) => {
          console.log(result)
          if (result.resultCode != 9000) {
            console.log('失败。。。');
            resolve({
              status: false,
              message: result.memo,
              ...result
            });
          } else {
            console.log('支付成功')
            resolve({
              status: true,
              message: '支付成功',
              ...result
            });
          }
        },
        fail: (err) => {
          console.log('error');
          reject({
            status: false,
            message: '支付异常',
            ...err
          });
        }
      });
    });
  },

  updatePaymentListByTradeNo(tradeNo, payStatus) {
    savePayCallBack({
      tradeNo: tradeNo,
      payResultStatus: payStatus.resultCode === '9000' ? '1' : '0',
      massge: payStatus.massge,
      alipayTradeResult: payStatus.result
    }).then(result => {
      if (result.data.code === 0 || result.data.code === 710004) {
        // if (result.data.code === 0 || result.data.code === 710007) {
        console.log('更新支付成功')
      } else {
        console.log('更新支付失败')
      }
    })
  },

  selectSex(e) {
    my.navigateTo({
      url: "/pages/test/test?gender=" + e.detail.value.gender
    });
    this.setData({
      showSele: !1
    })
  },

  cancel() {
    this.setData({
      showSele: !1
    })
  }

});
