
import request from '@/utils/request'

// 待更换|待磨针
export function maintenanceTotal(params) {
  return request({
    url: `/customer/maintenance/forecast/total`,
    method: 'get',
    params
  })
}
// 车间数
export function workshopTotal(params) {
  return request({
    url: `/customer/workshop/total`,
    method: 'get',
    params
  })
}
// 梳棉机数量
export function cardingTotal(params) {
  return request({
    url: `/customer/carding/machine/total`,
    method: 'get',
    params
  })
}
// 年产量
export function yearTotal(params) {
  return request({
    url: `/customer/yield/year/total`,
    method: 'get',
    params
  })
}
// 本月产量
export function monthTotal(params) {
  return request({
    url: `/customer/yield/month/total`,
    method: 'get',
    params
  })
}