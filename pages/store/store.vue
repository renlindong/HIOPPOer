<template>
	<view class="container">
		<image class="background-img" src="../../static/images/background.png" mode=""></image>
		<view class="layer"></view>
		<view class="content-wrap">
			<view class="rank-info">
				<text>排名：{{ rank }}</text>
				<text>/1232</text>
			</view>
			<view class="award-list">
				<view 
					:class="[awardListClass[index]]"
					v-for="(award, index) in awardList"
					:key="award.img">
					<view 
						:class="['award-list-item-rank', index % 2 === 0 ? `award-list-item-rank--even` : `award-list-item-rank--odd`]"
						>{{ index + 1 }}</view>
					<image 
						:class="['award-list-item-img', index % 2 === 0 ? `award-list-item-img--even` : `award-list-item-img--odd`]"
						:src="award.img"
						></image>
				</view>
				<view 
					:class="[
						'award-list-last-item',
						currentRank === 4 ? `award-list-last-item--active` : ``
					]"
					>再接再厉哦！</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				awardList: [
					{
						img: '../../static/images/one.png',
					},
					{
						img: '../../static/images/two.png',
					},
					{
						img: '../../static/images/three.png',
					}
				],
				rank: 0
			}
		},
		computed: {
			awardListClass() {
				let base = 'award-list-item'
				return this.awardList.map((item, index) => {
					return [
						base,
						index % 2 === 0 ? `${base}--even` : `${base}--odd`,
						this.currentRank === index + 1 ? `${base}--active]` : ''
					]
				})
			},
			currentRank() {
				if(this.rank > 0) {
					if(this.rank <= 30) {
						return 1
					} else if(this.rank <= 100) {
						return 2
					} else if(this.rank <= 300) {
						return 3
					}
				}
				return 4
			}
		},
		onLoad() {
			let _this = this
			wx.cloud.callFunction({
				name: 'checkRank',
				success: function (res) {
					if (res.result.rank === 0) {
						_this.rank = Math.floor(Math.random() * (1232 - 300) ) + 300
					} else {
						_this.rank = res.result.rank
					}
				},
				fail: function (res) {
					console.log(res)
				}
			})
		},
		methods: {
			init() {
				
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		.background-img {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -123;
		}
		.layer {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: -120;
			background-color: rgba($color: #000000, $alpha: 0.6);
		}
		.content-wrap {
			padding-top: 4.77vh;
			background-color: rgba(0, 0, 0, 0.5);
			.rank-info {
				margin-right: 4.77vh;
				text-align: right;
				& > text:nth-child(1) {
					color: #24FF72;
				}
				
				& > text:nth-child(2) {
					color: #3A8655;
				}
			}
			
			.award-list {
				padding: 3.82vh 9.72vw 0;
				&-item {
					width: 100%;
					height: 21.16vh;
					flex: 1;
					margin-bottom: 2.38vh;
					background-color: rgba(36, 255, 114, 0.2);
					position: relative;
					transition: all 0.2s;
					color: rgba(36, 255, 114, 0.6);
					
					&--active {
						background-color: rgba(36, 255, 114, 0.6);
						color: rgba(36, 255, 114, 1);
						
						.award-list-item--even {
							background-color: rgba(36, 255, 114, 0.4);
						}
					}
					
					&--even {
						border-top-left-radius: 4.12vh;
					}
					
					&--odd {
						border-top-right-radius: 4.12vh;
					}
					
					&-rank {
						position: absolute;
						top: 0;
						width: 8.24vh;
						height: 8.24vh;
						border-radius: 50%;
						background-color: rgba(26, 255, 114, 0.3);
						text-align: center;
						line-height: 8.24vh;
						&--even {
							left: 0;
						}
						
						&--odd {
							right: 0;
						}
					}
					
					&-img {
						position: absolute;
						top: 50%;
						transform: translate(0, -50%);
						background-color: #333333;
						width: 39.16vw;
						height: 14.94vh;
						
						&--even {
							right: 5.55vw;
						}
						
						&--odd {
							left: 5.55vw;
						}
					}
				}
				
				&-last-item {
					width: 100%;
					height: 14.32vh;
					background-color: rgba(36, 255, 114, 0.3);
					transition: all 0.2s;
					display: flex;
					align-items: center;
					justify-content: center;
					color: rgba(36, 255, 114, 1);
					
					
					&--active {
						background-color: rgba(36, 255, 114, 0.6);
					}
					
				}
				
			}
		}
	}
</style>
