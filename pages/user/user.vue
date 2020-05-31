<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">成员</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 成员列表
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow" v-for="(item,index) in list" :key="index">
				<view class="image">
					<image :src="item.imgUrl" mode="widthFix"></image>
					<view :class="item.userRole=='管理员'?'cu-tag bg-red':'cu-tag bg-blue'">{{item.userRole}}</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="content flex-sub">
							<view class="text-grey text-xxl">{{item.userName}}</view>
							</view>
						</view>
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
				list:[]
			};
		},
		methods:{
			loadData:function(){
				let _this = this;
				uni.request({
					url: this.remoteUrl + '/user/userList',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'Authorization': uni.getStorageSync('Authorization')
					},
					success: function(res) {
						let data = res.data;
						if (data.success) {
							let list = data.data;
							for (let i = 0; i < list.length; i++) {
								let item = {
									userName: list[i].userName,
									userRole: list[i].userRole=='ADMIN'?'管理员':'用户',
									imgUrl: _this.remoteUrl+list[i].imgUrl
								}
								_this.list.push(item)
							}
							console.log(_this.list)
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

<style lang="less">

</style>
