<template>
	<view class="content">
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 考勤
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in attendanceList" :key="index" v-if="index<gridCol*2" @tap="attendance(item.type)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 成果
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in achievementList" :key="index" v-if="index<gridCol*2" @tap="fun.navigateTo(item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 固资
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in assetsList" :key="index" v-if="index<gridCol*2" @tap="fun.navigateTo(item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 通知
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in noticeList" :key="index" v-if="index<gridCol*2" @tap="fun.navigateTo(item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 其他
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in otherList" :key="index" v-if="index<gridCol*2" @tap="fun.navigateTo(item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/logo.jpg" mode="aspectFit"></image>
			<view class="gray-text">请稍候...</view>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modalContent}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadModal: false,
				modalName: null,
				modalContent: null,
				title: 'Hello',
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
				attendanceList: [{
					cuIcon: 'commandfill',
					color: 'red',
					badge: 0,
					name: '签到',
					type: 0
				}, {
					cuIcon: 'commandfill',
					color: 'black',
					badge: 0,
					name: '签退',
					type: 1
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '考勤历史',
					type: 2
				}],
				achievementList: [{
					cuIcon: 'discoverfill',
					color: 'red',
					badge: 0,
					name: '成果列表',
					url: '/pages/achievement/achievement'
				}, {
					cuIcon: 'discoverfill',
					color: 'cyan',
					badge: 0,
					name: '成果录入',
					url: '/pages/achievement/addAchievement'
				}],
				assetsList: [{
					cuIcon: 'brandfill',
					color: 'red',
					badge: 0,
					name: '固资列表',
					url: '/pages/assets/assets'
				}, {
					cuIcon: 'brandfill',
					color: 'cyan',
					badge: 0,
					name: '固资录入',
					url: '/pages/assets/addAssets'
				}],
				noticeList: [{
					cuIcon: 'noticefill',
					color: 'red',
					badge: 0,
					name: '通知列表',
					url: '/pages/notice/notice'
				}, {
					cuIcon: 'noticefill',
					color: 'cyan',
					badge: 0,
					name: '发布通知',
					url: '/pages/notice/addNotice'
				}],
				otherList: [{
					cuIcon: 'questionfill',
					color: 'red',
					badge: 0,
					name: '成员',
					url: '/pages/user/user'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					name: '监控'
				}],
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		onLoad() {

		},
		methods: {
			showModal(e) {
				this.modalName = 'Modal'
			},
			hideModal(e) {
				this.modalName = ''
			},
			attendance(type) {
				if (type == 0) {
					this.signIn();
				} else if (type == 1) {
					this.signOut();
				} else if (type == 2) {
					this.fun.navigateTo('/pages/attendance/attendance')
				}
			},
			signIn() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/attendance/signIn',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization':uni.getStorageSync('Authorization')
					},
					success: function(res) {
						_this.loadModal = true;
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							_this.loadModal = false;
							_this.modalContent = '签到成功';
							_this.showModal();
						} else {
							_this.loadModal = false;
							_this.modalContent = data.message;
							_this.showModal();
						}
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
						'Authorization':uni.getStorageSync('Authorization')
					},
					success: function(res) {
						_this.loadModal = true;
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							_this.loadModal = false;
							_this.modalContent = '签退成功';
							_this.showModal();
						} else {
							_this.loadModal = false;
							_this.modalContent = data.message;
							_this.showModal();
						}
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
</style>
