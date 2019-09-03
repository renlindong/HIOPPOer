<template>
	<view>
		<image class="bgImg" :src="images.bg"></image>
		<view class="main">
			<view class="wrapper">
				<image :src="program.imgUrl" mode=""></image>
				<view class="program-title">
					{{program.title}}:
				</view>
				<view class="program-disc">
					{{program.disc}}
				</view>
				<button @tap="onPick" >投票</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				program: {},
				images: {
					bg: '../../static/background.png',
				}
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

<style scoped lang="scss">
.bgImg {
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: -123;
}
.main {
	height: 100vh;
	width: 100vw;
	padding: 13.4vh 10.2vw 23.4vh 10.2vw;
	box-sizing: border-box;
}
.wrapper {
	width: 100%;
	height: 100%;
	padding-top: 4.3vh;
	padding-left: 11.9vw;
	box-sizing: border-box;
	background-color: rgba(36,255,114,0.4);
	display: flex;
	flex-direction: column;
	position: relative;
	image {
		width: 53.9vw;
		height: 15.6vh;
		margin-bottom: 3.2vh;
	};
	button {
		position: absolute;
		right: 12.3vw;
		bottom: 8vh;
		height: 3.5vh;
		width: 14.4vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(36,255,114,0.4);
		color: rgba(36,255,114,1);
		border-radius: 2upx;
		font-size: 1.8vh;
	}
}
.program-title {
	font-size: 1.9vh;
	color: rgba(36,255,114,1);
	margin-bottom: 1.2vh;
}
.program-disc {
	font-size: 1.7vh;
	width: 53.9vw;
	color: rgba(36,255,114,.8);
	letter-spacing: 0;
	text-align: justify;
	line-height: 2em;
}
</style>
