<template>
  <view @tap="show = true" class="y-select">
    <u-input
      disabled
      disabledColor="#ffffff"
      :shape="shape"
      :border="border"
      :placeholder="placeholder"
      v-model="label"
    >
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <u-icon slot="suffix" name="arrow-down"></u-icon>
    </u-input>

    <y-popup
      :show="show"
      ref="factorySelect"
      :columns="options"
      :multiple="multiple"
      @change="handleChange"
      @close="show = false"
    >
    </y-popup>
  </view>
</template>
<script>
import YPopup from '@/components/y-popup/y-popup.vue'
export default {
  components: {
    YPopup
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [String, Number, Object],
      default: undefined
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    rowKey: {
      type: String,
      default: 'dictValue'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    border: {
      type: String,
      default: 'surround'
    },
    shape: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    handelAttr() {
      return {
        ...{
          disabled: true,
          disabledColor: "#ffffff",
          border: "none",
          placeholder: "请选择"
        },
        ...this.$attrs
      }
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        try {
          let label
          this.options.map((item) => {
            if (item.dictValue === newVal) {
              label = item.dictLabel
            }
          })
          console.log('newValValue', newVal)
          this.label = label || newVal
        } catch (error) {
          this.label = newVal
        }
      },
      deep: true,
    },
    options: {
      handler(newVal, oldVal) {
        try {
          let label
          newVal.map((item) => {
            if (item.dictValue === this.value) {
              label = item.dictLabel
            }
          })
          this.label = label || this.value
        } catch (error) {
          this.label = this.value
        }
      },
      deep: true,
    }
  },
  data() {
    return {
      label: '',
      show: false
    }
  },
  async created() {

  },
  methods: {
    handleChange(v, item) {
      if (v) {
        this.$emit('change', v, item)
        this.$emit('update', v)
        this.show = false
      }

    }
  }
}
</script>
<style lang='scss' scoped>
.y-select {
  flex: 1;
}
</style>
