<template>
	<view class="container">
		<view class="top3">
			<view class="pwrapper">
				<view class="circle">
					2
				</view>
				<view :class="'no2 '+classes[1]">
					<text>{{programs[1].title}}</text>
					<text>{{programs[1].votes}}票</text>
				</view>
			</view>
			<view class="pwrapper">
				<view class="circle">
					1
				</view>
				<view :class="'no1 '+classes[0]">
					<text>{{programs[0].title}}</text>
					<text>{{programs[0].votes}}票</text>
				</view>
			</view>
			<view class="pwrapper">
				<view class="circle">
					3
				</view>
				<view :class="'no3 '+classes[2]">
					<text>{{programs[2].title}}</text>
					<text>{{programs[2].votes}}票</text>
				</view>
			</view>
		</view>
		<view :class="'program ' + 'program'+index%2 + ' ' +classes[index+3]" v-for="(item,index) in leftProgs" :key="item._id">
			<text>{{index+4}}</text>
			<text class="title">{{item.title}}</text>
			<text>{{item.votes}}票</text>
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
				classes: []
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

<style lang="scss">
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 0.8em;
		font-weight: 500;
	}
	.top3 {
		height: 300upx;
		display: flex;
		
	}
	.pwrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}
	.circle {
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		position: relative;
		top: 50upx;
		background-color: #ececec;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.no2 {
		width: 0.28*750upx;
		height: 110upx;
		background-color: #d8d8d8;
		padding-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.no1 {
		width: 186upx;
		height: 160upx;
		background-color: #c2c2c2;
		padding-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.no3 {
		width: 0.28*750upx;
		height: 80upx;
		background-color: #d8d8d8;
		padding-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.program {
		width: 80%;
		height: 8%;
		display: flex;
		align-items: center;
		padding-left: 6upx;
		.title {
			margin-left: 6upx;
			flex-grow: 1;
		}
	}
	.program0 {
		background-color: #ececec;
	}
	.program1 {
		background-color: #d8d8d8;
	}
	.programMine {
		background-color: #00ff4b;
	}
</style>
