<template>
	<view class="container" v-if="!loading">
		<text class="title">我的战绩</text>
		<view class="record" v-for="(item, index) in records" :key="item._id">
			<view>{{ item.title }}*{{ item.amount }}</view>
			<view>{{ item.amount * item.price }}</view>
		</view>
		<view class="tips">总计{{ total }}枚O币</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				records: [{
						_id: 2,
						itemId: "2",
						title: "A9",
						imgUrl: 'xxx',
						store: 10,
						price: 1,
						amount: 6
					},
					{
						_id: 3,
						itemId: "3",
						title: "Find X",
						imgUrl: 'xxx',
						store: 10,
						price: 5,
						amount: 7
					},
				]
			}
		},
		computed: {
			total() {
				return this.records.reduce((initVal, record) => {
					return initVal + record.amount * record.price
				}, 0)
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #fff;
		padding: 80rpx 80rpx 160rpx 80rpx;
		box-sizing: border-box;
		.container {
			height: 100%;
			box-sizing: border-box;
			background-color: #ccc;
			padding: 120rpx 60rpx 0 60rpx;
			position: relative;
			.title {
				display: block;
				text-align: center;
				font-size: 50rpx;
			}
			.record {
				display: flex;
				justify-content: space-between;
				line-height: 80rpx;
			}
			.tips {
				width: 100%;
				color: gray;
				text-align: center;
				position: absolute;
				bottom: 80rpx;
				left: 0;
			}
		}
	}
</style>
