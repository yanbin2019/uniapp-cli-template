/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
export const isPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
export const isArray = (arr) => {
  return Array.isArray(arr)
}
export function isFunction(fn) {
   return Object.prototype.toString.call(fn)=== '[object Function]';
}
export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(`error：${str}!!!${e}`);
      return false;
    }
  } else {
    return false;
  }
}
