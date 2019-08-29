<template>
	<view class="container">
		<view class="header">
			排名 2/1000
		</view>
		<view class="content">
			<view class="content-item" v-for="(award, index) in awardList" :key="award.name">
				<view class="content-item-rank">{{ index + 1 }}</view>
				<view class="content-item-img"></view>
				<text class="content-item-name">{{ award.name }}</text>
				<view class="content-item-bar"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import users from '../../user.json'
	export default {
		data() {
			return {
				rank: 1,
				amount: 100,
				awardList: [
					{
						img: '',
						name: 'reno',
					},
					{
						img: '',
						name: '一把遮阳伞呀'
					},
					{
						img: '',
						name: '自拍神器'
					}
				]
			}
		},
		computed: {
			
		},
		onLoad() {
			console.log(users)
			this.init()
		},
		methods: {
			init() {
				let ob = uni.getStorageSync('leftOb')
				this.balance = ob
				
				wx.cloud.callFunction({
					name: 'checkRank'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 60rpx;
		.header {
			text-align: right;
			line-height: 50rpx;
		}
		.content {
			&-item {
				border-radius: 16rpx;
				height: 300rpx;
				background-color: #ccc;
				padding: 30rpx 0 30rpx 30rpx;
				margin-top: 59rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				
				&-img {
					border-radius: 16rpx;
					background-color: #fff;
					width: 350rpx;
					height: 100%;
				}
				&-name {
					flex: 1;
					text-align: center;
				}
				&-rank {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					text-align: center;
					color: red;
					background-color: blue;
					position: absolute;
					top: 0;
					left: 0;
					margin-left: -10rpx;
					margin-top: -10rpx;
				}
				&-bar {
					position: absolute;
					width: 40rpx;
					height: 60rpx;
					background-color: red;
					left: 50%;
					bottom: 0;
					margin-left: -20rpx;
					margin-bottom: -59rpx;
				}
			}
			&-item:last-child {
				.content-item-bar {
					display: none;
				}
			}
		}
	}
</style>
