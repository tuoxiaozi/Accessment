const app = getApp();
import api from './api.js'
import env from './env.js'

const request = (
    url = "",
    data = {},
    method = "get",
    headers = {
        'Content-Type': 'application/json',
    },
) => new Promise((resolve, reject) => {

    const token = my.getStorageSync({ key: "token" });

    if (token.data) {
        headers['Authorization'] = token.data
        // headers['XWS-TOKEN'] = authInfo.data['XWS-TOKEN']
    }
    // console.log(env.base_url_prod + url)
    my.request({
        url: env.base_url_prod + url,
        data,
        method,
        headers,
        success: res => {
           // console.log(res);
            if (res.data.status === 200){
              if (res.data.code === 40301) {
                // console.log('backUrl',app.backUrl)
                // my.redirectTo({ url: '/pages/auth/auth'})
                my.navigateTo({ url: '/pages/auth/auth'})
              } else{
                resolve(res);
              }
            } else {
              reject('请求失败')
              return;
            }
        },
        fail: res => {
            my.showToast({
                type: "exception",
                content: '请求失败',
                duration: 1000
            })
            reject('请求失败')
        },
        complete() {
            // my.hideLoading()
            // return reject('complete')
        }
    })
});


export default request;