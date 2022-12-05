<template>
  <view class='setting'>
    <SettingItem :list="list"></SettingItem>
  </view>
</template>
<script>
import SettingItem from './components/SettingItem.vue';
export default {
  components: { SettingItem },
  props: {
    info: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      list: [
        { label: '消息通知', name: 'SystemMessage' },
        { label: '反馈意见', name: 'SystemOpinion' },
        { label: '梳棉机厂商', name: 'SystemEquipment' },
        { label: '针布厂商', name: 'SystemClothing' },
        { label: '我的设置', name: 'SystemSetting' },
      ]
    }
  },
  async created () {
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.setting {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 0rpx 30rpx;
  padding-top: 60rpx;
}
</style>