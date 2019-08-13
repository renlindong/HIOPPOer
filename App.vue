<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.cloud.init({
				env: 'test-aed77',
				traceUser: true,
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
