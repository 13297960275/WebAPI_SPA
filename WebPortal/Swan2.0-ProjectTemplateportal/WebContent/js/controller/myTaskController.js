app.controller("myTaskController",function($scope, $http, dialog) {  
	var tableErrorFunction = function(data) {
		var messageConfig = {
			size: 'sm',
			type: 'notify',
			//modal header 内容
			header: 'notification',
			//modal body内容
			content: '列表获取失败！错误码'+ data.status,
			//icon样式,modal header文字前的图标
			icon: 'glyphicon glyphicon-edit'
		};
		dialog.openDialog(messageConfig);
	}
	$scope.paginationConfig = {
		url : "../json/myTask.json",
		method: "GET",
		pageFront: true,
		itemsPerPage: 10,
		maxSize: 4,
		totalItems: "",
		totalItemsKey: "totalItems",
		successStatus: "0000",
		formData: {},
		tableErrorFn: tableErrorFunction
	};	
});
app.controller("editMyTaskStartDateController", function($scope) {
	$scope.today = function() {
		$scope.editItem.actualStart = new Date();
	};
	$scope.clear = function() {
		$scope.editItem.actualStart = null;
	};
	$scope.actualStartDate = new Date(Date.parse($scope.editItem.actualStart));

	$scope.open = function() {
		$scope.opened = true;
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	$scope.$watch("actualStartDate",function(newValue, oldvalue) {
		var month = parseInt(newValue.getMonth())+1
		$scope.editItem.actualStart = newValue.getFullYear() + "/" + month + "/" + newValue.getDate();
		$scope.minDate = newValue;
	});
});
app.controller("editMyTaskFinishDateController", function($scope) {
	$scope.today = function() {
		$scope.editItem.actualFinish = new Date();
	};
	$scope.clear = function() {
		$scope.editItem.actualFinish = null;
	};
	$scope.actualFinishDate = new Date(Date.parse($scope.editItem.actualFinish));
	$scope.open = function() {
		$scope.opened = true;
	};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	$scope.$watch("actualFinishDate",function(newValue, oldvalue) {
		var month = parseInt(newValue.getMonth())+1
		$scope.editItem.actualFinish = newValue.getFullYear() + "/" + month + "/" + newValue.getDate();
	});
	$scope.minDate = new Date();
});
app.controller("mytaskChartController", function($scope, dialog){
	$scope.messageConfig = {
		size: 'md',
		type: 'edit',
		//modal header 内容
		header: 'chart',
		//modal body内容
		content: 'dialogTemplate/myTaskChart.html',
		//icon样式,modal header文字前的图标
		icon: 'glyphicon glyphicon-edit'
	}
	
	$scope.openDialog = function() {
		dialog.openDialog($scope.messageConfig);
	}
})