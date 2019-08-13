<template>
	<view class="main">
		<view class="title">O币大作战</view>
		<view class="wrapper">
			<text>姓名</text>
		    <input required type="text" v-model="name"></input>
		</view>
		<view class="wrapper">
		    <text>工号</text>
		    <input required type="number" v-model="jobNumber"></input>
		</view>
		<button class="start" @click="onStart">加入作战</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				jobNumber: "",
			};
		},
		methods:{
			onStart(){
				let {name, jobNumber} = this
				wx.cloud.callFunction({
					name: 'login',
					data: {name, jobNumber},
					success: (res)=>{
						console.log(res)
						if(res.result.errCode) {
							wx.showToast({
								title: '姓名或工号错误',
								icon: 'none'
							})
						} else {
							// console.log('success', res.errMessage)
							const oppoer = JSON.stringify({name, jobNumber})
							try{
								uni.setStorageSync('oppoer', oppoer)
							}catch(e){
								//TODO handle the exception
								console.log(e)
							}
							uni.navigateTo({
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
		}
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
