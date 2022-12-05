import request from '@/utils/request'

// 修改昵称
export function nameUpdate(data) {
  return request({
    url: `/customer`,
    method: 'put',
    data
  })
}
// 用户信息
export function getUserInfo(params) {
  return request({
    url: `/customer`,
    method: 'get',
    params
  })
}
// 【我的】-反馈建议
export function propose(data) {
  return request({
    url: `/customer/propose`,
    method: 'post',
    data
  })
}
// 通知列表
export function noticeList(params) {
  return request({
    url: `/customer/user/notice/list`,
    method: 'get',
    params
  })
}
// 通知数量
export function noticeUnread(params) {
  return request({
    url: `/customer/user/notice/unread`,
    method: 'get',
    params
  })
}
// 查看通知
export function noticeFind(userNoticeId,params) {
  return request({
    url: `/customer/user/notice/${userNoticeId}`,
    method: 'get',
    params
  })
}
// 删除通知
export function noticeDelete(userNoticeId,params) {
  return request({
    url: `/customer/user/notice/${userNoticeId}`,
    method: 'delete',
    params
  })
}