import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/customer/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data
  })
}
// 用户注册
export function register(data) {
  return request({
    url: '/customer/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data
  })
}
// 重置密码
export function resetPassword(data) {
  return request({
    url: '/customer/reset/password',
    headers: {
      isToken: false
    },
    method: 'put',
    data
  })
}
// 忘记密码
export function forgetPassword(data) {
  return request({
    url: '/customer/forget/password',
    headers: {
      isToken: false
    },
    method: 'put',
    data
  })
}


// 退出方法
export function logout() {
  return request({
    'url': '/logout',
    'method': 'post'
  })
}

// 获取验证码
export function getCode(phone) {
  return request({
    'url': `/customer/sms/send/code/${phone}`,
    headers: {
      isToken: false
    },
    method: 'post',
    timeout: 20000
  })
}
