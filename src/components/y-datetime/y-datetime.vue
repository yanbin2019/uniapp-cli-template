<template>
  <view class="datetime" @tap="show = true">
    <!-- <u-input :value="value" disabled disabledColor="#ffffff" placeholder="请输入">
			<u-icon slot="suffix" name="calendar" size="20" color="#B3B3B3"></u-icon>
		</u-input> -->
    <u-input
      disabled
      disabledColor="#ffffff"
      :border="isBorder"
      placeholder="请选择日期"
      :value="value"
    >
      <template xslot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <u-icon slot="suffix" name="arrow-down"></u-icon>
    </u-input>
    <u-datetime-picker
      :show="show"
      @confirm="confirm"
      :formatter="formatter"
      @cancel="show = false"
      v-model="time"
      mode="datetime"
    ></u-datetime-picker>
  </view>
</template>

<script>
import dayjs from "dayjs";
export default {
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isBorder: {
      type: String,
      // default: "surround"
      default: "none"
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        console.log('newVal', newVal)
        const date = dayjs(newVal).valueOf()
        this.time = date
      },
      deep: true,
    },
  },
  created() {
    if (!this.value) {
      var now = dayjs()
      const time = dayjs(now).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('update', time)
    }
  },
  data() {
    return {
      time: Number(new Date()),
      show: false
    }
  },
  methods: {
    confirm(val) {
      console.log(this.value)
      console.log(this.time, val)

      const time = dayjs(val.value).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('update', time)


      this.show = false
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      }
      if (type === 'month') {
        return `${value}月`
      }
      if (type === 'day') {
        return `${value}日`
      }
      if (type === 'hour') {
        return `${value}时`
      }
      if (type === 'minute') {
        return `${value}分`
      }
      return value
    },
  }
}
</script>

<style lang="scss" scoped>
.datetime {
  flex: 1;
}
</style>
