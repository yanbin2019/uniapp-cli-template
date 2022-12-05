<template>
  <view class="table">
    <view class="no-data" v-if="list.length <= 0">
      <image :src="noDataPng" alt=""></image>
      <text>暂无数据</text>
    </view>
    <template v-else>
      <view
        class="table-item"
        v-for="(item, index) in list"
        :key="`table-item${index}`"
      >
        <slot :row="{ ...item, $index: getIndex(index) }"></slot>
      </view>
    </template>
  </view>
</template>
<script>
import noDataPng from "@/static/noData.png";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      noDataPng,
    };
  },
  async created() { },
  methods: {
    getIndex(index) {
      const num = index + 1;
      return num < 10 ? `0${num}` : num;
    },
  },
};
</script>
<style lang="scss" scoped>
.table-item {
  padding-bottom: 20rpx;
  overflow: auto;
}
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 65rpx 0;
  border-radius: 20rpx;
  image {
    width: 244rpx;
    height: 237rpx;
  }
  text {
    margin-top: 20rpx;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.3);
    line-height: 30rpx;
  }
}
</style>
