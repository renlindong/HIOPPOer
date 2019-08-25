<template>
	<view class="container">
		<view class="detail" :animation="detailAnimation">
			<view>回答问题</view>
			<view>{{ type }}{{ count }}</view>
		</view>
		<view class="coin" :animation="coinAnimation"></view>
		<view class="coin-box">
			<view class="coin-info">
				<view class="">已获得</view>
				<view class="coin-nums">
					<countup :num="num" color="#333" width='13' height='23' fontSize='23'></countup>
				</view>
				<view class="">枚个人O币</view>
			</view>
		</view>
		<view class="action">
			<view class="" @tap="goToAce">
				<view class=""></view>
				<view class="">最佳节目</view>
			</view>
			<view @tap="goToStore" class="">
				<view class=""></view>
				<view class="">奖品概览</view>
			</view>
			<view @tap="findBoss" class="">
				<view class=""></view>
				<view class="">谁是大Boss</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				num: 0,
				count: 5,
				coinAnimation: null,
				detailAnimation: null
			};
		},
		methods: {
			findBoss() {
				uni.showLoading({
					title: '加载中...'
				})
				wx.cloud.callFunction({
					name: 'findBoss'
				}).then(response => {
					console.log(response)
					uni.hideLoading()
					let { result } = response
					if(result && result.code === 200) {
						uni.navigateTo({
							url: `../boss/boss?json=${JSON.stringify(result.program)}`
						})
					} else {
						uni.showToast({
							title: '当前节目没有大Boss'
						})
					}
				})
			},
			goToStore() {
				uni.navigateTo({
					url: '../store/store'
				})
			},
			goToAce() {
				uni.navigateTo({
					url: '../vote/vote'
				})
			},
			startCartoon() {
				let _this = this
				let coinAni = uni.createAnimation({
					duration: 2000,
					timingFunction: 'ease'
				})
				let detailAni = uni.createAnimation({
					duration: 2000,
					timingFunction: 'ease'
				})
				coinAni.translateY(200).opacity(0).step()
				detailAni.translateY(-140).opacity(0).step()
				_this.coinAnimation = coinAni.export()
				_this.detailAnimation = detailAni.export()
			},
			init() {
				let ob = uni.getStorageSync('leftOb')
				this.num = ob - 0
			}
		},
		onLoad(query) {
			this.init()
			let { type, value } = query
			if(type && value) {
				value = value - 0
				if(type === '+') {
					this.num += value
				} else if(type === '-') {
					this.num -= value
				}
				this.type = type
				this.count = value
				this.startCartoon()
				uni.setStorageSync('leftOb', this.num)
			}
		},
		
		onUnload() {
			
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}
	.container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 180rpx 80rpx 120rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		justify-content: space-between;
		
		.detail {
			position: absolute;
			right: 100rpx;
			top: 200rpx;
			z-index: -100;
			> view:nth-child(1) {
				color: #F0AD4E;
			}
			> view:nth-child(2) {
				color: #F0AD4E;
			}
		}
		.coin {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #4CD964;
			position: absolute;
			top: -100rpx;
			left: 50%;
			margin-left: -40rpx;
			transition: all 1s ease;
		}
		.move-class {
			top: 200rpx;
		}
		.coin-box {
			.coin-info {
				height: 400rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #4CD964;
				.coin-nums {
					margin: 0 8rpx;
				}
			}
		}

		.action {
			display: flex;
			justify-content: space-between;

			>view {
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
				background-color: #C0C0C0;
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				padding: 40rpx 10rpx;
				box-sizing: border-box;
				font-size: $uni-font-size-base;
			}
		}
	}
</style>
