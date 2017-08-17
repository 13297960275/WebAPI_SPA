app.controller("projectDetailController", function($scope) {
	$scope.paginationConfig = {
		url: "../json/projectDetail.json",
		method: "GET",
		pageFront: true,
		itemsPerPage: 10,
		maxSize: 3,
		totalItemsKey: "totalItems",
		formData: {}
	};
});
app.controller("removeController", function($scope, $http, dialog) {
	var okFunction = function(obj) {
		$http({
			method: 'POST',
			url: '',
			data: obj
		}).success(function() {
			
		});
	};
	$scope.messageConfig = {
		size: 'sm',
		type: 'confirm',
		//modal header 内容
		header: 'remove',
		//modal body内容
		content: 'Remove?',
		//icon样式,modal header文字前的图标
		icon: 'glyphicon glyphicon-check',
		ok: okFunction
	}
	$scope.openDialog = function(item) {
		$scope.messageConfig.editItem = item;
		dialog.openDialog($scope.messageConfig);
	}
});
/*app.controller("editController", function($scope, $http, dialog) {
	var okFunction = function() {
		$http({
			method: 'POST',
			url: '',
			data: ''
		}).success(function() {
			
		});
	}
	$scope.messageConfig = {
		type: 'edit',
		//modal header 内容
		header: 'edit',
		//modal body内容
		content: 'dialogTemplate/editProjectTask.html',
		//icon样式,modal header文字前的图标
		icon: 'glyphicon glyphicon-edit',
		editItem: {},
		openedClass: "testClass",
		ok: okFunction,
		templateUrl:"dialogTemplate/dialogTest.html",
		size: "width:600px;height:420px"

	}
	
	$scope.openDialog = function(obj) {
		$scope.messageConfig.editItem = obj;
		dialog.openDialog($scope.messageConfig);
	}
});*/
app.controller("submitController", function($scope) {
	$scope.ok = function(){
		alert("click ok!");
		$scope.cancel();
	}
});
app.controller("addTaskController", function($scope) {
	$scope.messageConfig = {
		size: 'md',
		type: 'edit',
		//modal header 内容
		header: 'add',
		//modal body内容
		content: 'dialogTemplate/addProjectTask.html',
		//icon样式,modal header文字前的图标
		//glyphicon glyphicon-warning-sign、glyphicon glyphicon-time-sign、glyphicon glyphicon-info-sign、glyphicon glyphicon-check
		icon: 'glyphicon glyphicon-edit'
	}
});
app.controller("editTaskStartDateController", function($scope) {
	$scope.today = function() {
		$scope.editItem.actualStart = new Date();
	};
	$scope.clear = function() {
		$scope.editItem.actualStart = null;
	};
	$scope.actualStartDate = new Date(Date.parse($scope.editItem.actualStart));

	$scope.open = function() {
		$scope.startOpened = true;
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	$scope.$watch("actualStartDate", function(newValue, oldvalue) {
		var month = parseInt(newValue.getMonth()) + 1;
		$scope.editItem.actualStart = newValue.getFullYear() + "/" + month + "/" + newValue.getDate();
	});
	
	$scope.dateOptions = {
		showWeeks:true,
		startingDay:1
	};
});
app.controller("editTaskFinishDateController", function($scope) {
	$scope.today = function() {
		$scope.editItem.actualFinish = new Date();
	};
	$scope.clear = function() {
		$scope.editItem.actualFinish = null;
	};
	$scope.actualFinishDate = new Date(Date.parse($scope.editItem.actualFinish));
	$scope.open = function() {
		$scope.endOpened = true;
	};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	$scope.$watch("actualFinishDate", function(newValue, oldvalue) {
		var month = parseInt(newValue.getMonth()) + 1;
		$scope.editItem.actualFinish = newValue.getFullYear() + "/" + month + "/" + newValue.getDate();
	});
	
	$scope.dateOptions = {
		showWeeks:true,
		startingDay:1
	};
});

app.controller('TimepickerDemoCtrl', function ($scope, $log) {
	  $scope.mytime = new Date();

	  $scope.hstep = 1;
	  $scope.mstep = 15;

	  $scope.options = {
	    hstep: [1, 2, 3],
	    mstep: [1, 5, 10, 15, 25, 30]
	  };

	  $scope.ismeridian = true;
	  $scope.toggleMode = function() {
	    $scope.ismeridian = ! $scope.ismeridian;
	  };

	  $scope.update = function() {
	    var d = new Date();
	    d.setHours( 14 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	  };

	  $scope.changed = function () {
	    $log.log('Time changed to: ' + $scope.mytime);
	  };

	  $scope.clear = function() {
	    $scope.mytime = null;
	  };
});



app.controller("editController", function($scope, $http, dialog) {
	var okFunction = function(obj) {
		$http({
			method: 'POST',
			url: '',
			data: obj
		}).success(function() {
			
		});
	};
	$scope.messageConfig = {
		//dialog大小,可设置为，以‘；’隔开,还可设置为sm（小），md（中），lg（大）
		//size: "width:600px;height:420px",
		size:'md',
		//dialog类型，已有edit、notify、confirm、progress
		type: 'edit',
		//modal header 内容
		header: 'edit',
		//dialog body内容,如果沿用swan中的dialog模板，则需配置该内容
		content: 'dialogTemplate/editProjectTask.html',
		//如果不用swan已有的dialog模板，则配置该属性，自己实现dialog的内容
		//templateUrl:"dialogTemplate/dialogTest.html", 
		//header图标样式
		icon: 'glyphicon glyphicon-edit', 
		//传入dialog，被编辑的内容
		editItem: {}, 
		//如果运用swan中已有的模板，给ok按钮绑定点击事件
		ok: okFunction,
		
		//dialog所属controller，如果不运用swan已有dialog模板则需实现controller内容，用于实现dialog内部功能
		//controller: ""
	}
	
	$scope.openDialog = function(obj) {
		$scope.messageConfig.editItem = obj;
		dialog.openDialog($scope.messageConfig);
	}
});