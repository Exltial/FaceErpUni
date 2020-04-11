<template>
	<view>
		<view class="bg-white padding-lr">
			<view class="solids-bottom padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xsl padding">
						<text class=" cuIcon-servicefill text-green"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-gradual-pink padding-lr">
			<view class="solids-bottom padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xsl padding">
						<text class="text-box text-bold">FaceERP</text>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white padding-lr">
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @tap="fun.navigateTo('/pages/index/index')">登陆</button>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green lg" @tap="fun.navigateTo('/pages/registry/registry')">注册</button>
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
