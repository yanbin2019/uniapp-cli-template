<template>
  <u-input v-bind="handelAttr" v-on="$listeners">
    <slot />
  </u-input>
</template>

<script>
export default {
  computed: {
    handelAttr() {
      return {
        ...this.$attrs
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
