import {
  isJSON
} from './validate'
import {
  router
} from '@/router/index'
/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

/**
 * 显示模态弹窗
 * @param content 提示的标题
 */
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

/**
 * 复制文本
 * @param text
 */
export const copyText = (text) => {
  return new Promise((resolve) => {
    const copyInput = document.createElement('input'); //创建一个input框获取需要复制的文本内容
    copyInput.value = text;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand('copy');
    copyInput.remove();
    resolve(true);
  });
};
//表格json数据格式化
export const setJsonLabel = (json, symbol, value) => {
  try {
    let data = [];
    if (isJSON(json)) {
      data = [...JSON.parse(json)];
    } else {
      data = [...json];
    }
    if (value) {
      const textList = [];
      data.map((item) => {
        textList.push(item[value]);
      });
      return textList.join(symbol ? symbol : '，');
    }
    return data.join(symbol ? symbol : '，');
  } catch (error) {
    console.log(error, json, symbol, value);
    return '';
  }
};
export const setRole = (value) => {
  const list = [{
      name: '管理员',
      id: '101',
      type: 'warning'
    },
    {
      name: '维保员',
      id: '102',
      type: 'primary'
    },
    {
      name: '查看员',
      id: '103',
      type: 'success'
    },
  ]
  var type
  list.map((item) => {
    if (value === item.name || value === item.id) {
      type = item.type
    }
  })
  return type
}
//query路由跳转参数传值，参数处理
export const formatQuery = (query) => {
  const data = {}
  for (const key in query) {
    if (!(query[key] === null || query[key] === undefined || query[key] === '[object Object]' || query[key] === '[object Array]')) {
      data[key] = query[key]
    }
  }
  return data
}

// 回到上一页
export const toBack = (params) => {
  if (params) {
    router.push(params)
  } else {
    // 跳转上一页
    uni.navigateBack({
      delta: 1
    })
  }
}

// 处理产量数字
export const changeNum = (count) => {
  count = Number(count)
  if (count > 9999) {
    return {
      num: (count / 10000).toFixed(2),
      unit: 'wt'
    }
  }
  if (count > 999) {
    return {
      num: (count / 1000).toFixed(2),
      unit: 'kt'
    }
  } else {
    return {
      num: count.toFixed(2),
      unit: 't'
    }
  }
}
//动态表单处理异步接口数组函数
export const setOptions = (form, params) => {
  const schema = form.schema.map((item) => {
    if (item.fieId === params.fieId) {
      const list = params.options.map((i) => {
        const dictLabel = params.dictLabel ? i[params.dictLabel] : i.dictLabel
        const dictValue = params.dictValue ? i[params.dictValue] : i.dictValue
        return {
          ...i,
          dictLabel,
          dictValue
        }
      })
      return {
        ...item,
        options: [...list]
      }
    }
    return item
  })
  return {
    ...form,
    schema
  }
}