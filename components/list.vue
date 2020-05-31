<template>
	<view>
		<!-- 普通列表 -->
		<view v-if="listType === 1">
			<view v-for="(items,mark) in normalList" :key="mark">
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-title text-orange "></text> {{items.title}}
					</view>
				</view>
				<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
					<view class="cu-item" v-for="(item,index) in items.list" :key="index" v-if="index<gridCol*2" @tap="toNext(item)">
						<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
							<view class="cu-tag badge" v-if="item.badge!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 左滑列表 -->
		<view class="cu-list menu-avatar" v-else-if="listType===2">
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in moveList" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" @longtap="item.tap">

				<view class="content">
					<view class="text-grey">{{item.title}}</view>
					<view class="text-gray text-sm">
						<text class=" margin-right-xs"></text> {{item.content}}</view>
					<view v-if="item.remark!=null" class="text-gray text-sm"><text class=" margin-right-xs"></text> {{item.remark}}</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs achievementDate">{{item.date}}</view>
					<view :class="item.type==0?'cu-tag round bg-green sm':(item.type==99?'':'cu-tag round bg-blue sm')">{{item.typeName}}</view>
				</view>
				<view class="move">
					<view v-if="item.button1!=null" class="bg-grey" @tap="item.tap1">{{item.button1}}</view>
					<view v-if="item.button2!=null" class="bg-blue" @tap="item.tap2">{{item.button2}}</view>
					<view v-if="item.button3!=null" class="bg-red" @tap="item.tap3">{{item.button3}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			listType: {
				type: Number,
				default () {
					return 1
				}
			},
			normalList: {
				type: Array,
				default () {
					return [{
						title: {
							type: String,
							default () {
								return '考勤'
							}
						},
						list: {
							type: Array,
							default () {
								return [{
									cuIcon: 'commandfill',
									color: 'red',
									badge: 0,
									name: '签到',
									type: 0
								}, {
									cuIcon: 'commandfill',
									color: 'black',
									badge: 0,
									name: '签退',
									type: 1
								}, {
									cuIcon: 'upstagefill',
									color: 'cyan',
									badge: 0,
									name: '考勤历史',
									type: 2
								}]
							}
						}
					}]
				}
			},
			moveList: {
				type: Array,
				default () {
					return [{
						title: '谭磊',
						content: '',
						remark: '',
						date: '',
						type: '',
						button1: '',
						button2: '',
						button3: ''
					}]
				}
			}
		},
		data() {
			return {
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
			};
		},
		methods: {
			//点击List中的按钮
			toNext(obj) {
				if (obj.type == 0) {
					this.$emit('todo', obj.prop)
				} else {
					this.fun.navigateTo(obj.url)
				}

			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style lang="scss">
	.cu-list.menu-avatar>.cu-item .action {
		width: 70px;
	}

	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
