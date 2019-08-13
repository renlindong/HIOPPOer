<template>
	<view class="container">
		<view class="cards">
			<view class="card" v-for="(item,index) in programs" :key="index">
				<image @tap="openCard" :src="item.imgUrl" mode="" alt="item.title" :data-programid="item.programId"></image>
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
				programs: [{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},{
					programId: '1',
					title: '贝加尔湖畔',
					imgUrl: '/static/logo.png',
					disc: `《贝加尔湖畔》是李健作词、作曲并演唱的一首歌曲，收录于李健2011年12月10日发行的专辑《依然》。2015年，周深和李维凭借该曲获得第19届华语音乐榜中榜颁奖典礼-榜中榜最具潜力组合奖`,
				},
				],
				voteProgram: ''
			};
		},
		
		onLoad() {
			// this.programs = JSON.parse(uni.getStorageSync('programs'))
			const db = wx.cloud.database()
			db.collection('programs').field({
				_id: true,
				title: true,
				programId: true,
				imgUrl: true,
			}).get().then(res => {
				this.programs = res.data
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
				const programId = e.currentTarget.dataset.programid
				uni.navigateTo({
					url: `/pages/gamble/gamble?programId=${programId}&from=vote`,
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
