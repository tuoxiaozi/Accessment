const app = getApp();
import api from './api.js'
import env from './env'

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

    my.request({
        url: env.base_url_dev + url,
        data,
        method,
        headers,
        success: res => {
           // console.log(res);
            if (res.data.status === 200){
              if (res.data.code === 40301) {
                my.redirectTo({ url: '/pages/auth/auth'})
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
        }
    })
});


export default request;