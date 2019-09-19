import fetchData from './fetch'


const api = {
  /* 中医测评相关接口 */
  getTokenByCode,
  queryUserTcdPositionFlag,
  queryUserSuvTcdAnswerDetail,
  getAlipayTradeCreate,
  savePayCallBack,
  saveData,
  queryMyReportListPage,
  queryMyAcctUserInfoAndPoint,
  queryPageByParam,
  queryUserEyeTestReport,
  addEyeTestRecord,
  getmeCategory,
  querySuvInstancePage,
  querySuvInstanceByCode,  
  querySuvGroupQuestionAnswers
};

//获取token
function getTokenByCode(params) {
  return fetchData('/auth/jwt/guest/getTokenByCode', params, 'post');
}
/* ----------健康测评---------- */
// 首页 获取轮播列表
function getmeCategory(params) {
  return fetchData('/sharecom/notGrant/guest/queryValidAdvertisingByCategory?category=4', params);
}
// 新增视力测试记录
function addEyeTestRecord(params) {
  return fetchData('/quesans/eyeTestRecord/addEyeTestRecord', params, 'post');
}

// 眼睛健康测试记录分页查询
function queryPageByParam(params) {
  return fetchData('/quesans/eyeTestRecord/queryPageByParam', params);
}

// 眼睛健康测试报告
function queryUserEyeTestReport(params) {
  return fetchData('/quesans/eyeTestReport/queryUserEyeTestReport', params);
}

// 分页查询已发布测评问卷列表
function querySuvInstancePage(params) {
  return fetchData('/quesans/suvInstance/querySuvInstancePage', params)
}

// 查询测评问卷配置信息
function querySuvInstanceByCode(params) {
  return fetchData('/quesans/suvInstance/querySuvInstanceByCode', params)
}

// 健康测评问卷题目及答案选项
function querySuvGroupQuestionAnswers(params) {
  return fetchData('/quesans/suvQuestion/querySuvGroupQuestionAnswers', params)
}
/* ----------中医测评---------- */

//测评结果页面 获取个人信息
function queryMyAcctUserInfoAndPoint(params) {
  return fetchData('/acct/accUser/acctUserInfo/queryMyAcctUserInfoAndPoint', params);
}

// 判断状态接口
function queryUserTcdPositionFlag(params) {
  return fetchData('/quesans/suvTcd/queryUserTcdPositionFlag', params, 'get')
}

// 查询用户中医体质测评答题记录及结果
function queryUserSuvTcdAnswerDetail(params) {
  return fetchData('/quesans/suvTcd/queryUserSuvTcdAnswerDetail', params,'get')
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