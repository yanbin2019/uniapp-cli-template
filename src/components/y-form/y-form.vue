<template>
  <u--form
    ref="schemaForm"
    v-bind="handelAttr"
    v-on="$listeners"
    :model="formModel"
  >
    <template>
      <y-form-item
        v-for="(formItem, index) in formSchema.schema"
        :key="formItem.fieId"
        :schemaItem="formItem"
        @setValue="setValue"
      >
      </y-form-item>
    </template>
    <slot></slot>
  </u--form>
</template>

<script>
import yFormItem from '@/components/y-form-item/y-form-item'
export default {
  name: 'yForm',
  components: { yFormItem },
  props: {
    formSchema: {
      type: Object,
      default() { return {} }
    }
  },
  data() {
    return {
      formModel: {},
      defaultForm: {}
    }
  },
  computed: {
    handelAttr() {

      if (!this.formSchema) return
      console.log('this.formSchema')
      this.formSchema.schema.map((item) => {
        this.formModel[item.fieId] = item.default
        this.defaultForm[item.fieId] = item.default
        if (item.rule) {
          const ruleItem = {
            type: item.ruleType || 'string',
            required: true,
            message: item.label + '不能为空',
            trigger: ['blur', 'change'],
          }
          if (this.formSchema.rules[item.fieId]) {
            this.formSchema.rules[item.fieId].push(ruleItem)
          } else {
            this.formSchema.rules[item.fieId] = [ruleItem]
          }

        }
      })

      const data = {
        ...this.$attrs,
        ...this.formSchema,
        model: this.formModel,
        labelWidth: this.formSchema.labelWidth || 'auto'
      }
      console.log('this.formSchema', data, this.formSchema, this.formModel)
      return data
    }
  },
  watch: {
  },
  created() { },
  onShow() {

  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    // this.$refs.schemaForm.setRules(this.formSchema.rules)
  },
  methods: {
    setValue(val, key) {
      this.formModel[key] = val
    },
    async validate() {
      console.log(this.formModel)
      await this.$refs.schemaForm.validate()
      return this.formModel
    },
    resetFields() {
      this.$refs.schemaForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss"></style>
