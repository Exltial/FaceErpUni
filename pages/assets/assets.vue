<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">固资</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 固资列表
			</view>
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
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="showFileStyle">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="modalName=''">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<c-list :moveList="list" :listType="type"></c-list>
	</view>
</template>

<script>
	import cList from '../../components/list.vue'
	export default {
		components: {
			cList
		},
		data() {
			return {
				showFileStyle:null,
				showFilePath: null,
				modalName: '',
				accessDenied: '',
				type: 2,
				list: []
			};
		},
		methods: {
			loadData() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/assets/getAssetsList',
					method: "POST",
					header: {
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							let list = data.data;
							console.log(list)
							for (let i = 0; i < list.length; i++) {
								let item = {
									title: list[i].assetsName,
									content: list[i].assetsPosition,
									typeName: list[i].assetsId,
									type: 1,
									date: list[i].assetsOwner,
									button1: null,
									button2: '编辑',
									button3: '删除',
									tap: function() {
										if (list[i].fileId != null) {
											_this.showPic(list[i].fileId);
										}
									},
									tap2: function() {
										_this.edit(list[i].id)
									},
									tap3: function() {
										_this.delete(list[i].id)
									}
								}
								_this.list.push(item)
							}
						}
					}
				});
			},
			showPic(fileId) {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/file/getPath/' + fileId,
					method: "GET",
					header: {
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							_this.showFilePath = _this.remoteUrl + '/static/' + data.data
							_this.showFileStyle = "background-image: url("+_this.showFilePath+");height:300px;"
							_this.modalName = 'Image'
						}
					}
				});
			},
			delete(id) {
				let _this = this;
				console.log(id)
				let data = {
					id: id
				}
				uni.request({
					url: this.remoteUrl + '/assets/deleteAssets',
					data: data,
					method: "POST",
					header: {
						'Authorization': uni.getStorageSync('Authorization'),
						'content-type': 'application/json'
					},
					success: function(res) {
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							uni.redirectTo({
								url: '../assets/assets'
							});
						} else {
							_this.accessDenied = 'show'
						}
					}
				});
			},
			edit(id) {
				this.fun.navigateTo('/pages/assets/addAssets?id=' + id);
			}
		},
		onLoad() {
			this.loadData()
		}
	}
</script>

<style>
	.cu-list>.cu-item {
		height: 300upx;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		font-size: 20px;
	}
</style>
