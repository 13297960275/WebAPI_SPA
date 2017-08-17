app.controller("registerController", function($scope) {
	$scope.messageConfig = {
		size: 'md',
		type: 'regist',
		//modal header 
		header: 'register',
		//modal body
		content: 'dialogTemplate/register.html',
		icon: 'glyphicon glyphicon-edit'
	}
});


app.controller('registCtrlModalInstance', function($scope, $uibModalInstance, data, $uibModal, dialog) { 
    $scope.modalConfig = data;
    $scope.account = 123;
    
    $scope.ok = function() {
        if (typeof $scope.modalConfig.ok == 'function') {
        	$scope.cancel(); 
        }
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel'); //关闭dialog
    }
    
    $scope.messageConfig = {
		size: 'md',
		type: 'notify',
		//modal header
		header: 'success',
		//modal body
		content: 'Success!',
		icon: 'glyphicon glyphicon-edit'
	};
	$scope.reset = function() {
    	$scope.account = "";
    	//$scope.cancel();
    	dialog.openDialog($scope.messageConfig);
    }
});