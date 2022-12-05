export const rules = {
  customerName: {
    type: 'string',
    required: true,
    message: '请填写公司名称',
    trigger: ['blur']
  },
  realName: {
    type: 'string',
    required: true,
    message: '请填写姓名',
    trigger: ['blur']
  },
  position: {
    type: 'string',
    required: true,
    message: '请选择职位',
    trigger: ['change']
  },
  username : {
    type: 'string',
    required: true,
    message: '请填写手机号',
    trigger: ['blur']
  },
  password: {
    type: 'string',
    required: true,
    message: '请填写密码',
    trigger: ['blur']
  },
  code: {
    type: 'string',
    required: true,
    message: '请填写验证码',
    trigger: ['blur']
  },
}