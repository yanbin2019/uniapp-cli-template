<template>
  <view class="hade">
    <view class="left">
      <view class="avatar">
        <image :src="avatarPng" alt=""></image>
        <view class="update">
          <image :src="updatePng" alt=""></image>
        </view>
      </view>
      <view class="info">
        <view class="code">{{ user.userName }}</view>
        <view class="name">用户昵称：{{ user.realName }}</view>
      </view>
    </view>
    <view class="right" @tap.stop="toSystemSetting">
      <image :src="settingPng" alt=""></image>
    </view>
  </view>
</template>
<script>
import avatarPng from "@/static/avatar.png";
import {
  mapGetters
} from "vuex";
import settingPng from "./image/setting.png";
import updatePng from "./image/update.png";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      settingPng,
      updatePng,
      avatarPng,
    };
  },
  async created() { },
  methods: {
    toSystemSetting() {
      // this.$Router.push({
      // 	name: "SystemSetting"
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.hade {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .left {
    display: flex;
    height: 100%;
    align-items: center;

    .avatar {
      width: 150rpx;
      height: 150rpx;
      border: 6rpx solid #d1e1ff;
      border-radius: 50%;
      position: relative;

      .update {
        position: absolute;
        left: 50%;
        bottom: -30rpx;
        transform: translateX(-50%);

        image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }

  .info {
    margin-left: 44rpx;

    .code {
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 30rpx;
      margin-bottom: 30rpx;
    }

    .name {
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 30rpx;
    }
  }

  .right {
    width: 41rpx;
    height: 37rpx;
  }
}
</style>
