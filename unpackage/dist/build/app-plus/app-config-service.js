
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/attendance/attendance","pages/assets/addAssets","pages/registry/registry","pages/achievement/achievement","pages/assets/assets","pages/notice/notice","pages/notice/addNotice","pages/achievement/addAchievement","pages/user/user"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"FaceERP","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","navigationStyle":"custom"},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"FaceERP","compilerVersion":"2.5.1","entryPagePath":"pages/login/login","networkTimeout":{"request":6000,"connectSocket":6000,"uploadFile":6000,"downloadFile":6000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/attendance/attendance","meta":{},"window":{}},{"path":"/pages/assets/addAssets","meta":{},"window":{}},{"path":"/pages/registry/registry","meta":{},"window":{}},{"path":"/pages/achievement/achievement","meta":{},"window":{}},{"path":"/pages/assets/assets","meta":{},"window":{}},{"path":"/pages/notice/notice","meta":{},"window":{}},{"path":"/pages/notice/addNotice","meta":{},"window":{}},{"path":"/pages/achievement/addAchievement","meta":{},"window":{}},{"path":"/pages/user/user","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});