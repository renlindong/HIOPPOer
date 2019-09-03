<template>
	<view>
		<image class="bgImg" :src="images.bg"></image>
		<view class="layer"></view>
		<view class="container">
			<view class="top3">
				<view class="pwrapper">
					<view :class="'no2 '+classes[1]">
						<text class="number">
							2
						</text>
						<text>{{programs[1].title}}</text>
						<view class='top3-votes'>
							<text class="number">{{programs[1].votes}}</text>
							<text>票</text>
						</view>
					</view>
				</view>
				<view class="pwrapper">
					<view :class="'no1 '+classes[0]">
						<text class="number">
							1
						</text>
						<text>{{programs[0].title}}</text>
						<view class='top3-votes'>
							<text class="number">{{programs[0].votes}}</text>
							<text>票</text>
						</view>
						</view>
				</view>
				<view class="pwrapper">
					<view :class="'no3 '+classes[2]">
						<text class="number">
							3
						</text>
						<text>{{programs[2].title}}</text>
						<view class='top3-votes'>
							<text class="number">{{programs[2].votes}}</text>
							<text>票</text>
						</view>
						</view>
				</view>
			</view>
			<view :class="'program ' + 'program'+index%2 + ' ' +classes[index+3]" v-for="(item,index) in leftProgs" :key="item._id">
				<text class="number">{{index+4}}</text>
				<text class="title">{{item.title}}</text>
				<text class="number">{{item.votes}}</text>
				<text>票</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				programs: [],
				leftProgs: [],
				voteProgram: "",
				classes: [],
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
				votes: true
			}).get().then(res => {
				let programs = res.data
				programs.sort((a, b) => (b.votes-a.votes))
				this.programs = programs
				this.leftProgs = programs.slice(3)
				this.classes = programs.map(item => {
					return item._id===query.id?"programMine":""
				})
			})
			this.voteProgram = query.id
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
	.layer {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -120;
		background-color: rgba($color: #000000, $alpha: 0.6);
	}
	.container {
		height: 100vh;
		width: 100vw;
		padding-top: 11.2vh;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 2vh;
		color: rgba(36,255,114,1)
	}
	.number {
		font-size: 5vw;
	}
	.top3 {
		height: 16vh;
		display: flex;
	}
	.top3-votes {
		display: flex;
		align-items: center;
	}
	.pwrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		> view {
			width: 26.7vw;
		}
	}
	.no2 {
		height: 10vh;
		background-color: rgba(36,255,114,0.32);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.no1 {
		height: 16vh;
		background-color: rgba(36,255,114,0.9);
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		justify-content: space-around;
	}
	.no3 {
		height: 13vh;
		background-color: rgba(36,255,114,0.7);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.program {
		box-sizing: border-box;
		width: 80vw;
		height: 8vh;
		display: flex;
		align-items: center;
		padding-left: 6.1vw;
		padding-right: 6.1vw;
		.title {
			margin-left: 6upx;
			flex-grow: 1;
		}
	}
	.program0 {
		background-color: rgba(36,255,114,0.4);
	}
	.program1 {
		background-color: rgba(36,255,114,0.35);
	}
	.programMine {
		box-sizing: border-box;
		border: 9upx solid rgba(36,255,114,1);
	}
</style>
