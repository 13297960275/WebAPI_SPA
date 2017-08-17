app.constant('language',['zh', 'en']); //url配置
app.constant("responseStatus", {
	STATUS_SUCCESS:'0000',
	STATUS_FAIL:'0001',
	USERTOKEN_EMPTY:'0002',//token为空
	USERTOKEN_EXPIRY:'0003',//token过期，跳转到login
	RESTAPI_EXPIRY:'0004',//API请求无权限
	MENUURL_EXPIRY:'0005',//URL请求无权限
});
app.factory('errorCodeService', [ '$rootScope','$state','$q','dialog','Auth', function($rootScope,$state,$q,dialog,Auth) {
	return {
		err : function(code) {
			switch (code) {
			case '0001':// 提示“操作失败”
				$rootScope.$broadcast('auth:forbidden');
				var messageConfig = {
						size : 'sm',
						type : 'notify',
						header : 'edit',
						content : '操作失败',
						icon : 'glyphicon glyphicon-edit'
					};
				dialog.openDialog(messageConfig);
				break;
			case '0002':// token为空,做登出操作
				$rootScope.$broadcast('auth:loginRequired');
				Auth.logout(function() {
		            $state.go('anon.login');
		        }, function() {
		        });
				break;
			case '0003':// token过期,提示“登入失效，請重新登入”，并做登出操作，
				var messageConfig = {
					size : 'sm',
					type : 'notify',
					header : 'notify',
					content : '登入失效，請重新登入',
					icon : 'glyphicon glyphicon-edit'
				};
				var afterClose = dialog.openDialog(messageConfig).closed;
				afterClose.then(function(){
					Auth.logout(function() {
						$state.go('anon.login');
					}, function() {
					});
				},function(error){});
				break;
			case '0004':// API请求无权限
				$rootScope.$broadcast('auth:forbidden');
				$state.go('notAccess');
				break;
			case '0005':// URL请求无权限
				$rootScope.$broadcast('auth:forbidden');
				$state.go('notAccess');
				break;
			}
			return $q.resolve(code);
		}
	};
} ]);
