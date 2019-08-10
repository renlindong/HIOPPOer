<template>
	<view class="">
		<view class="fixed-top">
			<view>
				<view class="error-info">O币数量不足!</view>
				<view class="coin-info">
					您拥有
					<view class="icon"></view>
					<text>{{ balance }}</text>
				</view>
			</view>
		</view>
		<view class="main">
			<view v-for="(item, index) in commodityList" :key="item._id" class="commodity-wrap">
				<view class="commodity">
					<view class="img"></view>
					<view class="content">
						<view class="price">
							<view class="coin"></view>
							<text>{{ item.price }}</text>
						</view>
						<view class="action">
							<view class="icon" @click="handleComputed('-', index)"></view>
							<input class="nums" v-model="item.amount"></input>
							<view class="icon" @click="handleComputed('+', index)"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="fixed-bottom">
			<view>
				<button @click="submit">确认购物</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: 5,
				commodityList: [{
						_id: 1,
						itemId: "1",
						title: "Reno",
						imgUrl: 'xxx',
						store: 10,
						price: 3,
						amount: 0
					},
					{
						_id: 2,
						itemId: "2",
						title: "A9",
						imgUrl: 'xxx',
						store: 10,
						price: 1,
						amount: 0
					},
					{
						_id: 3,
						itemId: "3",
						title: "Find X",
						imgUrl: 'xxx',
						store: 10,
						price: 5,
						amount: 0
					},
					{
						_id: 4,
						itemId: "4",
						title: "Reno Z",
						imgUrl: 'xxx',
						store: 10,
						price: 2,
						amount: 0
					},
					{
						_id: 5,
						itemId: "4",
						title: "Reno Z",
						imgUrl: 'xxx',
						store: 10,
						price: 2,
						amount: 0
					},
					{
						_id: 6,
						itemId: "4",
						title: "Reno Z",
						imgUrl: 'xxx',
						store: 10,
						price: 2,
						amount: 0
					},
					{
						_id: 7,
						itemId: "4",
						title: "Reno Z",
						imgUrl: 'xxx',
						store: 10,
						price: 2,
						amount: 0
					}
				]
			};
		},
		computed: {
			purchaseList() {
				return this.commodityList.filter((item) => {
					return item.amount > 0
				})
			}
		},
		methods: {
			handleComputed(type, index) {
				let {
					commodityList
				} = this
				if (type === '-') {
					if (commodityList[index].amount === 0) {
						return
					}
					commodityList[index].amount--
				} else {
					commodityList[index].amount++
				}
			},
			submit() {
				console.log(this.purchaseList)
				//
				let total = this.purchaseList.reduce((initVal, commodity) => {
					return initVal + commodity.amount * commodity.price
				}, 0)
				console.log(total)
				if (total > this.balance) {
					uni.showToast({
						title: '余额不足',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: '../record/record'
				})
			}
		}
	}
</script>

<style lang="scss">
	.fixed-top {
		width: 100%;
		position: fixed;
		top: 0;
		background-color: #fff;
		z-index: 999;
		box-shadow: 5rpx 6rpx 20rpx #ccc;

		>view {
			display: flex;
			justify-content: flex-end;
			line-height: 50rpx;
			box-sizing: border-box;
			padding: 10rpx 8rpx;
			margin-right: 30rpx;

			.error-info {
				color: red;
			}

			.coin-info {
				display: flex;
				align-items: center;

				.icon {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					background-color: greenyellow;
					margin: 0 12rpx;
				}
			}
		}
	}

	.main {
		margin: 80rpx 0;
		padding: 0 40rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.commodity-wrap {
			width: 48%;
			margin-top: 30rpx;

			.commodity {
				width: 100%;
				box-sizing: border-box;
				background-color: #fff;
				padding: 24rpx 18rpx 30rpx;
				border-radius: 5rpx;
				box-shadow: 5rpx 6rpx 20rpx #ccc;

				.img {
					border-radius: 5px;
					height: 300rpx;
					background-color: #ccc;
				}

				.content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;

					.price {
						display: flex;
						align-items: center;

						>text {
							margin-left: 10rpx;
						}

						.coin {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							background-color: greenyellow;
						}
					}

					.action {
						display: flex;
						align-items: center;

						.icon {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							background-color: #ccc;
						}

						.nums {
							border: 1px solid #ccc;
							width: 50rpx;
							text-align: center;
							margin: 0 8rpx;
						}
					}
				}
			}
		}
	}

	.fixed-bottom {
		position: fixed;
		bottom: 20rpx;
		width: 100%;
		z-index: 999;
		button {
			width: 80%;
			margin: 0 auto;
			background-color: #1dd8df;
			color: #fff;
		}
	}
</style>
