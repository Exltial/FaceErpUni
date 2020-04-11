<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">成果</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">名称</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">类型</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'成果类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">链接</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">作者</view>
				<input name="input"></input>
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
				index: -1,
				picker: ['专利', '期刊']
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			}
		}
	}
</script>

<style>

</style>
