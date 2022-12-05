import COS from './cos-js-sdk-v5.js'
export const Bucket = 'web3-test-1259068035'; /* 存储桶 */
export const Region = 'ap-shanghai'; /* 存储桶所在地域，必须字段 */
export const url = Bucket+'.cos.ap-shanghai.myqcloud.com'
export const cos = new COS({
  Domain: url,
  Protocol: 'https',
  SecretId: 'AKIDpTqxrVsynMeeNq2xbz6wvd4F9m8D1Yoo',
  SecretKey: 'kCOKzNVMwFG0TfbFdka9SUFkywd2A1bu'
})