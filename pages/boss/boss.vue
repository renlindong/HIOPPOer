<template>
	<view class="container">
		<image class="background-img" src="../../static/images/background.png" mode=""></image>
		<image 
			class="help-btn" 
			src="../../static/images/icon-question.png"
			@click="showTips = true"></image>
		<view v-show="showTips" class="tips" key="content">
			<image 
				src="../../static/images/icon-close.png" 
				class="close-btn"
				@click="showTips = false"></image>
			<view class="tips-title">隐藏彩蛋</view>
			<text class="tips-text">{{ tips }}</text>
		</view>
		<view v-show="!showTips" class="program" key="content">
			<view class="program-info">
				<image class="program-info-img" :src="program.imgUrl"></image>
				<view class="program-info-title">
					<view class="program-info-title--label">节目：</view>
					<view class="program-info-title--text">{{ program.title }}</view>
				</view>
				<view class="program-info-tip">
					<view class="program-info-tip--label">提示：</view>
					<view class="program-info-tip--text">{{ program.boss.tips }}</view>
				</view>
			</view>
			<view class="program-answer">
				<textarea 
					class="program-answer--text" 
					v-model="answer"
					@focus="handleFocus"
					@blur="handleBlur"
					/>
			</view>
			<button @click="handleSubmit" class="submit-btn" type="primary" size="mini">提交</button>
		</view>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant-weapp/toast/toast.js'
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog'
	export default {
		data() {
			return {
				showTips: false,
				tips: `每章节都会有一两个节目内部有隐藏boss，主持人在介绍节目的时候将会告知大家本节目是否有boss。这个隐藏boss是表演者中的一员，玩家需要根据我们给出的字谜解出谁是隐藏boss并将答案发送至"欧币银行"。最先回答正确的50名玩家会获得欧币奖励。`,
				program: {},
				answer: '输入答案...',
				isAnswer: false
			};
		},
		onLoad() {
			let program = uni.getStorageSync('program')
			this.program = program
		},
		methods: {
			handleFocus() {
				if(this.answer === '输入答案...') {
					this.answer = ''
				}
			},
			handleBlur() {
				if(this.answer === '') {
					this.answer = '输入答案...'
				}
			},
			handleSubmit() {
				//
				let _this = this
				if(_this.answer === _this.program.boss.answer) {
					if(_this.isAnswer) {
						Toast({
							mask: true,
							duration: 1000,
							forbidClick: true,
							message: '已经回答过了~'
						})
					} else {
						Toast.loading({
							mask: true,
							duration: 0,
							forbidClick: true,
							message: '等待中...'
						})
						wx.cloud.callFunction({
							name: 'answerBoss',
							data: {
								_openid: uni.getStorageSync('openid'),
								_id: _this.program._id,
								programId: _this.program.programId,
								answer: _this.answer
							},
							success: function (res) {
								Toast.clear()
								let { result } = res
								console.log(result)
								if(result.code === 200) {
									uni.setStorageSync('currentBossId', _this.program.programId)
									_this.isAnswer = true
									Dialog.confirm({
										title: '恭喜你，回答正确！',
										message: `O币数量+${result.amount}`,
										showCancelButton: false
									}).then(() => {
										uni.reLaunch({
											url: '../home/home'
										})
									}).catch((error) => {
										console.log(error)
									})
								} else {
									Toast({
										mask: true,
										duration: 1000,
										forbidClick: true,
										message: result.message
									})
								}
							}
						})
					}
				} else {
					Toast({
						mask: true,
						duration: 1000,
						forbidClick: true,
						message: '很遗憾，回答错误~'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position: relative;
		padding: 13.37vh 10.64vw;
		
		.background-img {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
		
		.help-btn {
			width: 4.87vh;
			height: 4.87vh;
			position: absolute;
			top: 8.33vw;
			right: 8.33vw;
		}
		
		.tips {
			box-sizing: border-box;
			position: absolute;
			top: 7.21vh;
			left: 50%;
			z-index: 2;
			transform: translate(-50%, 0);
			width: 79.62vw;
			height: 80.22vh;
			color: rgb(36, 255, 114);
			background-color: rgba(36, 255, 114, 0.4);
			padding: 12.27vh 10vw 0;
			
			.close-btn {
				position: absolute;
				top: 1.94vh;
				right: 1.94vh;
				width: 4.8vw;
				height: 4.8vw;
			}
			
			&-title {
				text-align: center;
				font-size: 7.41vw;
			}
			
			&-text {
				display: block;
				font-size: 3.33vw;
				margin-top: 1.81vh;
				line-height: 3.82vh;
				text-indent: 6.66vw;
			}
		}
		
		.program {
			height: 100%;
			padding: 2.62vh 4.62vw 0;
			box-sizing: border-box;
			background-color: rgba(36, 255, 114, 0.4);
			
				
			&-info {
				padding: 2.38vh 4.62vw 4.87vh;
				background-color: rgba(36, 255, 114, 0.45);
				text-align: center;
				color: #24FF72;
				&-img {
					border: 8rpx solid #FFF;
					width: 100%;
					height: 20.2vh;
				}
				
				&-title {
					margin-top: 2.86vh;
					position: relative;
					display: flex;
					padding: 0 9.25vw;
					
					&--label {
						font-size: 3.7vw;
					}
					
					&--text {
						flex: 1;
						font-size: 3.33vw;
						position: relative;
					}
					
					&--text::after {
						content: "";
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 4rpx;
						background-color: rgba(36, 255, 114, 1);
					}
				}
				
				&-tip {
					margin-top: 2.86vh;
					position: relative;
					display: flex;
					padding: 0 9.25vw;
					
					&--label {
						font-size: 3.7vw;
					}
					
					&--text {
						flex: 1;
						font-size: 3.33vw;
						position: relative;
					}
					
					&--text::after {
						content: "";
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 4rpx;
						background-color: rgba(36, 255, 114, 1);
					}
				}
			}
			
			&-answer {
				height: 8.73vh;
				margin-top: 2.43vh;
			
				&--text {
					width: 100%;
					height: 100%;
					background-color: rgba(36, 255, 114, 0.45);
					color: rgba(36, 255, 114, 1);
					font-size: 3.33vw;
					padding: 1.28vh 4.81vw;
					box-sizing: border-box;
				}
			}
			
			.submit-btn {
				margin-top: 10rpx;
				float: right;
				color: #24FF72;
				background-color: rgba(36, 255, 114, 0.45);
				
				&:active::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(36, 255, 114, 0.55);
					z-index: -1;
				}
				
			}
		}
	}
	.error-info {
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
