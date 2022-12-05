<template>
  <div class="title-font">
    <div class="main">
      <div class="left">
        <image :src="leftPng" />
      </div>
      <div class="title">
        {{ getTitle }}
      </div>
    </div>
  </div>
</template>

<script>
import leftPng from './left.png'
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    leftShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      leftPng
    }
  },
  computed: {
    getTitle() {
      return this.title || this.$Route.remark
    }
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style scoped lang="scss">
.title-font {
  display: flex;
  align-items: flex-end;
  height: 60rpx;
  padding: 0 50rpx;
  .main {
    display: flex;
    align-items: center;
    .left {
      width: 20rpx;
      height: 35rpx;
      margin-right: 50rpx;
    }
  }
}
</style>
