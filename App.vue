<script>
	export default {
		onLaunch: function() {
			wx.cloud.init({
				env: 'test-aed77',
				traceUser: true,
			})
		
		},
		onShow: function() {
			console.log('App Ssshssow')
		},
		onHide: function() {
			console.log('App Hissde')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
