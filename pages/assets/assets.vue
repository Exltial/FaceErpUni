<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">固资</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 固资列表
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="content">
					<view class="text-green text-xl">计算机</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">BJ250<br />谭磊</text><br />实验室1036<br />创建者:谭磊
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
					<view class="text-green text-xl">摄像头</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">BA250<br />谭磊</text><br />实验室1036<br />创建者:谭磊
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
