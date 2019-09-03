<template>
	<view>
		<image class="bgImg" :src="images.bg"></image>
		<view @click="this.showPicker=false" v-if="showPicker" class="layer"></view>
		<view class="main">
			<image class="form-bg" :src="images.form"></image>
			<input class="input-name" required type="text" v-model="name" />
			<view @click="showPicker=true" class="picker">{{array[index]}}</view>
			<image :src="images.start" class="start" @click="onStart"></image>
		</view>
		<van-picker
			v-if="showPicker"
			show-toolbar
			title="选择你的班级" 
			@cancel="showPicker=false"
			@confirm="onConfirm" 
			:columns="array">
		</van-picker>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				array: ['一班','二班','三班','四班','五班','六班','七班','欧爸'],
				index: 0,
				images: {
					bg: '../../static/images/login-page-background.png',
					form: '../../static/images/login-form.png',
					start: '../../static/images/icon_start.png',
				},
				showPicker: false
			};
		},
		onLoad() {
			const oppoer = uni.getStorageSync('oppoer')
			if(oppoer){
				uni.redirectTo({
					url: '/pages/home/home',
				})
			}
		},
		methods:{
			clickLayer(e) {
				console.log(e)
				// if(e.)
			},
			onConfirm(e) {
			    this.index = +e.detail.index;
				this.showPicker = false;
			},
			onStart(){
				let { name, index } = this;
				let klass = this.array[this.index];
				wx.cloud.callFunction({
					name: 'login',
					data: { name, klass },
					success(res) {
						if(res.result.errCode===1) {
							console.log(res.result.errMessage)
							wx.showToast({
								title: index===7?'您似乎不在“欧爸”阵营中，请再次核对班级':'姓名或班级错误',
								icon: 'none'
							})
						} else if (res.result.errCode===0) {
							// console.log('success', res.errMessage)
							const oppoer = JSON.stringify({name, klass })
							uni.setStorageSync('oppoer', oppoer)
							uni.redirectTo({
								url: '/pages/gamble/gamble',
							});
						}
					},
					fail: (res)=>{
						wx.showToast({
							title: '登录失败，请重试',
							icon: 'none'
						})
						console.log('login fail', res)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.layer {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 1;
		background-color: rgba($color: #000000, $alpha: 0.6);
	}
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 30upx;
		font-weight: 600;
		color: #20d05e;
		text-align: center;
	}
	.form-bg {
		position: fixed;
		height: 30.6vh;
		width: 80.5vw;
		top: 38.8vh;
		left: 9.9vw;
	}
	.bgImg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -123;
	}
	.input-name {
		position: fixed;
		top: 44vh;
		left: 30vw;
		width: 50vw;
	}
	.picker {
		position: fixed;
		top: 52vh;
		left: 30vw;
		// border: 1px solid black;
		width: 50vw;
		height: 1.4rem;
		line-height: 1.4rem;
	}
	.start {
		width: 62vw;
		height: 7.5vh;
		position: fixed;
		top: 60vh;
		left: 19vw;
	}
	
</style>
