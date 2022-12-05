<template>
  <y-layout tabShow :leftShow="false">
    <view class="main">
      <hade :info="info" style="height: 258rpx; margin-bottom: 20rpx"></hade>
      <setting style="flex: 1"></setting>
    </view>
  </y-layout>
</template>
<script>
import hade from './hade.vue';
import setting from './setting.vue';
export default {
  components: {
    hade,
    setting,
  },
  data() {
    return {
      info: {}
    }
  },
  // async onShow() {
  //   uni.hideTabBar()
  // },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.app-container {
  flex: 1;
}

.main {
  height: calc(100% - 128rpx);
  padding: 20rpx 15rpx;
  display: flex;
  flex-direction: column;
}
</style>
