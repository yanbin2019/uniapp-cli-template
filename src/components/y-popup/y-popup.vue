<template>
  <u-popup v-bind="handelAttr" v-on="$listeners">
    <view class="main">
      <view class="top">
        <view class="close" @tap="handleChange(1)">取消</view>
        <view class="title">{{ title }}</view>
        <view class="confirm" @tap="handleChange(2)">{{ confirmText }}</view>
      </view>
      <view class="no-data" v-if="isShow">
        <image :src="noDataPng" alt=""></image>
        <text>{{ noData }}</text>
      </view>
      <view v-else class="list">
        <template v-if="multiple">
          <view class="multiple">
            <u-checkbox-group v-model="checked" placement="column">
              <view
                v-for="(item, index) in columns"
                :key="`columns${index}`"
                @tap="handleTap(item)"
                :style="getColor(item)"
              >
                <view class="list-main">
                  <u-checkbox
                    shape="circle"
                    :name="item.dictValue"
                    :label="getLabel(item)"
                  ></u-checkbox>
                </view>
              </view>
            </u-checkbox-group>
          </view>
        </template>

        <view v-else>
          <view
            class="list-main"
            v-for="(item, index) in columns"
            :key="`columns${index}`"
            @tap="handleTap(item)"
            :style="getColor(item)"
          >
            {{ getLabel(item) }}
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>
<script>
import noDataPng from "@/static/noData.png";
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "请选择",
    },
    noData: {
      type: String,
      default: "暂无数据",
    },
    rowKey: {
      type: String,
      default: "dictValue",
    },
    confirmText: {
      type: String,
      default: "确认",
    },
    setLabel: {
      type: Function,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      checked: [],
      value: "",
      item: {},
      noDataPng,
    };
  },
  computed: {
    isShow() {
      return !this.columns.length;
    },
    handelAttr() {
      return {
        ...{
          mode: "bottom",
          round: "10",
        },
        ...this.$attrs,
      };
    },
  },
  async created() { },
  methods: {
    getColor(item) {
      if (this.multiple) {
        return {
          color: this.checked.indexOf(item[this.rowKey]) > -1 ? "#003BAFFF" : ""
        }
      }
      return {
        color: this.value === item[this.rowKey] ? "#003BAFFF" : ""
      };
    },
    getLabel(item) {
      if (this.setLabel) {
        return this.setLabel(item)
      }
      return item.dictLabel;
    },
    handleTap(item) {
      this.item = item;
      this.value = item[this.rowKey];
      console.log(this.value, item[this.rowKey]);
    },
    handleChange(status) {
      if (status === 2) {
        if (this.multiple) {
          if (this.checked.length > 0) {
            this.$emit("change", this.checked, this.item);
            this.$emit("close");
          } else {
            this.msgError()
          }

        } else {
          if (this.value) {
            this.$emit("change", this.value, this.item);
            this.$emit("close");
          } else {
            this.msgError()
          }


        }

      } else {
        this.$emit("close");
      }
    },
    msgError() {
      this.$msg('请至少选择一项')

    }
  },
};
</script>
<style lang="scss" scoped>
.main {
  .top {
    display: flex;
    justify-content: space-between;
    padding: 35rpx 50rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;

    line-height: 30rpx;

    .close {
      color: rgba(0, 0, 0, 0.5);
    }

    .title {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }

    .confirm {
      color: #003baf;
    }
  }

  .list {
    max-height: 400rpx;
    overflow-y: scroll;

    .list-main {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 35rpx 0;
      border-top: 1rpx solid rgba(0, 0, 0, 0.1);
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.3);
      line-height: 30rpx;
    }

    .item {
      display: flex;
      align-items: center;
    }
  }
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
