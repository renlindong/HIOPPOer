<template>
	<view class="main">
		<view class="wrapper">
			<image :src="program.imgUrl" mode=""></image>
			<view class="program-title">
				{{program.title}}
			</view>
			<view class="program-disc">
				{{program.disc}}
			</view>
			<button @tap="onPick" >PICK</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				program: {}
			};
		},
		onLoad(query) {
			const db = wx.cloud.database()
			db.collection('programs').field({
				_id: true,
				title: true,
				programId: true,
				imgUrl: true,
				disc: true
			}).get().then(res => {
				let programs = res.data.filter(item => (item._id===query.id))
				this.program = programs[0]
				console.log(this.program)
			})
		},
		methods:{
			onPick(){
				uni.navigateTo({
					url:`/pages/vote/vote?id=${this.program._id}&from=pickDetail`
				})
			}
		}
	}
</script>

<style lang="scss">
.main {
	height: 80vh;
	padding: 6vh 60upx 60upx 60upx;
	display: flex;
	justify-content: center;
}
.wrapper {
	width: 80%;
	padding: 0upx 50upx;
	height: 100%;
	background-color: #f6f6f6;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	image {
		width: 450upx;
		height: 350upx;
		margin-top: 50upx;
	};
	button {
		position: absolute;
		right: 80upx;
		bottom: 50upx;
		height: 50upx;
		width: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dbfeeb;
		color: #15faa7;
		:after {
			border: 1upx solid #15faa7
		}
	}
}
.program-title {
	font-size: 0.9em;
	font-weight: 700;
	margin-top: 60upx;
	margin-bottom: 15upx;
}
.program-disc {
	font-size: 0.7em;
	font-weight: 400;
	width: 450upx;
	margin-bottom: 30upx;
	color: #636366;
	flex-grow: 1;
}
</style>
