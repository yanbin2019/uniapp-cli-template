<template>
  <u-tabbar
    :value="$Route.path"
    @change="change"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
    inactiveColor="#000000CC"
    activeColor="#003BAFFF"
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
        text: '首页',
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
</style>
