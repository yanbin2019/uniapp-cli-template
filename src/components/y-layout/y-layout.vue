<template>
  <div class="app-content">
    <y-navbar v-bind="handelAttr" v-if="navShow"></y-navbar>
    <!-- <Title></Title> -->
    <slot></slot>
    <y-tabbar v-if="tabShow"></y-tabbar>
  </div>
</template>

<script>
import { navbar } from '@/components/props/navbar.js'
import yNavbar from '@/components/y-navbar/y-navbar'
import yTabbar from '@/components/y-tabbar/y-tabbar'
import Title from '@/components/y-title/y-title'
export default {
  name: '',
  components: { yNavbar, yTabbar, Title },
  props: {
    ...navbar,
    tabShow: {
      type: Boolean,
      default: false
    },
    navShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },

  computed: {
    handelAttr() {
      return {
        ...this.$attrs,
        ...this._props
      }
    }
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
