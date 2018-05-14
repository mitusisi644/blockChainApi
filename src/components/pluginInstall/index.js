'use strict'
var lssPlugin = {};
lssPlugin.install = function (Vue, options) {
	/*// 1. 添加全局方法或属性
	Vue.myGlobalMethod = function () {
		// 逻辑...
	}

	// 2. 添加全局资源
	Vue.directive('my-directive', {
		bind (el, binding, vnode, oldVnode) {
		// 逻辑...
		}
		// ...
	})

	// 3. 注入组件
	Vue.mixin({
		created: function () {
		// 逻辑...
		}
		// ...
	})

	// 4. 添加实例方法
	Vue.prototype.$myMethod = function (methodOptions) {
		// 逻辑...
	}*/
	Vue.prototype.showLoad = function (){
		global.showLoading = this.$loading({
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0,0,0,0.8)'
		});
	};
	Vue.prototype.closeLoad = function(){
		showLoading.close();
	};
	Vue.prototype.successNotify = function(msg) {
		Vue.prototype.$notify({
			title: '提示',
			message: msg,
			duration: 0,
			type: 'success'
		});
		Vue.prototype.closeLoad();
	};
	Vue.prototype.errorNotify = function(msg) {
		Vue.prototype.$notify({
			title: '提示',
			message: msg,
			duration: 0,
			type: 'error'
		});
		Vue.prototype.closeLoad();
	};
	Vue.prototype.promiseAjax = function(url, data, callback) {
		//异步接口
		var p = new Promise(function (resolve, reject) {
			$.ajax({
				url: url,
				type: data == null ? 'GET' : 'POST',
				dataType: "json",
				data: data == null ? '' : JSON.stringify(data),
				async: true,
				contentType: "application/json",
				beforeSend: function (){
					Vue.prototype.showLoad();
				},
				success: function (resp) {
					callback(resp);
					resolve();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					Vue.prototype.errorNotify(XMLHttpRequest.status+" : "+XMLHttpRequest.responseText);
					reject();
				}
			});
		});
		return p;
	}
	Vue.prototype.curlRequest = function (urlPath,param,callbackFun){
		Vue.prototype.showLoad();
		const https = require('https');
		const options = {
			path: urlPath,
			method: 'DELETE'
		};
		const req = https.request(options, (res) => {
			callbackFun(res);
		});
		req.on('error', (e) => {

		});
		req.end();
	}
}

export default lssPlugin