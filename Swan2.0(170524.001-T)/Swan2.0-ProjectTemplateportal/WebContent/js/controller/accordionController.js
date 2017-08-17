app.controller('accordionController', function ($scope, $window, $http, server, $rootScope, dialog) {    
    $scope.status = {
		isCustomHeaderOpen: false,
		isFirstOpen: true,
		isFirstDisabled: false
    };
    
    /*$scope.mainPageMenu = [];
	
	$http({
		url: server + "login/getUserMenuList", 
		method:"POST", 
		data:{
			tokenId: $window.sessionStorage.tokenId,
			userId: $window.sessionStorage.userId
		}
	}).success(function(data) {
		if(data.status == "0000") {
			angular.forEach(data.data.menuList, function(data,index) {
				$scope.mainPageMenu.push({name: data.menuName, url: data.menuUrl})
			})
		} else {
			$scope.notifyConfig.content = "菜单获取失败，请重新登陆！";
			dialog.openDialog($scope.notifyConfig);
			//$state.go("login");
		}
	});*/
	
})