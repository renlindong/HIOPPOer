<template>
	<view>
		<image class="bgImg" :src="images.bg"></image>
		<view class="layer"></view>
		<view class="intro">
			<view class="intro-title">Pick你所爱：</view>
			<view class="intro-content">玩家初始资金为15枚欧币，请在晚会开始前根据节目花絮选择你心中的最佳节目（不限数量）并投资，晚会过程中将通过公投的形式选出“最佳节目Top3”。</view>
			<view class="intro-content">如果投资的节目获得第一名将获得预投资额度的8倍的收益，第二名为5倍收益，第三名为3倍。</view>
		</view>
		<view class="main">
			<swiper
				:current="curProg"
				previous-margin="60rpx"
				next-margin="60rpx"
				@change="handleChange"
			>
				<swiper-item class="program" v-for="(item,index) in programs" :key="index" :index="index">
					<view class="wrapper">
						<image :src="item.imgUrl"></image>
						<view class="program-title">
							{{item.title}}
						</view>
						<view class="program-disc">
							{{item.disc}}
						</view>
						<view class="buttons">
							<image :src="images.minus" class="button" @tap="decrease" :data-index="index"></image>
							<text>{{item.ob}}</text>
							<image :src="images.add" class="button" @tap="increase" :data-index="index"></image>
						</view>
						<text class="left">剩余： {{leftOb}}枚</text>
					</view>
				</swiper-item>
				<swiper-item class="end" :index='9'>
					<view class="wrapper">
						<view class="mypick">我的Pick</view>
						<view class="picks" v-for="(item,index) in picks" :key="index">
							<view class="pick">
								<text>{{item.title}}</text>
								<text>{{item.ob}}OB</text>
							</view>
						</view>
						<view class="btnEnd" @tap="onEnd" >结束竞猜</view>
						<view class="left endLeft">
							剩余：{{leftOb}}枚
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="footer">
				<view @click="clickIcon(index)" class="icon-wrapper" v-for="(icon, index) in images.icons" :key="index">
					<image :src="icon" class="icon" :class="curProg===index?'active-icon':''"></image>
				</view>
			</view>
			<view class="icon-bar" :style="'left:'+barLeft+'vw'"> </view>
			<van-dialog @confirm="onConfirm" id="van-dialog" />
		</view>
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
				leftOb: 15,
				picks: [],
				images: {
					bg: '../../static/images/gamble-bg.png',
					minus: '../../static/images/minus.png',
					add: '../../static/images/add.png',
					icons: [
						'../../static/images/B01icon1.png',
						'../../static/images/B01icon2.png',
						'../../static/images/B01icon3.png',
						'../../static/images/B01icon4.png',
						'../../static/images/B01icon5.png',
						'../../static/images/B01icon6.png',
						'../../static/images/B01icon7.png',
						'../../static/images/B01icon8.png',
						'../../static/images/B01icon9.png',
						'../../static/images/B01icon10.png',
					]
				}
			};
		},
		computed: {
			barLeft(){
				return 9*(this.curProg)+7;
			}
		},
		onLoad() {
			//是否已经pick过
			const leftOb = uni.getStorageSync('leftOb');
			console.log(typeof leftOb)
			if(leftOb) {
				uni.redirectTo({
					url: '/pages/home/home'
				})
			}
			
			//初始化节目数据
			const db = wx.cloud.database()
			db.collection('programs').field({
				_id: true,
				programId: true,
				title: true,
				imgUrl: true,
				disc: true
			}).get().then(res => {
				this.programs = res.data.filter(item => item.programId!=='10').map(item => {
					item.ob = 0
					return item
				});
				uni.setStorageSync("programs", this.programs);
			})
		},
		methods: {
			handleChange(e){
				this.curProg = e.detail.current;
			},
			
			//减少1个投币
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
			
			//增加1个投币
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
			
			//提交前弹窗提醒
			onEnd(){
				Dialog.confirm({
					title: "结束节目竞猜",
					message: "结束后，将不能再进行其他竞猜行为。",
					cancelButtonText: '再想想',
				})	
			},
			
			//提交pick结果
			async onConfirm(){
				//装载payload
				let picks = this.picks.map(item => {
					const { programId, title, ob } = item
					return {
						programId,
						title,
						ob: +ob
					}
				});
				let leftOb = this.leftOb;
				const stopPick = (await this.getFlags()).data.stopPick;
				if(stopPick){
					picks = [];
					leftOb = 15;
				}
				
				//上传gamble数据
				const oppoer = JSON.parse(uni.getStorageSync('oppoer'));
				const filt = {name:oppoer.name, klass:oppoer.klass}
				const db = wx.cloud.database();
				db.collection('users').where(filt).get().then(res => {
					db.collection('users').doc(res.data[0]._id).update({
						data: {
							picks,
							ob: leftOb,
						}
					}).then(res => {
						uni.setStorageSync('first', true)
						uni.setStorageSync('leftOb', leftOb)
						uni.redirectTo({
							url: `/pages/home/home`,
						})
					}).catch(e=> {
						console.log(e)
					})
				})
				
			},
			
			//进度条改变后同步swiper
			clickIcon(index){
				this.curProg = index
			},
			
			//拿到标志变量
			getFlags() {
				const db = wx.cloud.database();
				return db.collection('flags').doc('8a2bdccf-2e39-4322-862d-291a68c84636').get();
			}
		}
	}
