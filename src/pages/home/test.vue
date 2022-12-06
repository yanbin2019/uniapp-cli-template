<template>
  <y-layout tabShow :leftShow="false">
    <view>
      <button @tap="handleEncrypt">加密</button>
      <button @tap="handleDecrypt">解密</button>
      <button @tap="getKey">获取公私钥</button>
      <input id="fileSelector" type="file" onchange="upload" />
      <view>文件名：{{ fileForm.name }}</view>
      <view>文件唯一标识：{{ fileForm.tid }}</view>
      <view>上传进度：{{ fileForm.percent }}</view>
      <view>当前上传文件大小：{{ fileForm.loaded }}</view>
      <view>文件大小：{{ fileForm.total }}</view>
      <view>文件状态：{{ fileForm.status }}</view>
      <view>文件状态说明：{{ fileForm.text }}</view>
    </view>
  </y-layout>
</template>

<script>
import Encrypt from '@/utils/Encrypt.js'
import Decrypt from '@/utils/Decrypt.js'
import { getSm2Key } from '@/utils/sm2.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      fileForm: {
      },
      encrypt: undefined,
      decrypt: undefined
    }
  },
  computed: {},
  watch: {
    encrypt: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.fileForm = newVal.progress
      },
      deep: true,
    }
  },
  created() { },

  mounted() {
    this.decrypt = new Decrypt()
    this.encrypt = new Encrypt()
  },
  methods: {


    handleDecrypt() {
      uni.chooseFile({
        sourceType: ['camera', 'album'],
        success: (res) => {
          const file = res.tempFiles[0]
          this.decrypt.download(file)
        }
      })
    },
    handleEncrypt() {
      return new Promise((succeed, failure) => {
        uni.chooseFile({
          sourceType: ['camera', 'album'],
          success: (res) => {
            const file = res.tempFiles[0]

            this.encrypt.chain(file)

          }
        })

      })

    },
    getKey() {
      getSm2Key()
    }

  }
}
</script>

<style scoped lang="scss">
</style>
