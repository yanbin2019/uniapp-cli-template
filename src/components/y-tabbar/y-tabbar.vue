<template>
  <u-tabbar
    :value="$Route.path"
    @change="change"
    :fixed="true"
    :border="false"
    :placeholder="true"
    :safeAreaInsetBottom="true"
    inactiveColor="#595959"
    activeColor="#ECC95F"
  >
    <u-tabbar-item
      v-for="(item, index) in list"
      :key="`tabbar${index}`"
      :text="item.text"
      :name="item.name"
    >
      <image
        class="u-page__item__slot-icon"
        slot="active-icon"
        :src="item.selectedIconPath"
      ></image>
      <image
        class="u-page__item__slot-icon"
        slot="inactive-icon"
        :src="item.iconPath"
      ></image>
    </u-tabbar-item>
  </u-tabbar>
</template>

<script>
export default {
  created() {
    uni.hideTabBar()
  },
  data() {
    return {
      list: [{
        name: '/pages/home/index',
        text: '文件',
        url: '/pages/home/index',
        iconPath: '/static/tabBar/home.png',
        selectedIconPath: '/static/tabBar/home_select.png'
      },
      {
        name: '/pages/mine/index',
        text: '我的',
        url: '/pages/mine/index',
        iconPath: '/static/tabBar/mine.png',
        selectedIconPath: '/static/tabBar/mine_select.png'
      },
      ]
    }
  },
  methods: {
    change(name) {
      if (this.$Route.path === name) return
      uni.reLaunch({
        url: name
      })
    },

  }
}
</script>

<style scoped>
.u-page__item__slot-icon {
  width: 36rpx;
  height: 36rpx;
}
::v-deep .u-tabbar__content {
  background: rgba(42, 42, 42, 0.76);
  box-shadow: 0px 1rpx 4rpx 0px rgba(0, 0, 0, 0.2);
  /* border-radius: 20px 20px 0px 0px; */
  backdrop-filter: blur(4rpx);
}
</style>
