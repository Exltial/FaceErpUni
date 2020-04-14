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
				<button class="cu-btn bg-blue lg" @tap="startSoterAuthenticationFaceID">登陆</button>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green lg" @tap="fun.navigateTo('/pages/registry/registry')">注册</button>
			</view>
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
</template>

<script>
	export default {
		data() {
			return {
				loadModal: false,
				modalName: null,
				modalContent: null,
				faceId: null
			};
		},
		methods: {
			showModal(e) {
				this.modalName = 'Modal'
			},
			hideModal(e) {
				this.modalName = ''
			},
			startSoterAuthenticationFaceID() {
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'],
					success: function(res) {
						_this.loadModal = true;
						//上传图像得到脸部ID
						uni.uploadFile({
							url: _this.remoteUrl + '/user/getFaceId', // 登录接口
							filePath: res.tempFilePaths[0], // uni.chooseImage函数调用后获取的本地文件路劲
							name: 'file', //后端通过'file'获取上传的文件对象
							success: (res) => {
								let data = JSON.parse(res.data)
								if (data.success) {
									_this.faceId = data.data;
									_this.doLogin();
								} else {
									_this.modalContent = data.message;
									_this.showModal();
								}
							},
							error: (err) => {
								_this.loadModal = false;
								_this.modalContent = err;
								_this.showModal();
							},
							complete: (mes) => {
								_this.loadModal = false;
							}
						});
					}
				});
			},

			//登陆
			doLogin() {
				let _this = this;
				let data = {
					faceId: this.faceId
				}
				uni.request({
					url: this.remoteUrl + '/user/login',
					data: data,
					method: "POST",
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						let data = res.data;
						if (data.success) {
							_this.storageKey(res.data.data);
						} else {
							_this.loadModal = false;
							_this.modalContent = data.message;
							_this.showModal();
						}
					}
				});
			},
			storageKey(session){
				let _this = this;
				uni.setStorage({
					key:'Authorization',
					data:session,
					success:function() {
						_this.loadModal = false;
						_this.fun.navigateTo("/pages/index/index");
					}
				})
			}
		}
	}
</script>

<style lang="less">

</style>
