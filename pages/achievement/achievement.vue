<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">成果</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 成果列表
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
		<c-list :moveList="list" :listType="type"></c-list>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/logo.jpg" mode="aspectFit"></image>
			<view class="gray-text">请稍候...</view>
		</view>
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
				loadModal:false,
				accessDenied: '',
				type: 2,
				list: []
			};
		},
		methods: {
			loadData() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/achievement/getAchievementList',
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
									title: list[i].achName,
									content: list[i].achAuthor,
									typeName: list[i].achTypeDesc,
									type: list[i].achType,
									date: list[i].createTimeDesc,
									button1: list[i].fileId == null ? null : '预览',
									button2: '编辑',
									button3: '删除',
									tap1: function() {
										_this.preview(list[i].fileId)
									},
									tap2: function() {
										_this.editAch(list[i].id)
									},
									tap3: function() {
										_this.deleteAch(list[i].id)
									}
								}
								_this.list.push(item)
							}
						}
					}
				});
			},
			preview(fileId) {
				this.loadModal=true
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
							_this.downloadFile(data.data)
						}
					}
				});
			},
			downloadFile(id) {
				let _this = this;
				uni.downloadFile({
					url: this.remoteUrl + '/static/' + id,
					header: {
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: (res) => {
						let that = _this;
						console.log(res)
						var filePath = res.tempFilePath;
						console.log(filePath)
						console.log(escape(filePath))
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								that.loadModal=false
								console.log(res)
							},
							fail() {
								that.loadModal=false
								console.log(res)
								uni.showToast({
									title: '暂不支持此类型',
									duration: 2000
								});
							}
						});

					}
				});
			},
			deleteAch(id) {
				let _this = this;
				console.log(id)
				let data = {
					id: id
				}
				uni.request({
					url: this.remoteUrl + '/achievement/deleteAchievement',
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
							    url: '../achievement/achievement'
							});
						} else {
							_this.accessDenied = 'show'
						}
					}
				});
			},
			editAch(id) {
				this.fun.navigateTo('/pages/achievement/addAchievement?id=' + id);
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

	.cu-list.menu-avatar>.cu-item {
		height: 74px;
	}
</style>
