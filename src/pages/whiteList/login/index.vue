<template>
  <view class="app-content">
    <view class="main">
      <view class="form">
        <u--form
          labelPosition="top"
          :model="modelForm"
          :rules="rules"
          ref="modelForm"
        >
          <u-form-item prop="username">
            <u-input
              placeholder="请输入手机号"
              shape="circle"
              maxlength="11"
              clearable
              v-model="modelForm.username"
            >
              <template slot="prefix">
                <view class="prefix">
                  <image class="phonePng" :src="phonePng" alt=""></image>
                </view>
              </template>
            </u-input>
          </u-form-item>
          <u-form-item v-if="!codeShow" prop="password">
            <password v-model="modelForm.password"></password>
          </u-form-item>
          <u-form-item v-else prop="code">
            <u-input
              placeholder="请输入验证码"
              shape="circle"
              maxlength="6"
              clearable
              v-model="modelForm.code"
            >
            </u-input>
            <GetCode :phone="modelForm.username"></GetCode>
          </u-form-item>
        </u--form>
      </view>
      <view class="tab">
        <u--text text="立即注册" @tap="toRegister"></u--text>
        <u--text
          @tap="setLoginType"
          :text="codeShow ? '密码登录' : '验证码登录'"
        ></u--text>
        <u--text @tap="toForget" text="忘记密码"></u--text>
      </view>
      <view class="btn">
        <u-button
          type="primary"
          @tap="login"
          size="large"
          shape="circle"
          text="登录"
        ></u-button>
      </view>
    </view>
    <WeChat v-model="checkValue"></WeChat>
  </view>
</template>
<script>
import GetCode from "@/pages/whiteList/components/GetCode";
import password from "@/pages/whiteList/components/password";
import WeChat from "@/pages/whiteList/components/WeChat";
import keyPng from "@/pages/whiteList/image/key.png";
import phonePng from "@/pages/whiteList/image/phone.png";
import {
  rules
} from "@/pages/whiteList/rules";
import logoPng from "@/static/logo.png";
export default {
  components: {
    WeChat,
    GetCode,
    password,
  },
  data() {
    return {
      logoPng,
      phonePng,
      keyPng,
      codeShow: false,
      modelForm: {
        username: undefined,
        password: undefined,
        code: undefined,
      },
      rules,
      checkValue: false,
    };
  },
  async created() { },
  methods: {
    login() {
      if (!this.checkValue) {
        this.$msg("请先同意用户协议和隐私政策");
        return;
      }

      this.$refs.modelForm.validate().then(() => {
        if (this.codeShow) {
          this.modelForm.password = undefined;
        } else {
          this.modelForm.code = undefined;
        }

        this.$store.dispatch("Login", this.modelForm).then(() => {
          uni.reLaunch({
            url: "/pages/home/index",
          });
          this.$store.dispatch("GetInfo");
        });
      });
    },
    toRegister() {
      this.$Router.push({
        name: "register",
      });
    },
    toForget() {
      this.$Router.push({
        name: "forget",
      });
    },
    setLoginType() {
      this.codeShow = !this.codeShow;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.logo {
  width: 292rpx;
  height: 100rpx;
}

.main {
  width: calc(100% - 150rpx);

  .tab {
    display: flex;
    padding-top: 34rpx;
    padding-bottom: 130rpx;
  }
}

.prefix {
  width: 38rpx;
  height: 38rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .phonePng {
    width: 24rpx;
    height: 36rpx;
  }
}

.code {
  // width: 130rpx;
  // height: 38rpx;
  margin-left: 30rpx;
}
</style>
