<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">成果</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">名称</view>
				<input name="input" v-model="achName"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">类型</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'成果类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">作者</view>
				<input name="input" v-model="achAuthor"></input>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="chooseFile">选择上传文件</button>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="confirmAch">确定录入</button>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="modalName=''">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modalContent}}
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/logo.jpg" mode="aspectFit"></image>
			<view class="gray-text">请稍候...</view>
		</view>
		<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				path: null,
				id: null,
				loadModal: false,
				modalName: null,
				modalContent: null,
				index: 0,
				picker: ['专利', '论文'],
				achName: '',
				fileId: null,
				achAuthor: '',
				type: 'add'
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			chooseFile() {
				this.$refs.filemanager._openFile()
			},
			resultPath(e) {
				this.path = e
			},
			confirmAch() {
				this.loadModal=true;
				let _this = this;
				console.log(this.path)
				if (this.path == null) {
					this.submitAch()
				} else {
					uni.uploadFile({
						url: _this.remoteUrl + '/file/uploadFile',
						filePath: _this.path.substr(1),
						name: 'file',
						header: {
							"Content-Type": "multipart/form-data",
							'Authorization': uni.getStorageSync('Authorization')
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							if (data.success) {
								_this.fileId = data.data;
								_this.submitAch()
							}
						}
					});
				}
			},
			submitAch() {
				let data = {
					id: this.id,
					achType: this.index,
					achName: this.achName,
					fileId: this.fileId,
					achAuthor: this.achAuthor
				}
				console.log(data)
				let _this = this;
				if (this.type == 'edit') {
					uni.request({
						url: this.remoteUrl + '/achievement/modifyAchievement',
						data: data,
						method: "POST",
						header: {
							'content-type': 'application/json',
							'Authorization': uni.getStorageSync('Authorization')
						},
						success: function(res) {
							_this.loadModal = true;
							console.log(res.data);
							let data = res.data;
							if (data.success) {
								_this.loadModal = false;
								_this.fun.navigateTo("/pages/achievement/achievement");
							} else {
								_this.loadModal = false;
							}
						}
					})
				} else {
					uni.request({
						url: this.remoteUrl + '/achievement/addAchievement',
						data: data,
						method: "POST",
						header: {
							'content-type': 'application/json',
							'Authorization': uni.getStorageSync('Authorization')
						},
						success: function(res) {
							_this.loadModal = true;
							console.log(res.data);
							let data = res.data;
							if (data.success) {
								_this.loadModal = false;
								_this.fun.navigateTo("/pages/achievement/achievement");
							} else {
								_this.loadModal = false;
							}
						}
					})
				};
			},
			queryAchievement(id) {
				let _this = this;
				let data = id;
				uni.request({
					url: this.remoteUrl + '/achievement/getAchievementInfo',
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
							let info = data.data;
							_this.index = info.achType;
							_this.achName = info.achName;
							_this.fileId = info.fileId;
							_this.achAuthor = info.achAuthor;
							_this.id = info.id;
						}
					}
				})
			}
		},
		onLoad(id) {
			if (id.id != null) {
				this.type = 'edit'
				this.queryAchievement(id)
			}
		}
	}
</script>

<style>

</style>
