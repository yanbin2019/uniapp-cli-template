<template>
  <u-textarea v-bind="handelAttr" v-on="$listeners">
    <slot />
  </u-textarea>
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
