<template>
	<view class="we-chat">
		<view class="text">
			<view class="checkbox" @tap="handleChange">
				<u-icon v-if="value" name="checkmark-circle-fill" color="#003BAFFF" size="17"></u-icon>
				<view v-else class="circle"></view>
			</view>

			<view class="text-item">
				<text>已阅读并同意</text>
				<text class="line" @tap="toAgreement(1)">用户协议</text>
				<text class="line" @tap="toAgreement(2)">隐私政策</text>
			</view>
		</view>
		<view class="bottom">
			<view class="wire">
				<i></i>
				<text>其他方式登录</text>
				<i></i>
			</view>
			<view class="weixin">
				<image :src="weixinPng"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import weixinPng from "@/pages/whiteList/image/weixin.png";
	export default {
		model: {
			prop: "value",
			event: "update",
		},
		props: {
			value: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				weixinPng,
			};
		},
		async created() {},
		methods: {
			toAgreement(status) {
				this.$Router.push({
					name: "agreement",
					params: {
						status
					}
				});
			},
			handleChange() {
				const v = !this.value;
				this.$emit("update", v);
			},
		},
	};
</script>
<style lang="scss" scoped>
	.we-chat {
		width: calc(100% - 150rpx);
	}

	.text {
		display: flex;
		align-items: center;

		.text-item {
			display: flex;

			text {
				font-size: 26rpx;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.8);
				line-height: 30rpx;
			}

			.line {
				color: #003baf;
				padding: 0 10rpx;
			}
		}
	}

	.bottom {
		margin-top: 78rpx;

		.wire {
			display: flex;
			align-items: center;
			background-color: #fff;

			i {
				flex: 1;
				height: 1rpx;
				background: rgba(0, 0, 0, 0.1);
			}

			text {
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.3);
				line-height: 30rpx;
				padding: 0 20rpx;
			}
		}

		.weixin {
			display: flex;
			justify-content: center;
			margin-top: 43rpx;

			image {
				width: 70rpx;
				height: 70rpx;
			}
		}
	}

	.checkbox {
		margin-right: 20rpx;

		.circle {
			width: 30rpx;
			height: 30rpx;
			border: 2rpx solid #00000033;
			border-radius: 50%;
		}
	}
</style>