</script>

<style lang="scss">
.bgImg {
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: -123;
	top: 0;
}
.layer {
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: -120;
	background-color: rgba($color: #000000, $alpha: 0.6);
}
.intro {
	position: fixed;
	top: 4vh;
	left: 6vw;
	width: 88vw;
	color: rgba(36,255,114,1);
	background-color: rgba(36,255,114,.4);
	box-sizing: border-box;
	padding: 3.3vh 8vw 2.6vh 8vw;
}
.intro-title {
	margin-bottom: 1.3vh;
	font-size: 2.2vh;
	font-weight: 700;
}
.intro-content {
	text-align: justify;
	font-size: 2vh;
	font-weight: 400;
	width: 100%;
	text-indent: 2em;
}
.main {
	padding-top: 30vh;
}
swiper {
	height: 50vh;
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
	background-color: rgba(36,255,114,.6);
	color: rgba(36,255,114,1);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	> image {
		width: 53.9vw;
		height: 15.6vh;
		margin-top: 2.8vh;
		border: 4px solid #FFFFFF;
	}
}
.program-title {
	font-size: 2.3vh;
	font-weight: 600;
	margin-top: 2.9vh;
	margin-bottom: 0.8vh;
}
.program-disc {
	font-size: 2vh;
	font-weight: 400;
	width: 55.5vw;
	flex-grow: 1;
	text-align: justify;
}
.buttons {
	display: flex;
	height: 4vh;
	text {
		border: 1px solid #24FF72;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		height: 4vh;
		width: 16.7vw;
		margin: 0 3vw;
		background-color: rgba(36,255,114,.4);
	}
}
.button {
	// border-radius: 3px;
	width: 4vh;
	height: 4vh;
}
.left {
	margin-top: 1vh;
	margin-bottom: 3vh;
	font-size: 1.8vh;
}
.mypick {
	margin-top: 4.4vh;
	margin-left: 4.5vw;
	font-size: 2.3vh;
	font-weight: 500;
	margin-bottom: 2vh;
}
.picks {
	width: 80%;
	padding-bottom: 1vh;
}
.pick {
	font-size: 2vh;
	font-weight: 400;
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
	background-color: rgba(36,255,114,.4);
	color: rgba(36,255,114,1);
	border: 1upx solid #24FF72;
	height: 3.5vh;
	width: 27.8vw;
	position: absolute;
	bottom: 4.3vh;
	left: 25.9vw;
	font-size: 2.5vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.endLeft {
	position: absolute;
	bottom: 4.3vh;
	right: 7vw;
	margin: 0;
}
.footer {
	position: fixed;
	bottom: 0;
	width: 100vw;
	left: 0;
	height: 15vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.icon-wrapper {
	box-sizing: border-box;
	padding: 1.5vw;
}
.icon {
	height: 4vw;
	width: 6vw;
	transition: all ease 0.3s;
}
.active-icon {
	height: 8vw;
	width: 12vw;
}
.icon-bar {
	position: fixed;
	width: 5vw;
	height: 0.6vh;
	bottom: 5vh;
	transition: all ease 0.3s;
	background-color: rgba(36,255,114,1);
}
</style>
