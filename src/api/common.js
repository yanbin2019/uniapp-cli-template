import request from '@/utils/request'

// 文件上传
export function fileUpload(data) {
  return request({
    url: `/customer/cos/upload`,
    method: 'post',
    data
  }) 
}
// 字典数据
export function getDictData (params) {
  return request({
    url: `/customer/dict/data/list`,
    headers: {
      isToken: false
    },
    method: 'get',
    params
  })
}
// 修改密码
export function changeuserPwd (data) {
  return request({
    url: `/customer/reset/password`,
    method: 'put',
    data
  })
}
// 获取版本信息
export function getVersion (params) {
  return request({
    url: `/system/version/latest`,
    headers: {
      isToken: false
    },
    method: 'get',
    params
  })
}