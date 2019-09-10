import { getTokenByCode} from '/config/api'
App({
  userInfo: null,
  auth_info: {
                user_info:null,
                auth_code: null,
                auth_time: null
              },
  token: '',
  getUserInfo() {
    return new Promise((resolve, reject) => {
      //if (this.userInfo) resolve(this.auth_info);

      my.getAuthCode({
        scopes: ['auth_base'],
        success: authcode => {
          resolve(authcode.authCode)

          // my.getAuthUserInfo({
          //   success: res => {
          //     this.auth_info = {
          //       user_info: res,
          //       auth_code: authcode,
          //       auth_time: new Date().getTime()
          //     };
          //     resolve(this.auth_info);
          //   },
          //   fail: () => {
          //     reject('授权失败');
          //   },
          // });
        },
        fail: () => {
          my.switchTab({url: '/pages/index/index'})
          reject('拒绝授权');
        },
      });
    });
  },
  //判断认证是否过期
  authIsOrNot(nowTime) {
    let oldT = this.auth_info.auth_time;
    if(nowTime-oldT> 14400000){
      return false
    }else{
      return true
    }
  },
});
