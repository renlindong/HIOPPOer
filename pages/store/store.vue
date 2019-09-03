<template>
	<view class="container">
		<image class="background-img" src="../../static/images/background.png" mode=""></image>
		<view class="content-wrap">
			<view class="rank-info">
				<text>排名：132</text>
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
					<view 
						:class="['award-list-item-img', index % 2 === 0 ? `award-list-item-img--even` : `award-list-item-img--odd`]"
						></view>
				</view>
				<view class="award-list-last-item"></view>
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
						img: '1',
					},
					{
						img: '2',
					},
					{
						img: '3',
					}
				],
				currentRank: 4
			}
		},
		computed: {
			awardListClass() {
				let base = 'award-list-item'
				return this.awardList.map((item, index) => {
					return [
						base,
						index % 2 === 0 ? `${base}--even` : `${base}--odd`,
						this.currentRank === index ? `${base}--active]` : ''
					]
				})
			}
		},
		onLoad() {
			wx.cloud.callFunction({
				name: 'checkRank',
				success: function (res) {
					console.log(res)
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
			z-index: -1;
		}
		
		.content-wrap {
			padding-top: 4.77vh;
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
				height: 83.52vh;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				&-item {
					width: 100%;
					flex: 1;
					margin-bottom: 2.38vh;
					background-color: #24FF72;
					position: relative;
					
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
						background-color: #333;
						color: #fff;
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
					background-color: #24FF72;
					opacity: 0.4;
				}
				
			}
		}
	}
</style>
