<template>
  <view class="code">
    <u-toast ref="uToast"></u-toast>
    <u-code
      :seconds="seconds"
      ref="uCode"
      @change="codeChange"
    ></u-code>
    <u--text
      color="#003BAF"
      :text="tips"
      @tap="getCode"
    ></u--text>
  </view>
</template>
<script>
import { getCode } from '@/api/login';
export default {
  props: {
    phone: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      seconds: 60,
      tips: '',
    }
  },
  async created () {
  },
  methods: {
    codeChange (text) {
      this.tips = text;
    },
    getCode () {
      if (this.$refs.uCode.canGetCode) {
        if (!this.phone) {
          uni.$u.toast('请先输入手机号');
          return
        }
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })

        getCode(this.phone).then(() => {


          uni.hideLoading();
          // 这里此提示会被this.start()方法中的提示覆盖
          uni.$u.toast('验证码已发送');
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();


        })

      } else {
        uni.$u.toast('倒计时结束后再发送');
      }
    },
  }
}
</script>
<style lang='scss' scoped>
.code {
  // width: 130rpx;
  // height: 38rpx;
  margin-left: 30rpx;
}
</style>