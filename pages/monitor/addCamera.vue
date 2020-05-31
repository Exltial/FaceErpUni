<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">监控管理</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">摄像头名称</view>
				<input name="input" v-model="camName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">码流地址</view>
				<input name="input" v-model="camUrl"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">账号</view>
				<input name="input" v-model="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input name="input" v-model="password"></input>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="confirm">确定录入</button>
		</view>
		<view class="cu-modal" :class="accessDenied ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="accessDenied=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您无权使用该功能
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accessDenied:'',
				camName: '',
				camUrl: '',
				username: '',
				password: ''
			}
		},
		methods: {
			confirm() {
				let _this = this;
				let data = {
					camName: this.camName,
					camUrl: this.camUrl,
					username: this.username,
					password: this.password
				};
				uni.request({
					url: this.remoteUrl + '/monitor/addCam',
					data: data,
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							_this.fun.navigateTo("/pages/monitor/monitor");
						}else{
							_this.accessDenied='show'
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
