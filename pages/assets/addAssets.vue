<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">固资</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">固资名称</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">固资编号</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">所有者</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">位置</view>
				<input name="input"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg">确定录入</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
