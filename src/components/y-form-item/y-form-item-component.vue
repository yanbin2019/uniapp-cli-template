<template>
	<component :is="getComponent" v-bind="componentAttr" :key="schemaItem.fieId" :value="value" @input="handelInput"
		@update="handelInput"></component>
</template>

<script>
	import Textarea from '@/components/y-textarea/y-textarea.vue'
	import Input from "@/components/y-input/y-input.vue";
	import Select from '@/components/y-select/y-select.vue'
	import ImgUpload from '@/components/y-img-upload/y-img-upload.vue'
	import Datetime from '@/components/y-datetime/y-datetime.vue'
	export default {
		name: '',
		components: {
			Input,
			Textarea,
			Select,
			ImgUpload,
			Datetime
		},
		model: {
			mode: 'value',
			event: 'update'
		},
		props: {
			value: {
				type: [String, Number, Boolean, Object, Array]
			},
			schemaItem: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				componentMap: {
					Input: '请输入',
					Textarea: '请输入',
					Select: '请选择',
					ImgUpload: '',
					Datetime: '请选择'
				}
			}
		},
		computed: {
			componentAttr() {
				let placeholder = ''
				for (const key in this.componentMap) {
					if (this.schemaItem.component === key) {
						placeholder = this.componentMap[key] + this.schemaItem.label
					}
				}
				const data = {
					...this.$attrs,
					placeholder,
					...this.schemaItem.componentProps
				}

				return data
			},
			getComponent() {
				for (const key in this.componentMap) {
					// console.log(key, this.componentMap[key])
					if (this.schemaItem.component === key) {
						return key
					}
				}
				return ''
			}
		},
		// watch: {
		// 	value: {
		// 		handler(newVal) {
		// 			console.log('newVal', newVal)
		// 		}
		// 	}
		// },
		created() {},
		mounted() {},
		methods: {
			handelInput(event) {
				console.log('event', event)
				this.$emit('update', event)
			},

		}
	}
</script>

<style scoped lang="scss"></style>
