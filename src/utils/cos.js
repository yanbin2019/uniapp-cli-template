import COS from './cos-js-sdk-v5.js'
//这些配置参数都需要自己去腾讯云申请
//附上jsSDk地址：https://cloud.tencent.com/document/product/436/64960
export const Bucket = 'web3-test-1259068035'; /* 存储桶 */
export const Region = 'ap-shanghai'; /* 存储桶所在地域，必须字段 */
export const url = Bucket+''
export const cos = new COS({
  Domain: url,
  Protocol: 'https',
  SecretId: '',
  SecretKey: ''
})