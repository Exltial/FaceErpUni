<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">考勤</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 考勤历史
			</view>
		</view>
		<view class="cu-list menu-avatar" v-for="(item,index) in attendanceList" :key="index">
			<view class="cu-item">
				<view class="content">
					<view class="text-grey">{{item.userName}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">签到时间:{{item.signInTimeStr}} <br /> 签退时间:{{item.signOutTimeStr}}</text>
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-blue">{{item.date}}</view>
					<view class="text-grey text-xs">{{item.attendanceStatus}}</view>
					<view :class="item.attendanceStatus=='正常'?'cu-tag round bg-green sm':'cu-tag round bg-red sm'"></view>
				</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				modalContent: null,
				attendanceList: []
			};
		},
		onLoad() {
			this.getAttendanceList();
		},
		methods: {
			showModal(e) {
				this.modalName = 'Modal'
			},
			hideModal(e) {
				this.modalName = ''
			},
			getAttendanceList() {
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/attendance/attendanceList',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization':uni.getStorageSync('Authorization')
					},
					success: function(res) {
						console.log(res);
						let data = res.data;
						if (data.success) {
							_this.attendanceList = data.data
						} else {
							_this.modalContent = data.message;
							_this.showModal();
							_this.fun.navigateTo('/pages/index/index')
						}
					}
				});
			}
		},

	}
</script>

<style lang="less">

</style>
