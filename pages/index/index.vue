<template>
	<view class="content">
		<c-swiper :swiperList='swiperList'></c-swiper>
		<c-list :normalList="listData" @todo='attendance' :listType='listType'></c-list>
		<view class="cu-modal" :class="modalShow ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modal.title}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modal.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cList from '../../components/list.vue'
	import cSwiper from '../../components/swiper.vue'
	export default {
		components: {
			cList,
			cSwiper
		},
		data() {
			return {
				listType: 1,
				modalShow: false,
				modal: {
					title: '提示',
					content: ''
				},
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/NCUT0.jpg'
				}, {
					id: 1,
					type: 'image',
					url: '/static/NCUT1.jpg'
				}, {
					id: 2,
					type: 'image',
					url: '/static/NCUT2.jpg'
				}],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				listData: []

			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			hideModal(e) {
				this.modalShow = false;
			},
			loadData: function() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/notice/getNoticeNum',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						let data = res.data;
						console.log(res)
						if (data.success) {
							_this.buildIndexList(data.data);
						}
					}
				});
			},
			buildIndexList: function(noticeNum) {
				this.listData = [{
						title: '考勤',
						list: [{
							cuIcon: 'commandfill',
							color: 'red',
							badge: 0,
							name: '签到',
							prop: 'signIn',
							type: 0
						}, {
							cuIcon: 'commandfill',
							color: 'black',
							badge: 0,
							name: '签退',
							prop: 'signOut',
							type: 0
						}, {
							cuIcon: 'upstagefill',
							color: 'cyan',
							badge: 0,
							name: '考勤历史',
							type: 1,
							url: '/pages/attendance/attendance'
						}]
					},
					{
						title: '成果',
						list: [{
							cuIcon: 'discoverfill',
							color: 'yellow',
							badge: 0,
							name: '成果列表',
							type: 1,
							url: '/pages/achievement/achievement'
						}, {
							cuIcon: 'discoverfill',
							color: 'cyan',
							badge: 0,
							name: '成果录入',
							type: 1,
							url: '/pages/achievement/addAchievement'
						}]
					},
					{
						title: '固资',
						list: [{
							cuIcon: 'brandfill',
							color: 'red',
							badge: 0,
							name: '固资列表',
							type: 1,
							url: '/pages/assets/assets'
						}, {
							cuIcon: 'brandfill',
							color: 'orange',
							badge: 0,
							name: '固资录入',
							type: 1,
							url: '/pages/assets/addAssets'
						}]
					},
					{
						title: '通知',
						list: [{
							cuIcon: 'noticefill',
							color: 'green',
							badge: noticeNum,
							name: '通知列表',
							type: 1,
							url: '/pages/notice/notice'
						}, {
							cuIcon: 'noticefill',
							color: 'cyan',
							badge: 0,
							name: '发布通知',
							type: 1,
							url: '/pages/notice/addNotice'
						}]
					},
					{
						title: '其他',
						list: [{
							cuIcon: 'questionfill',
							color: 'red',
							badge: 0,
							name: '成员',
							type: 1,
							url: '/pages/user/user'
						}, {
							cuIcon: 'recordfill',
							color: 'black',
							badge: 0,
							type: 1,
							name: '监控',
							url: '/pages/monitor/monitor'
						}, {
							cuIcon: 'recordfill',
							color: 'green',
							badge: 0,
							type: 1,
							name: '录入摄像头',
							url: '/pages/monitor/addCamera'
						}]
					}
				]
			},
			attendance(type) {
				if (type == 'signIn') {
					this.signIn();
				} else if (type == 'signOut') {
					this.signOut();
				}
			},
			signIn() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/attendance/signIn',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							_this.modal.content = '签到成功';
						} else {
							_this.modal.content = data.message;
						}
						_this.modalShow = true;
					}
				});
			},
			signOut() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/attendance/signOut',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						let data = res.data;
						if (data.success) {
							_this.modal.content = '签退成功';
						} else {
							_this.modal.content = data.message;
						}
						_this.modalShow = true;
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		/* 		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.modal {
		z-index: 100000000;
	}
</style>
