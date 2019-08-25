<template>
	<view>
		<swiper
			:current="curProg"
			previous-margin="60rpx"
			next-margin="60rpx"
			@change="handleChange"
		>
			<swiper-item class="intro" :index='0'>
				<view class="wrapper">
					<view class="intro-title">Pick你所爱</view>
					<view class="intro-content">
						玩家们的初始资金为10枚O币。在本环节中，根据个节目介绍用O币竞猜本场晚会的“最佳节目Top3”。
					</view>
					<view class="intro-content">
						如果你pick到获得第一名的节目，则获得三倍投资O币。相应的，第二名为两倍，第三名为1.5倍。其余视为投资失败，不返还O币。
					</view>					
				</view>
			</swiper-item>
			<swiper-item class="program" v-for="(item,index) in programs" :key="index" :index="index+1">
				<view class="wrapper">
					<image :src="item.imgUrl" mode=""></image>
					<view class="program-title">
						{{item.title}}
					</view>
					<view class="program-disc">
						{{item.disc}}
					</view>
					<view class="buttons">
						<view class="button" @tap="decrease" :data-index="index">-</view>
						<text>{{item.ob}}</text>
						<view class="button" @tap="increase" :data-index="index">+</view>
					</view>
					<text class="left">剩余{{leftOb}}枚</text>
				</view>
			</swiper-item>
			<swiper-item class="end" :index='11'>
				<view class="wrapper">
					<view class="intro-title">我的Pick</view>
					<view class="picks" v-for="(item,index) in picks" :key="index">
						<view class="pick">
							<text>{{item.title}}</text>
							<text>{{item.ob}}OB</text>
						</view>
					</view>
					<view class="grow">
						<br/>
					</view>
					<view class="left endLeft">
						剩余{{leftOb}}枚O币
					</view>
					<button class="btnEnd" @tap="onEnd" >结束竞猜</button>
				</view>
			</swiper-item>
		</swiper>
		<view class="slider-wrapper">
			<van-slider 
			bar-height="10rpx" 
			step="9.0909" 
			active-color="#ffffff" 
			inactive-color="#ffffff" 
			@change="progressChange" 
			:value="curProgress"
			class="progress"
			/>
		</view>
		<van-dialog @confirm="onConfirm" id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant-weapp/dialog/dialog'
	export default {
		data() {
			return {
				curProg: 0,
				curProgress: 0,
				programs: [],
				leftOb: 10,
				picks: []
			};
		},
		onLoad() {
			const db = wx.cloud.database()
			db.collection('programs').field({
				_id: true,
				programId: true,
				title: true,
				imgUrl: true,
				disc: true
			}).get().then(res => {
				console.log(res)
				this.programs = res.data.map(item => {
					item.ob = 0
					return item
				})
			})
		},
		methods: {
			handleChange(e){
				this.curProgress = e.detail.current * 9.0909
			},
			decrease(e){
				const index = e.currentTarget.dataset.index
				if(this.programs[index].ob>0 ){
					this.programs[index].ob--;
					this.leftOb++;
					this.picks = this.programs.filter(item=>{
						return item.ob>0
					})
				}
			},
			increase(e){
				const index = e.currentTarget.dataset.index
				if(this.leftOb>0){
					this.programs[index].ob++;
					this.leftOb--;
					this.picks = this.programs.filter(item=>{
						return item.ob>0
					})
				}
			},
			onEnd(){
				Dialog.confirm({
					title: "结束节目竞猜",
					message: "结束后，将不能再进行其他竞猜行为。",
					cancelButtonText: '再想想',
				})	
			},
			onConfirm(){
				const oppoer = JSON.parse(uni.getStorageSync('oppoer'))
				const picks = this.picks.map(item => {
					const { programId, title, ob } = item
					return {
						programId,
						title,
						ob: +ob
					}
				})
				const db = wx.cloud.database();
				const filt = oppoer.klass==='欧爸'?{name: oppoer.name, jobNumber:oppoer.jobNumber}:{name:oppoer.name, klass:oppoer.klass}
				db.collection('users').where(filt).get().then(res => {
					console.log(res)
					db.collection('users').doc(res.data[0]._id).update({
						data: {
							picks,
							ob: this.leftOb,
						}
					}).then(res => {
						console.log(res)
						uni.redirectTo({
							url: `/pages/home/home`,
						})
					}).catch(e=> {
						console.log(e)
					})
				})
				
			},
			progressChange(e){
				this.curProg = Math.round(e.detail/9.0909)
			}
		}
	}
</script>

<style lang="scss">
swiper {
	height: 80vh;
	padding-top: 6vh;
	display: flex;
	justify-content: center;
}

swiper-item {
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
	image {
		width: 450upx;
		height: 350upx;
		margin-top: 50upx;
	}
}
.intro-title {
	margin-top: 120upx;
	margin-bottom: 60upx;
	font-size: 0.9em;
	font-weight: 700;
}
.intro-content {
	color: #636366;
	font-size: 0.8em;
	font-weight: 400;
	width: 80%;
	text-indent: 2em;
	letter-spacing: 4upx;
	line-height: 1.5em;

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
.buttons {
	display: flex;
	height: 50upx;
	text {
		border: 1upx solid #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 70upx;
		border-radius: 6upx;
		margin: 0 30upx;
	}
}
.button {
	border-radius: 50%;
	width: 50upx;
	height: 50upx;
	font-size: 40upx;
	background-color: #444444;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
}
.left {
	margin-top: 10upx;
	margin-bottom: 70upx;
	font-size: 0.6em;
	color:#C0C0C0;
}
.picks {
	width: 80%;
}
.pick {
	font-size: 0.8em;
	font-weight: 400;
	color: #636366;
	width: 100%;
	display: flex
	:first-child {
		flex-grow: 1;
	}
}
.grow {
	flex-grow: 1;
}
.btnEnd {
	background-color: #dbfeeb;
	color: #15faa7;
	:after {
		border: 1upx solid #33fc90;
	}
	height: 70upx;
	width: 300upx;
	margin-bottom: 120upx;
	margin-top: 10upx;
	font-size: 0.9em;
	display: flex;
	align-items: center;
	justify-content: center;
}
.endLeft {
	margin: 0
}
.slider-wrapper{
	position: fixed;
	bottom: 0;
	width: 80vw;
	padding: 10%;
	background-color: #f4f4f4;
}
.progress {
	width: 100%;
}
</style>
