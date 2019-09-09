import fetchData from './fetch'


const api = {
/* 中医测评相关接口 */
  getTokenByCode,
  queryUserTcdPositionFlag,
  getAlipayTradeCreate,
  savePayCallBack,
  saveData,
  queryMyReportListPage

};

//获取token
function getTokenByCode(params) {
  return fetchData('/auth/jwt/guest/getTokenByCode', params, 'post');
}
/* ----------健康测评---------- */


/* ----------中医测评---------- */

//测评结果页面 获取个人信息
function queryMyAcctUserInfoAndPoint(params) {
  return fetchData('/acct/accUser/acctUserInfo/queryMyAcctUserInfoAndPoint', params);
}

// 判断状态接口
function queryUserTcdPositionFlag(params) {
  return fetchData('/quesans/suvTcd/queryUserTcdPositionFlag', params, 'get')
} 

// 下单接口
function getAlipayTradeCreate(params) {
  return fetchData('/quesans/suvOrder/alipayTradeCreate', params, 'post')
} 

// 下单通知接口
function savePayCallBack(params) {
  return fetchData('/quesans/suvOrder/payCallBack', params, 'post')
}

// 保存问题接口
function saveData(params) {
  return fetchData('/quesans/suvTcd/saveData', params, 'post')
}

// 分页查询我的测评记录列表
function queryMyReportListPage(params) {
  return fetchData('/quesans/suvTcd/queryMyReportListPage', params)
}
export default api