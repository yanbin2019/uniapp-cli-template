<template>
	<view class="app-container">
		<view>
			<u-empty mode="page" width="300" height="300" icon="http://cdn.uviewui.com/uview/empty/page.png">
			</u-empty>
			<u-button @tap="handleTap" type="primary" shape="circle" style="margin-top: 50rpx" text="回到首页"></u-button>
		</view>
	</view>
</template>
<script>
	export default {

		data() {
			return {}
		},
		async created() {},
		methods: {
			handleTap() {
				uni.reLaunch({
					url: '/pages/home/index'
				})
			}
		}
	}
</script>
<style lang='scss' scoped>
	.app-container {
		flex: 1;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
