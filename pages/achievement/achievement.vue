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
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="content">
					<view class="text-green text-xl">谭磊</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">基于HOG特征的车辆识别系统<br />http://baidu.com</text>
						</view>
					</view>
					<view class="padding flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn round sm">编辑</button>
						<button class="cu-btn round sm">删除</button>
					</view>
				</view>
				<view class="action">
					<view class="text-red text-xxl">专利</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-green">谭磊</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">基于HOG特征的车辆识别系统<br />http://baidu.com</text>
						</view>
					</view>
					<view class="padding flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn round sm">编辑</button>
						<button class="cu-btn round sm">删除</button>
					</view>
				</view>
				<view class="action">
					<view class="text-red text-xxl">期刊</view>
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
