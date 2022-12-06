import sparkMD5 from 'spark-md5'
import {
  sm2
} from 'sm-crypto';
import {
  Buffer
} from 'buffer';
import {
  cos,
  Bucket,
  Region
} from './cos'

export default class Encrypt {
  constructor() {
    this.file = undefined
    this.hash = ''
    this.hashProgress = 0
    this.tid = ''
    // 公钥-示例
    this.publickey_buffer =
      '04a813713a24d3587ee83aff88b11a99ba6e0d9db7f8c2789eca8f552073892b7559377bd0f8f84f66841ea58de23a24dd7ce44b54df999ddea45faeb2a0039740';
    this.progress = {
      //文件名
      name:'',
      //文字说明
      text: '',
      //上传百分比进度
      percent: '0%',
      //文件总大小
      total: '0',
      //当前上传文件大小
      loaded: '0',
      //上传和上链状态
      status: '',
      //文件上传标识ID
      tid: ''
    }
  }
  async chain(file) {
    this.file = file
    this.hash = await this.fileHash(file)
    console.log('hash', this.hash)
    this.encryptBufferSlice(file)
  }
  //文件加密方法
  encryptBufferSlice(file) {
    this.getArrayBuffer(file, (result) => {
      this.setProgress({
        text: '文件正在加密中',
      })
     
      const buffer = Buffer.from(result, 'base64');

      const sliceBuffer_head = buffer.slice(0, 100000);
      // const sliceBuffer_head = '在线加密'

      const sliceBuffer_tail = buffer.slice(100000);

      const encryptStr = '04' + sm2.doEncrypt(sliceBuffer_head, this.publickey_buffer, 1);
      // console.log('sliceBuffer_tail', sliceBuffer_tail)
      // console.log('encryptStr', encryptStr)


      const encryptBufferArr = Buffer.from(encryptStr, 'hex');

      const concatBuffer = Buffer.concat([encryptBufferArr, sliceBuffer_tail]);
      const blob = new Blob([concatBuffer], {
        type: file.type
      });
      this.setProgress({
        text: '文件加密完成',
      })
      // console.log('blob', blob)
      //文件下载
      this.downBlob(blob, file.name);
      //文件上传
      // this.cosUpload(blob, file.name)
    });
  }
  //计算文件哈希
  async fileHash(file) {
    this.setProgress({
      text: '正在计算哈希中',
      status: 'await',
      name: file.name
    })
    const chunks = []
    let cur = 0
    while (cur < file.size) {
      const size = cur + 1 * 1024 * 1024
      chunks.push({
        index: cur,
        file: file.slice(cur, size)
      }) // 1MB/片
      cur += size
    }

    return new Promise(resolve => {
      const spark = new sparkMD5.ArrayBuffer()
      let count = 0

      const appendToSpark = async file => {
        return new Promise(resolve => {
          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onload = e => {
            spark.append(e.target.result)
            resolve()
          }
        })
      }
      const workLoop = async deadline => {
        while (count < chunks.length && deadline.timeRemaining() > 1) {
          //浏览器存在空闲时间
          await appendToSpark(chunks[count].file)
          count++
          if (count < chunks.length) {
            this.hashProgress = Number(((100 * count) / chunks.length).toFixed(2))
          } else {
            this.hashProgress = 100
            this.setProgress({
              text: '计算哈希完成',
            })
            resolve(spark.end())
          }
        }
        window.requestIdleCallback(workLoop) // 给 workLoop 函数一个浏览器状态参数 deadline
      }
      window.requestIdleCallback(workLoop) // 给 workLoop 函数一个浏览器状态参数 deadline
    })
  }
  //下载文件方法
  downBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.setAttribute('href', url);
    a.setAttribute('download', filename);

    const event = document.createEvent('MouseEvent');
    event.initMouseEvent('click');

    a.dispatchEvent(event);
  }
  //文件转换回调
  getArrayBuffer(file, callback) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.addEventListener('load', () => callback(reader.result));
  }

  cosUpload(blob, name) {
    var that = this
    cos.sliceUploadFile({
      Bucket: Bucket,
      /* 填写自己的bucket，必须字段 */
      Region: Region,
      /* 存储桶所在地域，必须字段 */
      Key: name,
      /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
      Body: blob, // 上传文件对象
      SliceSize: 1024 * 1024 * 1,
      /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
      ServerSideEncryption: 'AES256',
      onTaskReady(tid) {
        // console.log('onTaskReady', tid, that)
        that.setProgress({
          tid
        })
        that.tid = tid
      },
      onHashProgress: function (progressData) {
        console.log('onHashProgress', JSON.stringify(progressData))

      },
      onProgress(progressData) {

        const percent = parseInt(progressData.percent) * 100 + '%'
        const text = '文件上传中'
        const total = that.setFileSize(progressData.total)
        const loaded = that.setFileSize(progressData.loaded)
        console.log('onProgress', JSON.stringify(progressData));
        that.setProgress({
          percent,
          total,
          loaded,
          text
        })
      },
      onFileFinish: function (err, data, options) {
        /* 非必须 */
        console.log('options,', options)
        console.log('data', data)
        console.log('err', '上传' + (err ? '失败' : '完成'));
      },
    }, function (err, data) {
      if (err) {
        console.log('上传失败', err, data);
        const text = '文件上传失败'
        that.setProgress({
          text,
          status: 'error'
        })
      } else {
        const text = '文件上传成功'
        that.setProgress({
          text
        })
        that.fileChain(data)
        console.log('上传成功', err, data);
      }
    });

  }
  //模拟文件上链操作
  fileChain(data) {
    const text = '文件上链成功'
    this.setProgress({
      text,
      status: 'success'
    })
  }
  //文件上传进度状态维护函数
  setProgress(data) {

    this.progress = {
      ...this.progress,
      ...data,
    }
    console.log('this.progress ', this.progress, data)
  }
  //文件大小文字提示格式化
  setFileSize(size) {
    if (size < 1024) return size + 'B'
    const unit = 1024 * 1024
    const total = parseInt(size)
    const k = Math.ceil(total / 1024)
    if (total < unit) return k + 'KB'
    const m = total / unit
    if (m < 1024) return m.toFixed(1) + 'MB'
    const g = m / 1024
    return g.toFixed(2) + 'GB'
  }
}