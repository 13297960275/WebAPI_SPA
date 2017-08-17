//多语言配置文件路径
app.controller("loginController", function($scope, $state, $validation, $http, userService, responseStatus, $rootScope, server, dialog, $window) {
	$scope.number = "This should be number!";
	$scope.userData = [{
		"id": 1,
		"account": "Admin",
		"password": "123456"
	}, {
		"id": 1,
		"account": "1",
		"password": "1"
	}, {
		"id": 2,
		"account": "Teela",
		"password": "123456"
	}];
	
	$scope.notifyConfig = {
		size: 'sm',
		type: 'notify',
		//modal header 内容
		header: 'notification',
		//modal body内容
		content: '',
		//icon样式,modal header文字前的图标
		//glyphicon glyphicon-warning-sign、glyphicon glyphicon-time-sign、glyphicon glyphicon-info-sign、glyphicon glyphicon-check
		icon: 'glyphicon glyphicon-edit'

	}
	
	//表单合法才能点击提交按钮
	$scope.form = {
		checkValid: $validation.checkValid
	};
	
	$scope.login = function() {
		userService.setUserId("test");
		userService.setUserName("test");
		userService.setTokenId("test");
		/*$cookies.put("userId", "test");
		$cookies.put("tokenId", "test");*/
		$window.sessionStorage.setItem("userId", "test");
		$window.sessionStorage.setItem("tokenId", "test");
		$state.go("mainPage.projectList");
		/*$http({
			url: server + "login/checkAccount", 
			method:"POST", 
			data:{
				account: $scope.user.account, 
				password: $scope.user.password
			}
		}).success(function(data) {
			if (data.status === "0000") {
				userService.setUserId(data.data.userId);
				userService.setUserName(data.data.account);
				userService.setTokenId(data.data.tokenId);
				$window.sessionStorage.setItem("userId", data.data.userId);
				$window.sessionStorage.setItem("tokenId", data.data.tokenId);
				$state.go("mainPage.projectList");
			} else{
				$scope.notifyConfig.content = "用户名或密码错误，请重新登录失败！";
				dialog.openDialog($scope.notifyConfig);
				$state.go("login");
			}
		});*/
	}

	$scope.enter = function(e) {
		var keycode = window.event ? e.keyCode : e.which;
		if (keycode == 13) { //回车
			$scope.login();
		}
	}
});