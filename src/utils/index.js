import { setJsonLabel, toast,formatQuery, toBack, changeNum } from '@/utils/common';
import { getList, handle } from './http';
export default {
  install (Vue) {
    Vue.prototype.$getList = getList
    Vue.prototype.$handle = handle
    Vue.prototype.$msg = toast
    Vue.prototype.setJsonLabel = setJsonLabel
    Vue.prototype.formatQuery = formatQuery
    Vue.prototype.toBack = toBack
    Vue.prototype.changeNum = changeNum
  }
}