<template>
  <y-layout tabShow :leftShow="false">
    <view class="main">
      <y-form :formSchema="formSchema"></y-form>
    </view>
  </y-layout>
</template>

<script>
import { formSchema } from './columns.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      formSchema
    }
  },
  computed: {},
  watch: {},
  onShow() {
    console.log(this.formSchema)
  },
  mounted() { },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.main {
  padding: 20rpx;
}
</style>
