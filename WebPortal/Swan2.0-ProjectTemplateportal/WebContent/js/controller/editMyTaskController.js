app.controller("editMyTaskController", function($scope, dialog) {
	$scope.messageConfig = {
		size: 'md',
		type: 'edit',
		//modal header 内容
		header: 'edit',
		//modal body内容
		content: 'dialogTemplate/editMyTask.html',
		//icon样式,modal header文字前的图标
		//glyphicon glyphicon-warning-sign、glyphicon glyphicon-time-sign、glyphicon glyphicon-info-sign、glyphicon glyphicon-check
		icon: 'glyphicon glyphicon-edit',
		editItem: {}
	}
	
	$scope.openDialog = function(obj) {
		$scope.messageConfig.editItem = obj;
		dialog.openDialog($scope.messageConfig);
	}
})