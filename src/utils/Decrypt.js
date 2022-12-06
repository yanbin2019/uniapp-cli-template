import {
  sm2
} from 'sm-crypto';
import {
  Buffer
} from 'buffer';
export default class Encrypt {
  constructor() {
    this.file = undefined
    this.tid = ''
    // 公钥-示例
    this.privateKey_buffer = '00cb000ef0968116c3832684a457a28e4dddaeeb36de38e1294b73e002d2d50e87';
    this.progress = {
      //文件名
      name:'',
      //文字说明
      text: '',
      //下载百分比进度
      percent: '0%',
      //文件总大小
      total: '0',
      //当前下载文件大小
      loaded: '0',
      //下载和上链状态
      status: '',
      //文件下载标识ID
      tid: ''
    }
  }
  //本来应该是在腾讯云的存储桶里面取文件出来的，现在暂时用本地文件
  async download(file) {
    this.file = file
    this.decryptBufferSlice(file)
  }
// 截取文件流部分字节解密
 decryptBufferSlice (file) {

  this.getArrayBuffer(file, (result) => {
    console.log('file', file)
    const buffer = Buffer.from(result, 'hex');

    const sliceBuffer_head = buffer.slice(0, 100097);

    const sliceBuffer_tail = buffer.slice(100097);

    let strHex = sliceBuffer_head.toString('hex');
    strHex = strHex.slice(2);

    const decryptStr = sm2.doDecrypt(strHex, this.privateKey_buffer, 1, {
      output: 'array'
    });
    console.log('strHex', strHex)
    console.log('decryptStr',decryptStr)

    const decryptBuffer = Buffer.from(decryptStr, 'base64');

    const concatBuffer = Buffer.concat([decryptBuffer, sliceBuffer_tail]);

    const blob = new Blob([concatBuffer], {
      type: file.type
    });
    console.log('blob', blob)
    this.downBlob(blob, file.name);
  });
};
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
}