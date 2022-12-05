<template>
  <!-- u-input 要设置key，才能实现type的动态切换 -->
  <u-input
    placeholder="请输入密码"
    shape="circle"
    :type="eyeShow ? 'password' : 'text'"
    :value="value"
    :key="eyeShow"
    @input="handelInput"
  >
    <template slot="suffix">
      <u-icon
        @tap="handleEye"
        :name="eyeShow ? 'eye-off' : 'eye-fill'"
      ></u-icon>
    </template>
    <template slot="prefix">
      <view class="prefix">
        <image class="keyPng" :src="keyPng" alt=""></image>
      </view>
    </template>
  </u-input>
</template>
<script>
import keyPng from "@/pages/whiteList/image/key.png";
export default {
  model: {
    prop: "value",
    event: "update",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      keyPng,
      eyeShow: true,
    };
  },
  async created() { },
  methods: {
    handleEye() {
      this.eyeShow = !this.eyeShow;
    },
    handelInput(v) {
      this.$emit("update", v);
    },
  },
};
</script>
<style lang="scss" scoped>
.prefix {
  width: 38rpx;
  height: 38rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.keyPng {
  width: 30rpx;
  height: 30rpx;
}
</style>
