<template>
  <view class="navbar">
    <u-navbar
      placeholder
      @leftClick="leftClick"
      @rightClick="rightClick"
      :title="getTitle"
      :rightIcon="rightIcon"
      :leftIconColor="leftIconColor"
      :bgColor="bgColor"
    >
      <template slot="right" v-if="$slots.right">
        <view class="right">
          <slot name="right"></slot>
        </view>
      </template>
      <template slot="left" v-if="$slots.left || !leftShow">
        <view class="left">
          <slot name="left"></slot>
        </view>
      </template>
      <template slot="center" v-if="$slots.default">
        <view class="center">
          <slot></slot>
        </view>
      </template>
    </u-navbar>
  </view>
</template>
<script>
import { navbar } from '@/components/props/navbar.js'
export default {
  props: navbar,
  data() {
    return {}
  },
  async created() { },
  computed: {
    getTitle() {
      return this.title || this.$Route.remark
    }
  },
  methods: {
    leftClick() {
      uni.navigateBack()
    },
    rightClick() {
      this.$emit('rightClick')
    }
  }
}
</script>
<style lang='scss' scoped>
.navbar {
  min-height: 88rpx;
  position: relative;
}

::v-deep .u-navbar__content__title {
  color: #ffffff;
}

.right {
  color: #fff;
}

::v-deep .u-icon__icon {
  span {
    color: #fff;
  }
}
</style>
