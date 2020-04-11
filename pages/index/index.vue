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
			<view class="cu-item" v-for="(item,index) in attendanceList" :key="index" v-if="index<gridCol*2"   @tap="fun.navigateTo(item.url)">
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
			<view class="cu-item" v-for="(item,index) in achievementList" :key="index" v-if="index<gridCol*2"  @tap="fun.navigateTo(item.url)">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}],
				dotStyle: true,
				towerStart: 0,
				direction: '',
				attendanceList: [{
					cuIcon: 'commandfill',
					color: 'red',
					badge: 0,
					name: '签到'
				}, {
					cuIcon: 'commandfill',
					color: 'black',
					badge: 0,
					name: '签退'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '考勤历史',
					url:'/pages/attendance/attendance'
				}],
				achievementList: [{
					cuIcon: 'discoverfill',
					color: 'red',
					badge: 0,
					name: '成果列表',
					url:'/pages/achievement/achievement'
				}, {
					cuIcon: 'discoverfill',
					color: 'cyan',
					badge: 0,
					name: '成果录入',
					url:'/pages/achievement/addAchievement'
				}],
				assetsList: [{
					cuIcon: 'brandfill',
					color: 'red',
					badge: 0,
					name: '固资列表',
					url:'/pages/assets/assets'
				}, {
					cuIcon: 'brandfill',
					color: 'cyan',
					badge: 0,
					name: '固资录入',
					url:'/pages/assets/addAssets'
				}],
				noticeList: [{
					cuIcon: 'noticefill',
					color: 'red',
					badge: 0,
					name: '通知列表',
					url:'/pages/notice/notice'
				}, {
					cuIcon: 'noticefill',
					color: 'cyan',
					badge: 0,
					name: '发布通知',
					url:'/pages/notice/addNotice'
				}],
				otherList: [{
					cuIcon: 'questionfill',
					color: 'red',
					badge: 0,
					name: '成员',
					url:'/pages/user/user'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 0,
					name: '监控'
				}],
				modalName: null,
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
