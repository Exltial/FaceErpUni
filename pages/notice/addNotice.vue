<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">通知</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input name="input" v-model="title"></input>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="100" @input="textareaAInput" placeholder="通知内容" v-model="content"></textarea>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="confirm">确定发布</button>
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
				title: '',
				content: ''
			}
		},
		methods: {
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			confirm: function() {
				let _this = this;
				let data = {
					topic: this.title,
					content: this.content
				}
				uni.request({
					url: this.remoteUrl + '/notice/addNotice',
					data: data,
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						let data = res.data;
						if (data.success) {
							uni.redirectTo({
							    url: '../notice/notice'
							});
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
