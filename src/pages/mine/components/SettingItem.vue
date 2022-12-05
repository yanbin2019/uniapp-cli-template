<template>
  <view>
    <view
      class="item"
      v-for="(item, index) in list"
      :key="`list${index}`"
      @tap="handleTap(item)"
    >
      <view class="label">{{ item.label }}</view>
      <u-icon name="arrow-right"></u-icon>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
    }
  },
  async created() {
  },
  methods: {
    handleTap(item) {
      // this.$Router.push({ name: item.name })
    }
  }
}
</script>
<style lang='scss' scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 60rpx;
  .label {
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    line-height: 30rpx;
  }
}
</style>