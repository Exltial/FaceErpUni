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
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="content">
					<view class="text-grey">凯尔</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">签到时间:09:30 <br /> 签退时间:22:00</text>
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">正常</view>
					<view class="cu-tag round bg-green sm"></view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<view class="text-grey">谭磊</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="margin-right-xs">签到时间:09:30<br />签退时间:16:00</text>
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">异常</view>
					<view class="cu-tag round bg-red sm"></view>
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
