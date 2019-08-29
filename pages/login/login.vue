<template>
	<view class="main">
		<view class="title">O币大作战</view>
		<view class="wrapper">
			<text>姓名</text>
		    <input required type="text" v-model="name" />
		</view>
		<view class="wrapper">
		    <text>班级</text>
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="picker">
				  {{array[index]}}
				</view>
			</picker>
		</view>
		<view v-if="index==7" class="wrapper">
			<text>工号</text>
		    <input required type="text" v-model="jobNumber" />
		</view>
		<button class="start" @click="onStart">加入作战</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				array: ['一班','二班','三班','四班','五班','六班','七班','欧爸'],
				index: 0,
				jobNumber: '',
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
			bindPickerChange(e) {
			    this.index = e.detail.value
			},
			onStart(){
				let { name, jobNumber, index} = this
				let klass = this.array[this.index]
				wx.cloud.callFunction({
					name: 'login',
					data: {name, klass, jobNumber},
					success(res) {
						if(res.result.errCode===1) {
							console.log(res.result.errMessage)
							wx.showToast({
								title: index===7?'姓名或工号错误':'姓名或班级错误',
								icon: 'none'
							})
						} else if (res.result.errCode===0) {
							// console.log('success', res.errMessage)
							const oppoer = JSON.stringify({name, klass, jobNumber})
							try{
								uni.setStorageSync('oppoer', oppoer)
							}catch(e){
								//TODO handle the exception
								console.log(e)
							}
							uni.redirectTo({
								url: '/pages/gamble/gamble',
							});
						} else if (res.result.errCode===2) {
							console.log(res.result.errMessage)
							wx.showToast({
								title: '您似乎不在“欧爸”阵营中，请再次核对班级',
								icon: 'none'
							})
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

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.title {
		font-size: 50upx;
		font-weight: 600;
		padding: 40% 0;
	}
	
	.wrapper {
		display: flex;
		justify-content: center;
		input {
			border-bottom: 1px solid black;
			width: 200upx;
			margin-left: 15upx;
			position: relative;
			bottom: 12upx;
			font-size: 30upx;
			text-align: center;
		};
		picker {
			border-bottom: 1px solid black;
			width: 200upx;
			margin-left: 15upx;
			font-size: 30upx;
			text-align: center;
		};
		font-size: 35upx;
		margin-bottom: 20upx;
	}
	
	.start {
		border: 1px solid #09fd7a;
		margin-top: 30upx;
		background-color: #dbfeeb;
		color: #09fd7a;
		width: 280upx;
		height: 60upx;
		line-height: 1.5em;
	}
	
</style>
