<template>
	<view>
		<text @click="test">测试</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			test() {
				wx.cloud.init()
				let db = wx.cloud.database({
					env: 'test-aed77'
				})
				db.collection('users').get({
					success: function(res) {
						console.log(res)
						console.log("caonimaa")
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
