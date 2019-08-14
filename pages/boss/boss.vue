<template>
	<view class="container">
		<view @click="showExplain = true" class="question"></view>
		<view v-if="!showExplain" class="content">
			<view class="program">
				<view class="img">
				</view>
				<view>节目：{{ program.title }}</view>
				<view>提示：{{ program.boss.tips }}</view>
			</view>
			<view class="rail"></view>
			<view class="form">
				<input type="text" value="请输入答案" v-model="answer"/>
				<button type="primary" @tap="handleSubmit">提交</button>
			</view>
		</view>
		<view v-if="showExplain" class="detail">
			<view>
				<icon @click="showExplain = false" type="clear" size="26"></icon>
			</view>
			<view class="">
				<view class="title">
					谁是大boss
				</view>
				<view class="info">
					每章节都会有一两个节目内部有隐藏boss
					电视剧啊垃圾袋乱搭乱建来得及萨拉大家
					到家啦时间到了睡觉啊的撒经理对的撒
					的撒路口就到了撒娇对的撒来得及拉萨
					电视剧啊垃圾袋几点了撒娇都是垃圾到了
					DJ阿里几点啦都到教室啦建档立卡
					 到拉萨就到了叫撒聊的逻辑啊睡懒觉到啦
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showExplain: false,
				program: {
				},
				answer: '',
				isAnswer: false
			};
		},
		onLoad(query) {
			let program = JSON.parse(query.json)
			this.program = program
		},
		methods: {
			handleSubmit() {
				if(this.answer === this.program.boss.answer) {
					uni.showModal({
						title: '恭喜你，回答正确!',
						content: 'O币数量+3',
						success: function(res) {
							if(res.confirm) {
								wx.redirectTo({
									url: `../home/home?type=+&value=${3}`
								})
							}
						}
					})
				}
			}
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
		padding: 100rpx 60rpx;
		box-sizing: border-box;
		position: relative;
		
		.question {
			position: absolute;
			z-index: 888;
			top: 10rpx;
			right: 40rpx;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-color: #007AFF;
		}
		.content {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			background-color: #C0C0C0;
			border-top-left-radius: $uni-border-radius-lg;
			border-top-right-radius: $uni-border-radius-lg;
			border-bottom-left-radius: $uni-border-radius-lg;
			border-bottom-right-radius: 100rpx;
			padding: 50rpx 30rpx 20rpx;
			.program {
				background-color: #fff;
				box-sizing: border-box;
				padding: 16rpx 24rpx 20rpx;
				border-bottom-right-radius: 100rpx;
				.img {
					width: 100%;
					height: 360rpx;
					background-color: #ccc;
				}
			}
			.rail {
				margin-top: 20rpx;
				background-color: #fff;
				border-radius: 6rpx;
				height: 10rpx;
			}
			.form {
				display: flex;
				align-items: center;
				>input {
					background-color: #fff;
					border-radius: 10rpx;
				}
			}
		}
	}
	
	.detail {
		position: fixed;
		top: 30rpx;
		left: 10%;
		background-color: #333333;
		z-index: 999;
		width: 80%;
		height: 80%;
		color: #fff;
		>view:nth-child(2) {
				padding: 10rpx 40rpx;
				.title {
					font-size: $uni-font-size-lg;
					line-height: 100rpx;
					text-align: center;
				}
				.info {
					font-size: $uni-font-size-base;
					text-indent: 2 * $uni-font-size-base;
				}
		}
	}
	
</style>
