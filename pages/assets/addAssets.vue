<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">固资</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">固资名称</view>
				<input name="input" v-model="assetsName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">固资编号</view>
				<input name="input" v-model="assetsId"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">所有者</view>
				<input name="input" v-model="assetsOwner"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">位置</view>
				<input name="input" v-model="assetsPosition"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="takePhoto">图像采集</button>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="confirm">确定录入</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileId:null,
				id: null,
				assetsName: '',
				assetsId: '',
				assetsOwner: '',
				assetsPosition: '',
				type: 'add'
			}
		},
		methods: {
			takePhoto() {
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'],
					success: function(res) {
						let that = _this;
						_this.loadModal = true;
						console.log(res.tempFilePaths[0])
						uni.uploadFile({
							url: _this.remoteUrl + '/file/uploadFile', // 后端api接口
							filePath: res.tempFilePaths[0], // uni.chooseImage函数调用后获取的本地文件路劲
							name: 'file', //后端通过'file'获取上传的文件对象
							header: {
								"Content-Type": "multipart/form-data",
								'Authorization': uni.getStorageSync('Authorization')
							},
							success: (res) => {
								let data = JSON.parse(res.data)
								if (data.success) {
									console.log(data.data)
									that.fileId = data.data;
								}
							}
						});
					}
				});
			},
			confirm: function() {
				let _this = this;
				let data = {
					id: this.id,
					assetsName: this.assetsName,
					assetsId: this.assetsId,
					assetsOwner: this.assetsOwner,
					assetsPosition: this.assetsPosition,
					fileId:this.fileId
				}
				console.log(data)
				if (this.type == 'add') {
					uni.request({
						url: this.remoteUrl + '/assets/addAssets',
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
									url: '../assets/assets'
								});
							}
						}
					})
				} else {
					uni.request({
						url: this.remoteUrl + '/assets/modifyAssets',
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
									url: '../assets/assets'
								});
							}
						}
					})
				}
			},
			query: function(id) {
				let _this = this;
				let data = id;
				uni.request({
					url: this.remoteUrl + '/assets/getAssetsById',
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
							_this.fileId= info .fileId;
							_this.assetsName = info.assetsName;
							_this.assetsId = info.assetsId;
							_this.assetsOwner = info.assetsOwner;
							_this.assetsPosition = info.assetsPosition;
							_this.id = info.id;
						}
					}
				})
			}
		},
		onLoad(id) {
			console.log(id)
			if (id.id != null) {
				this.type = 'edit'
				this.query(id)
			}
		}
	}
</script>

<style>

</style>
