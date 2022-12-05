<template>
	<y-layout tabShow :leftShow="false">
		<view>
			<text>hello</text>
			<button @tap="openCos">加密</button>
      <button @tap="decrypt">解密</button>
			<button @tap="getKeyFile">getKey</button>
      <input id="fileSelector" type="file" onchange="upload" />
      <view>文件名：{{fileForm.name}}</view>
      <view>上传进度：{{fileForm.percent}}</view>
      <view>文件大小：{{fileForm.total + 'KB'}}</view>
			<img :src="src"></image>
			</view>
	</y-layout>
</template>

<script>
import { cos, Bucket, Region } from '@/utils/cos.js'
import { encryptBufferSlice, decryptBufferSlice } from '@/utils/sm2.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      src: '',
      PrivateKey: '',
      PublicKey: '',
      fileForm: {
        name: '',
        percent: '',
        total: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() { },
  onShow() {

  },
  mounted() {

  },
  methods: {

    upload(e) {
      const file = e.target.files && e.target.files[0];
      /* 直接调用cos sdk的方法 */
      cos.uploadFile({
        Bucket: 'examplebucket-1250000000', /* 填写自己的bucket，必须字段 */
        Region: 'COS_REGION',     /* 存储桶所在地域，必须字段 */
        Key: '1.jpg',              /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5,     /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
      });
    },
    decrypt() {
      uni.chooseFile({
        sourceType: ['camera', 'album'],
        success: (res) => {

          const file = res.tempFiles[0]
          decryptBufferSlice(file)
        }
      })
    },
    openCos() {
      return new Promise((succeed, failure) => {
        uni.chooseFile({
          sourceType: ['camera', 'album'],
          success: (res) => {

            const file = res.tempFiles[0]

            console.log('res', res, file)
            // this.toBlob(file)

            encryptBufferSlice(file)
            // const test = encryptBufferSlice(file)
            // const text2 = decryptBufferSlice(test)
            // console.log(test, text2)
            return
            // #ifdef H5 
            this.fileForm.name = file.name
            const that = this
            cos.sliceUploadFile({
              Bucket: Bucket, /* 填写自己的bucket，必须字段 */
              Region: Region,     /* 存储桶所在地域，必须字段 */
              Key: file.name,              /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
              Body: file, // 上传文件对象
              SliceSize: 1024 * 1024 * 1,     /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
              ServerSideEncryption: 'AES256',
              onTaskReady: function (tid) {
                console.log('onTaskReady', tid)
                // cos.putObject({
                //   Bucket: Bucket, /* 填写自己的bucket，必须字段 */
                //   Region: Region,     /* 存储桶所在地域，必须字段 */
                //   Key: file.name,              /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
                //   Body: file, // 上传文件对象
                //   ServerSideEncryption: 'AES256',
                // }, function (err, data) {
                //   console.log('err, data', err || data);
                // });
              },
              onHashProgress: function (progressData) {
                console.log('onHashProgress', JSON.stringify(progressData))

              },
              onProgress: function (progressData) {
                console.log('onProgress', JSON.stringify(progressData));
                that.fileForm.percent = parseInt(progressData.percent) * 100 + '%'
                that.fileForm.total = progressData.total
              },
              onFileFinish: function (err, data, options) {   /* 非必须 */
                console.log(options, data + '上传' + (err ? '失败' : '完成'));
              },
            }, function (err, data) {
              if (err) {
                console.log('上传失败', err, data);
              } else {
                console.log('上传成功', err, data);
              }
            });
            // #endif



          }
        })

      })

    },
    toBase64() {
      return new Promise((succeed, failure) => {
        // uni.chooseImage({
        //   count: 1, //默认9
        //   sizeType: ['compressed'],
        //   sourceType: ['album', 'camera'], //从相册选择,摄像头选择
        uni.chooseFile({
          sourceType: ['camera', 'album'],
          success: (res) => {
            console.log('res', res)
            // #ifdef MP-WEIXIN
            uni.getFileSystemManager().readFile({
              filePath: res.tempFilePaths[0],
              encoding: 'base64',
              success: r => { // r.data
                succeed(r.data)
              },
              fail: err => {
                failure(err)
              }
            })
            // #endif

            // #ifdef H5 
            uni.request({
              url: res.tempFilePaths[0],
              method: 'GET',
              responseType: 'arraybuffer',
              success: ress => {
                console.log(ress)
                let base64 = uni.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
                base64 = `data:${ress.header['content-type']};base64,${base64}` //不加上这串字符，在页面无法显示的哦
                // console.log('base64', base64)
                const text1 = rsaEncrypt(base64)
                const text2 = rsaDecrypt(text1)
                console.log('text1, text2', text1, text2)

                succeed(base64)
              },
              fail: e => {
                failure(e)
              },
            })
            // #endif

            // #ifdef APP
            plus.io.resolveLocalFileSystemURL(
              res.tempFilePaths[0],
              function (entry) {
                entry.file(function (file) {
                  var fileReader = new plus.io.FileReader()
                  fileReader.readAsDataURL(file)
                  fileReader.onloadend = function (evt) {
                    let base64 = evt.target.result.split(",")[1]
                    succeed(base64)
                    // console.log(base64)
                  }
                })
              },
              function (err) {
                failure(err)
              }
            )
            // #endif

          }
        })

      })
    },
    toBlob(file) {
      var baseData;
      // file-->base64
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        baseData = reader.result;
        //base64-->blob
        var byteString;
        if (baseData.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(baseData.split(',')[1]);//base64 解码
        else {
          byteString = unescape(baseData.split(',')[1]);
        }
        var mimeString = baseData.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png
        var ia = new Uint8Array(byteString.length);//创建视图
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ia], { type: file.type });
        blob.lastModifiedDate = new Date();
        console.log('blob', blob)
        const test = rsaEncrypt(blob)
        const text2 = rsaDecrypt(test)
        console.log(test, text2)
      };

    }
  }
}
</script>

<style scoped lang="scss"></style>
