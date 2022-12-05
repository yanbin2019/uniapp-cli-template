import { router } from '@/router/index.js'
import { toast,formatQuery } from '@/utils/common'
//query是数组：[123,123]
export const getList = async (ajax, params, query) => {
  try {
    const data = {
      pageNo: 1,
      pageSize: 100,
      ...params
    }
    let res
    if (query) {
      res = await ajax(...query, formatQuery(data))
    } else {
      res = await ajax(formatQuery(data))
    }
    return res
  } catch (error) {
    console.log(error)
    return {
      rows: [],
      data:[],
      total: 0
    }
  }
}
export const handle = async (ajax, data, query) => {
  return new Promise((resolve, reject) => {
    ajax(formatQuery(data)).then(res => {
      if (res.code === 200) {
        if (query) {
          toast(query.text)
          router.push({
            name: query.name,
            params: query.params || {},
            query: query.query || {},
          })
        } else {
          toast('操作成功')
        }
        resolve(res)
      }

    }).catch(error => {
      reject(error)
    })
  })
}