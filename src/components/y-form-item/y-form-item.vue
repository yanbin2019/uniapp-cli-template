<template>
	<u-form-item ref="schemaFormItem" v-bind="handelAttr" v-on="$listeners">
		<yFormItemComponent v-model="form[schemaItem.fieId]" :schemaItem="schemaItem" @update="handelInput">
		</yFormItemComponent>
	</u-form-item>
</template>

<script>
	import yFormItemComponent from './y-form-item-component'
	export default {
		name: 'yFormItem',
		components: {
			yFormItemComponent
		},
		props: {
			schemaItem: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				form: {}
			}
		},
		computed: {

			handelAttr() {
				const data = {
					...this.$attrs,
					...this.schemaItem,
					prop: this.schemaItem.fieId,
					label: this.schemaItem.label + '：'
				}
				// console.log('componentAttr', data, this.schemaItem)
				return data
			}
		},

		created() {},
		mounted() {},
		methods: {
			handelInput(event) {
				// console.log('event', event)
				this.$emit('setValue', event, this.schemaItem.fieId)
			},

		}
	}
</script>

<style scoped lang="scss"></style>
