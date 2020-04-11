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
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="content">
					<view class="text-green text-xxl">标题:新冠肺炎的通知</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">内容:大家在家蹲着不要出门<br />发布时间:2020-04-04</text>
						</view>
					</view>
				</view>
				<view class="action">
					<view class="padding flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn round sm">编辑</button>
					</view>
					<view class="padding flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn round sm">删除</button>
					</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-green text-xxl">标题:新冠肺炎的通知</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">内容:大家在家蹲着不要出门<br />发布时间:2020-04-04</text>
						</view>
					</view>
				</view>
				<view class="action">
					<view class="padding flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn round sm">编辑</button>
					</view>
					<view class="padding flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn round sm">删除</button>
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

<style>
	.cu-list>.cu-item {
		height: 300upx;
	}

	.cu-list.menu-avatar>.cu-item .flex .text-cut {
		font-size: 20px;
	}
</style>
