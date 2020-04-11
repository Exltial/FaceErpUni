<template>
	<view>
		<view>
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">用户注册</block>
			</cu-custom>
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">集体名</view>
					<input name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">真实姓名</view>
					<input name="input"></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">是否为管理员</view>
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green margin-tb-sm lg">人脸采集</button>
				</view>
			</form>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg">确定录入</button>
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
