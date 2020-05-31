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
					<input name="input" v-model="tenantId"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">真实姓名</view>
					<input name="input" v-model="userName"></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">是否为管理员</view>
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green margin-tb-sm lg" @tap="startSoterAuthenticationFaceID">人脸采集</button>
				</view>
			</form>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="register">确定录入</button>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">提示</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						{{modalContent}}
					</view>
				</view>
			</view>
			<view class="cu-load load-modal" v-if="loadModal">
				<image src="/static/logo.jpg" mode="aspectFit"></image>
				<view class="gray-text">请稍候...</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadModal: false,
				switchA: false,
				modalName: null,
				modalContent: null,
				tenantId: '',
				userName: '',
				role: 'ADMIN',
				faceId: '',
				isFace: false,
				items: [{
						value: 'ADMIN',
						name: '管理员'
					},
					{
						value: 'USER',
						name: '用户'
					}
				]
			};
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			showModal(e) {
				this.modalName = 'Modal'
			},
			hideModal(e) {
				this.modalName = ''
			},
			//人脸识别
			startSoterAuthenticationFaceID() {
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'],
					success: function(res) {
						_this.loadModal = true;
						console.log(res.tempFilePaths[0])
						//上传图像得到脸部ID
						uni.uploadFile({
							url: _this.remoteUrl + '/file/uploadPic', // 后端api接口
							filePath: res.tempFilePaths[0], // uni.chooseImage函数调用后获取的本地文件路劲
							name: 'file', //后端通过'file'获取上传的文件对象
							success: (res) => {
								let data = JSON.parse(res.data)
								if (data.success) {
									_this.loadModal = false;
									_this.faceId = data.data;
									_this.isFace = true
									_this.modalContent = '识别成功';
									_this.showModal();
								} else {
									_this.loadModal = false;
									_this.isFace = false;
									_this.modalContent = data.message;
									_this.showModal();
								}
							},
							error: (err) => {
								_this.loadModal = false;
								_this.isFace = false;
								_this.modalContent = data.message;
								_this.showModal();
							}
						});
					}
				});
			},
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.tenantId.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入集体名称'
					});
					return;
				}
				if (this.userName.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					});
					return;
				}
				if (!this.isFace) {
					uni.showToast({
						title: '请先上传面部信息再进行注册',
						icon: 'none'
					});
					return;
				}
				console.log('switch:'+this.switchA)
				if (this.switchA==true) {
					this.role = 'ADMIN'
				} else {
					this.role = 'USER'
				}
				let data = {
					tenantId: this.tenantId,
					userName: this.userName,
					role: this.role,
					faceId: this.faceId
				}
				let _this = this;
				console.log(data)
				uni.request({
					url: this.remoteUrl + '/user/registry',
					data: data,
					method: "POST",
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						_this.loadModal = true;
						console.log(res.data);
						let data = res.data;
						if (data.success) {
							_this.loadModal = false;
							_this.fun.navigateTo("/pages/login/login");
						} else {
							_this.loadModal = false;
							_this.modalContent = data.message;
							_this.showModal();
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">

</style>
