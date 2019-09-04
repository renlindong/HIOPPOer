<template>
	<view>
		<image class="bgImg" :src="images.bg"></image>
		<view class="layer"></view>
		<view class="container">
			<view class="cards">
				<view class="card" v-for="(item,index) in programs" :key="item.programId">
					<image @tap="openCard" :src="item.imgUrl" mode="" alt="item.title" :data-id="item._id"></image>
					<text>{{item.title}}</text>
					<view class="btn-vote" @tap="onpick" :data-id="item._id">投票</view>
				</view>
			</view>
			<van-dialog @confirm="onVote" id="van-dialog" />
			<van-toast id="van-toast"/>
		</view>
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog';
	import Toast from '../../wxcomponents/vant-weapp/toast/toast';
	export default {
		data() {
			return {
				programs: [],
				voteProgram: '',
				images: {
					bg: '../../static/images/background.png',
				},
			};
		},
		
		onLoad(query) {
			const voteProgram = uni.getStorageSync('voteProgram');
			if(voteProgram){
				uni.redirectTo({
					url: `/pages/ace/ace?id=${voteProgram}`
				})
			}
			this.programs = uni.getStorageSync('programs');
			if(query.from==="pickDetail"){
				this.voteProgram = query.id
				const { klass } = JSON.parse(uni.getStorageSync('oppoer'))
				Dialog.confirm({
					message: `${klass==='欧爸'?'欧爸有50票，一旦投票无法更改':'每人仅有一票且无法更改'}，您确定要投票吗？`,
					cancelButtonText: '再想想'
				})
			}
		},
		
		methods: {
			onpick(e){
				console.log('toupiao...')
				const { klass } = JSON.parse(uni.getStorageSync('oppoer'))
				Dialog.confirm({
					message: `${klass==='欧爸'?'欧爸有50票，一旦投票无法更改':'每人仅有一票且无法更改'}，您确定要投票吗？`,
					cancelButtonText: '再想想'
				})
				const id = e.currentTarget.dataset.id
				this.voteProgram = id
				console.log(id);
				
			},
			openCard(e){
				const id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: `/pages/pickDetail/pickDetail?id=${id}`,
				});
			},
			async onVote(e) {
				Toast.loading({
					mask: true,
					duration: 0,
					forbidClick: true,
					message: '等待中...'
				})
				const { klass } = JSON.parse(uni.getStorageSync('oppoer'))
				const stopVote = (await this.getFlags()).data.stopVote;
				if(stopVote) {
					uni.setStorage({
						key: 'voteProgram',
						data: this.voteProgram
					});
					uni.redirectTo({
						url: `/pages/ace/ace?id=${this.voteProgram}`
					})
				} else {
					wx.cloud.callFunction({
						name: 'vote',
						data: {
							klass,
							_id: this.voteProgram
						}
					}).then(res => {
						// 标志变量 voted 存本地
						uni.setStorage({
							key: 'voteProgram',
							data: this.voteProgram
						});
						uni.redirectTo({
							url: `/pages/ace/ace?id=${this.voteProgram}`
						})
					})
				}
			},
			
			//拿到标志变量
			getFlags() {
				const db = wx.cloud.database();
				return db.collection('flags').doc('8a2bdccf-2e39-4322-862d-291a68c84636').get();
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
	.layer {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -120;
		background-color: rgba($color: #000000, $alpha: 0.6);
	}
	.cards{
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		padding-top: 6.3vh;
	}
	.card{
		width: 34.5vw;
		height: 21.6vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 10vw;
		margin-bottom: 3.3vh;
		padding-top: 1.8vh;
		background: rgba(36,255,114,0.40);
		image {
			width: 27.9vw;
			height: 10.5vh;
			margin-bottom: 1.65vh;
		};
		text {
			font-size: 1.8vh;
			color: #24FF72;
		};
		.btn-vote {
			width: 18.33vw;
			height: 3.5vh;
			line-height: 3.5vh;
			background-color: rgba($color: #24FF72, $alpha: .4);
			color: rgba($color: #24FF72, $alpha: 1);
			margin-top: 1.35vh;
			text-align: center;
			font-size: 1.8vh;
		};
	}
</style>
