<template>
	<view class="container">
		<image class="background-img" src="../../static/images/background.png" ></image>
		<image @click="showTips = true" class="tips-icon" src="cloud://test-aed77.7465-test-aed77-1259785462/assets/icon-question.png" mode=""></image>
		<image class="coin" src="../../static/images/icon-coin.png" :animation="coinAnimation"></image>
		<view class="coin-box">
			<image class="icon-pig" src="../../static/images/icon-pig.png" mode=""></image>
			<view class="coin-info">
				<text class="coin-info-title">您已获得</text>
				<view class="coin-nums">
					<countup :num="num" color="#24FF72" width='7.7vw' height='8.02vh' fontSize='12.96vw'></countup>
					<view class="coin-nums--text">枚O币</view>
				</view>
			</view>
		</view>
		<view class="action">
			<view class="action-item">
				<image
					:class="programTouched ? 'active' : ''"
					@touchstart="handleTouchStart('program')"
					@touchend="handleTouchEnd('program')"
					src="../../static/images/icon-best-program.png" mode=""></image>
			</view>
			<view class="action-item">
				<image
					:class="awardTouched ? 'active' : ''"
					@touchstart="handleTouchStart('award')"
					@touchend="handleTouchEnd('award')"
					@click="goToStore"
					src="../../static/images/icon-award.png" mode=""></image>
			</view>
			<view class="action-item">
				<image
					:class="bossTouched ? 'active' : ''"
					@touchstart="handleTouchStart('boss')"
					@touchend="handleTouchEnd('boss')"
					@click="findBoss"
					src="../../static/images/icon-best-program.png" mode=""></image>
			</view>
		</view>
		<view v-show="showTips" class="tips-wrap">
			<view class="tips">
				<image @click="showTips = false" class="close-icon" src="../../static/images/icon-close.png" mode=""></image>
				<view class="tips-title">O币大作战</view>
				<text class="tips-text">{{ tips[0] }}</text>
				<text class="tips-text">{{ tips[1] }}</text>
			</view>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant-weapp/toast/toast.js';
	export default {
		data() {
			return {
				showTips: false,
				tips: [
					`玩家积极参与晚会将有机会获得个人O币或阵营O币，用于在商城中兑换礼品。部分节目中会有神秘boss出现，点击"隐藏彩蛋"猜中神秘boss的真实身份也有机会获得O币。`,
					`本晚会将通过公投的形式选出"最佳节目Top 3"，每位玩家仅有一票，记得在结果出来前投票哦~`
				],
				num: 0,
				coinAnimation: null,
				detailAnimation: null,
				programTouched: false,
				awardTouched: false,
				bossTouched: false
			};
		},
		methods: {
			findBoss() {
				Toast.loading({
					mask: true,
					duration: 0,
					message: '加载中...'
				})
				wx.cloud.callFunction({
					name: 'findBoss'
				}).then(response => {
					Toast.clear()
					let { result } = response
					if(result && result.code === 200) {
						let currentId = uni.getStorageSync('currentBossId')
						if(currentId != result.program.programId) {
							uni.setStorageSync('program', result.program)
							uni.navigateTo({
								url: `../boss/boss`
							})
						} else {
							Toast({
								mask: true,
								duration: 1000,
								forbidClick: true,
								message: '对不起，您已经回答过了~'
							})
						}
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
				coinAni.translateY(350).opacity(0).step()
				detailAni.translateY(-140).opacity(0).step()
				_this.coinAnimation = coinAni.export()
				_this.detailAnimation = detailAni.export()
			},
			init() {
				let ob = uni.getStorageSync('leftOb')
				this.num = ob - 0
			},
			handleTouchStart(name) {
				this[`${name}Touched`] = true
			},
			handleTouchEnd(name) {
				this[`${name}Touched`] = false
			}
		
		},
		onLoad(query) {
			
		},
		
		onShow() {
			let _this = this
			wx.cloud.callFunction({
				name: 'getObInfo',
				success: function (res) {
					let { result } = res
					if (result.code == 200) {
						let ob = uni.getStorageSync('leftOb')
						console.log(result.code)
						if (ob != result.ob) {
							_this.startCartoon()
							_this.num = result.ob
							uni.setStorageSync('leftOb', result.ob)
						} else {
							_this.num = ob
						}
					} 
				},
				fail: function (error) {
					console.log(error)
				}
			})
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
		padding-bottom: 15.99vh;
		box-sizing: border-box;
		position: relative;
		
		.background-img {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
		
		.tips-icon {
			position: absolute;
			width: 9.25vw;
			height: 9.25vw;
			top: 8.33vw;
			right: 8.33vw;
			border-radius: 50%;
		}
		.tips-wrap {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000000, $alpha: 0.5);
			.tips {
				position: relative;
				top: 7.2vh;
				left: 50%;
				transform: translate(-50%, 0);
				width: 79.62vw;
				height: 80.56vh;
				box-sizing: border-box;
				padding: 12.27vh 10vw 0;
				color: rgb(36, 255, 114);
				background-color: rgba(36, 255, 114, 0.4);
				z-index: 999;
				
				.close-icon {
					position: absolute;
					width: 8.05vw;
					height: 8.05vw;
					top: 3.7vw;
					right: 3.7vw;
				}
				&-title {
					text-align: center;
					font-size: 7.4vw;
				}
				
				&-text {
					display: block;
					text-indent: 6.66vw;
					font-size: 3.33vw;
				}
				
				&-text:nth-child(1) {
					margin-top: 30rpx;
				}
			}
			
		}
	
		.coin {
			width: 23.79vw;
			height: 23.79vw;
			border-radius: 50%;
			position: absolute;
			top: -300rpx;
			left: 50%;
			margin-left: -40rpx;
			transition: all 1s ease;
		}
		.coin-box {
			box-sizing: border-box;
			width: 86.5vw;
			height: 39.54vh;
			position: relative;
			top: 21.98vh;
			left: 7.5vw;
			.icon-pig {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
			}
			.coin-info {
				position: absolute;
				width: 100%;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				color: #24FF72;
				&-title {
					font-size: 4.62vw;
					opacity: 0.7;
				}
				
				.coin-nums {
					display: flex;
					align-content: center;
					justify-content: center;
					
					&--text {
						font-size: 12.96vw;
						line-height: 12.96vw;
					}
					
				}
			}
		}

		.action {
			position: absolute;
			bottom: 15.99vh;
			box-sizing: border-box;
			width: 100%;
			padding: 0 11.2vw;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&-item {
				width: 21.92vw;
				height: 21.92vw;
				display: flex;
				justify-content: center;
				align-items: center;
				> image {						
					width: 20.92vw;
					height: 20.92vw;
					border-radius: 50%;
					transition: all 66ms;
				}
			}
			.active {
				width: 22.92vw;
				height: 22.92vw;
			}
		}
	}
</style>
