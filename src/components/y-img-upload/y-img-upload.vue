<template>
	<view class='upload'>
		<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" previewFullImage width="50"
			height="50">
			<view class="select">
				<u-icon name="plus"></u-icon>
			</view>
		</u-upload>
	</view>
</template>
<script>
	import {
		getToken
	} from '@/utils/auth';
	import {
		toast
	} from '@/utils/common';
	import {
		baseUrl,
		baseApi
	}
	from '@/config.js';
	export default {
		model: {
			prop: 'value',
			event: 'update'
		},
		props: {
			value: {
				type: [Array],
				default () {
					return []
				}
			}
		},
		data() {
			return {
				fileList: []
			}
		},
		async created() {},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.setValue()
			},
			// 新增图片
			async afterRead(event) {
				console.log('event', event)
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})

				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}

				this.setValue()
			},
			uploadFilePromise(url) {
				console.log('url', url)
				// #ifdef H5
				const requestBaseUrl = baseApi
				// #endif

				// #ifndef H5
				const requestBaseUrl = baseUrl
				// #endif
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: `${requestBaseUrl}/customer/cos/upload`, // 仅为示例，非真实的接口地址
						filePath: url,
						header: {
							Authorization: 'Bearer ' + getToken(),
							Terminal: 'Customer'
						},
						name: 'file',
						success: (res) => {
							console.log(res)
							const {
								data
							} = JSON.parse(res.data)
							resolve(data)
						},
						complete: (res) => {
							const {
								msg
							} = JSON.parse(res.data)
							toast(msg)
						}
					});
				})
			},
			setValue() {
				console.log(this.fileList)
				const files = this.fileList.map((item) => {
					return item.url
				})
				this.$emit('update', files)
			}

		}
	}
</script>
<style lang='scss' scoped>
	.select {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
		border: 1rpx solid rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
