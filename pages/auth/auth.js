const app = getApp();
import {getTokenByCode} from '../../config/api'

Page({
  data: {
  },

  onLoad() {
    
  },
  onShow() {
    app.getUserInfo().then(
      auth => {
          //console.log(auth)
          // let auth_code = auth.auth_code.authCode;
          let auth_code = auth;
          console.log(auth_code)
          getTokenByCode({
            appClient: '',
            code: auth_code,
            identityType: 1,
            mac: '',
            registePlat: 2,
            alipaySmallProgramIdentity: 3
          }).then(result => {
            if(result.data.code === 0){
              my.setStorage({
                key: 'token',
                data: result.data.data
              });
               my.navigateBack();
            }else{
              my.showToast({
                content: '授权失败',
                success: () => {
                  my.switchTab({url: '/pages/index/index'})
                },
              });
              my.switchTab({url: '/pages/index/index'})
            }
            
          })
      }
    );
  },
  onReady() {
    
  },
 
});
