<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">通知</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="通知内容"></textarea>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg">确定发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null
			}
		},
		methods: {
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			}
		}
	}
</script>

<style>

</style>
