<template>
  <div class="app-content">
    <Navbar v-bind="handelAttr" v-if="navShow"></Navbar>
    <slot></slot>
    <Tabbar v-if="tabShow"></Tabbar>
  </div>
</template>

<script>
import { navbar } from '@/components/props/navbar.js'
import Navbar from '@/components/y-navbar/y-navbar'
import Tabbar from '@/components/y-tabbar/y-tabbar'
export default {
  name: '',
  components: { Navbar, Tabbar },
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
