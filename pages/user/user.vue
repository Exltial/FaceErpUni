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
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">用户</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="content flex-sub">
							<view class="text-grey">正义天使 凯尔</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item shadow">
					<view class="image">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						 mode="widthFix"></image>
						<view class="cu-tag bg-red">管理员</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="content flex-sub">
								<view class="text-grey">正义天使 凯尔</view>
								</view>
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
				
			};
		}
	}
</script>

<style lang="less">

</style>
