<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">通知</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 通知列表
			</view>
		</view>
		<view class="cu-list menu-avatar" v-for="(item,index) in list" :key="index">
			<view class="cu-card article">
				<view class="cu-item shadow" @longtap="del(item.id)">
					<view class="title">
						<view class="text-cut">{{item.topic}}</view>
					</view>
					<view class="content">
						<view class="desc">
							<view class="text-content">{{item.content}}</view>
							<view>
								<view class="cu-tag bg-red light sm round">{{item.creator}}</view>
								<view class="cu-tag bg-blue light sm round">{{item.createTime}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="cancel">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否删除通知
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="cancel">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm">确定</button>
					</view>
				</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accessDenied:'',
				modalName: '',
				list: [],
				id: null
			};
		},
		methods: {
			loadData: function() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/notice/getNoticeList',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						let data = res.data;
						if (data.success) {
							console.log(data)
							let list = data.data;
							for (let i = 0; i < list.length; i++) {
								let item = {
									topic: list[i].topic,
									content: list[i].content,
									createTime: list[i].createTimeDesc,
									creator: list[i].creator,
									id: list[i].id
								}
								_this.list.push(item)
							}
						}
					}
				});
			},
			del: function(id) {
				this.id = id;
				this.modalName = 'show'
			},
			cancel: function() {
				this.id = null,
				this.modalName = ''
			},
			confirm: function() {
				let _this = this;
				let data = {
					id: this.id
				}
				uni.request({
					url: this.remoteUrl + '/notice/deleteNotice',
					method: "POST",
					data: data,
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
