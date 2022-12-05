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


// 公钥-示例
const publickey_buffer =
  '0451d6cad24f7719edd7e4e6fccbb2fa9867aec2e609ffeb69ec17570e41daf3073d5e8be23828b41e70c92445e1bc30a992d51c425a83ec0a1c0988b87dce0967';
// 私钥-示例
const privateKey_buffer = '24417f87b5e72f7d6f624b5a82e3c53193b819926dd914d772e179b78d9b4914';


// 截取文件流部分字节加密
export const encryptBufferSlice = function (file) {
  getArrayBuffer(file, (result) => {
    console.log('file', file)
    const key = sm2.generateKeyPairHex()
    console.log('key',key)
    const buffer = Buffer.from(result, 'base64');

    const sliceBuffer_head = buffer.slice(0, 100000);

    const sliceBuffer_tail = buffer.slice(100000);

    const encryptStr = '04' + sm2.doEncrypt(sliceBuffer_head, publickey_buffer, 1);
    // console.log('sliceBuffer_tail',sliceBuffer_tail)
    //   console.log('encryptStr',encryptStr)
  

    const encryptBufferArr = Buffer.from(encryptStr, 'hex');

    const concatBuffer = Buffer.concat([encryptBufferArr, sliceBuffer_tail]);

    const blob = new Blob([concatBuffer], {
      type: file.type
    });
    console.log('blob', blob)
    downBlob(blob, file.name);
  });
};

// 截取文件流部分字节解密
export const decryptBufferSlice = function (file) {

  getArrayBuffer(file, (result) => {
    console.log('file', file)
    const buffer = Buffer.from(result, 'hex');

    const sliceBuffer_head = buffer.slice(0, 100097);

    const sliceBuffer_tail = buffer.slice(100097);

    let strHex = sliceBuffer_head.toString('hex');
    strHex = strHex.slice(2);

    const decryptStr = sm2.doDecrypt(strHex, privateKey_buffer, 1, {
      output: 'array'
    });
    // console.log('strHex', strHex)
    // console.log('decryptStr',decryptStr)

    const decryptBuffer = Buffer.from(decryptStr, 'base64');

    const concatBuffer = Buffer.concat([decryptBuffer, sliceBuffer_tail]);

    const blob = new Blob([concatBuffer], {
      type: file.type
    });
    console.log('blob', blob)
    downBlob(blob, file.name);
  });
};

// 获取图片ArrayBuffer
export const getArrayBuffer = function (file, callback) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.addEventListener('load', () => callback(reader.result));
};

// 下载文件
const downBlob = function (blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.setAttribute('href', url);
  a.setAttribute('download', filename);

  const event = document.createEvent('MouseEvent');
  event.initMouseEvent('click');

  a.dispatchEvent(event);
};
export const cosDown = (blob, name) => {
  const form = {
    percent,
    total
  }
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
    onTaskReady: function (tid) {
      console.log('onTaskReady', tid)
    },
    onHashProgress: function (progressData) {
      console.log('onHashProgress', JSON.stringify(progressData))

    },
    onProgress: function (progressData) {
      console.log('onProgress', JSON.stringify(progressData));
      form.percent = parseInt(progressData.percent) * 100 + '%'
      form.total = progressData.total
    },
    onFileFinish: function (err, data, options) {
      /* 非必须 */
      console.log(options, data + '上传' + (err ? '失败' : '完成'));
    },
  }, function (err, data) {
    if (err) {
      console.log('上传失败', err, data);
    } else {
      console.log('上传成功', err, data);
    }
  });
  return form
}