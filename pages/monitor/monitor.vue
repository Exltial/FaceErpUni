<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">监控</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 摄像头列表
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
				accessDenied: '',
				type: 2,
				list: []
			};
		},
		methods: {
			loadData() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/monitor/findCamList',
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
									title: list[i].camName,
									content: list[i].camUrl,
									type:99,
									button1: null,
									button2: null,
									button3: '删除',
									tap: function() {
										if (list[i].camUrl != null &&list[i].camUrl != '') {
											_this.show(list[i].camUrl);
										}
									},
									tap3: function() {
										_this.delete(list[i].id)
									}
								}
								_this.list.push(item)
							}
						}else{
							_this.accessDenied='show'
						}
					}
				});
			},
			show(url){
				this.fun.navigateTo('/pages/monitor/show?id='+url)
			},
			delete(id) {
				let _this = this;
				console.log(id)
				let data = {
					id: id
				}
				uni.request({
					url: this.remoteUrl + '/monitor/deleteCam',
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
								url: '../monitor/monitor'
							});
						} else {
							_this.accessDenied = 'show'
						}
					}
				});
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
