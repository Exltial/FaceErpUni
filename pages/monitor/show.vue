<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">监控</block>
		</cu-custom>
		<view>
			<video id="myVideo" :src="src" autoplay="true" controls style="width: 420px;"></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: null
			}
		},
		onLoad: function(url){
			console.log(url)
			this.src = url.id
			// 获取 video 上下文 videoContext 对象
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
