<template>
	<view class="container">
		<view class="cards">
			<view class="card" v-for="(item,index) in programs" :key="index">
				<image @tap="openCard" :src="item.imgUrl" mode="" alt="item.title" :data-id="item._id"></image>
				<text>{{item.title}}</text>
				<button @tap="onpick" :data-id="item._id">PICK</button>
			</view>
		</view>
		<van-dialog @confirm="onVote" id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog'
	export default {
		data() {
			return {
				programs: [],
				voteProgram: ''
			};
		},
		
		onLoad(query) {
			// this.programs = JSON.parse(uni.getStorageSync('programs'))
			const db = wx.cloud.database()
			db.collection('programs').field({
				_id: true,
				title: true,
				programId: true,
				imgUrl: true,
			}).get().then(res => {
				this.programs = res.data
				if(query.from==="pickDetail"){
					this.voteProgram = query.id
					Dialog.confirm({
						message: "每人仅有一票且无法更改，您确定要投票吗？",
						cancelButtonText: '再想想'
					})
				}
			})
		},
		
		methods: {
			onpick(e){
				Dialog.confirm({
					message: "每人仅有一票且无法更改，您确定要投票吗？",
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
			onVote(e) {
				// console.log("onvote: ", this.voteProgram)
				wx.cloud.callFunction({
					name: 'vote',
					data: {
						_id: this.voteProgram
					}
				})
				uni.navigateTo({
					url: `/pages/ace/ace?id=${this.voteProgram}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.cards{
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		padding-top: 20upx;
	}
	.card{
		width: 40%;
		height: 380upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 7%;
		margin-top: 30upx;
		padding-top: 30upx;
		background-color: #ececec;
		border-radius: 10upx 10upx 40upx 10upx;
		image {
			width: 85%;
			height: 240upx;
			margin-bottom: 10upx;
		};
		text {
			font-size: 0.8em;
		};
		button {
			width: 50%;
			height: 1.5em;
			line-height: 1.5em;
			background-color: #d8d8d8;
			color: black;
			margin-top: 15upx;
		};
		button::after {
			border: none
		}
		
	}
</style>
