app.controller("pagerCtrl", function($scope, $http, dialog) {
	var currentPage = 1;
	var itemsPerPage = 10;
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
		url: "../json/myProject.json",  //http请求的url
		method: "GET", //http请求的方式
		pageFront: true,//是否前台翻页，true：前台翻页， false：后台翻页
		itemsPerPage: 10, //每页展示条数
		maxSize: 4, //所展示的最大页码，大于该值的页码省略
		//totalItems: "", //总数，在此可设为空
		totalItemsKey: "totalItems", //当为后台翻页是，后台需提供数据总数，在此配置该值对应的key
		//currentPage: currentPage,
		successStatus: "0000", //获取成功状态码配置，如果不配置则默认为"0000"
		formData: {
			currentPage: currentPage, pageSize: itemsPerPage
		},
		tableErrorFn: tableErrorFunction
	};
	
	/*$scope.data = {
		currentPage:$scope.currentPage,
		itemsPerPage:$scope.itemsPerPage
	}*/
	$scope.gotoProjectDEtail = function() {
		location.href = "#/mainPage/projectDetail"
	}
	$scope.search = function() {
		//修改条件，触发表格刷新
		$scope.paginationConfig.formData = {};
		//$scope.$broadcast('reloadTable', 'Reload!!');
	};
	
	$scope.$watch('paginationConfig.currentPage', function(newValue) {
		$scope.paginationConfig.formData.currentPage = newValue;
	});
});
app.controller("addProjectController", function($scope, dialog) {
	$scope.messageConfig = {
		size: 'md',
		type: 'edit',
		//modal header 内容
		header: 'add',
		//modal body内容
		content: 'dialogTemplate/addProject.html',
		//icon样式,modal header文字前的图标
		icon: 'glyphicon glyphicon-edit'
	}
	
	$scope.openDialog = function() {
		dialog.openDialog($scope.messageConfig);
	}
});
app.controller("projectChartController", function($scope, dialog) {
	$scope.messageConfig = {
		size: 'md',
		type: 'edit',
		//modal header 内容
		header: 'chart',
		//modal body内容
		content: 'dialogTemplate/projectChart.html',
		//icon样式,modal header文字前的图标
		icon: 'glyphicon glyphicon-edit'
	}
	
	$scope.openDialog = function() {
		dialog.openDialog($scope.messageConfig);
	}
});
app.controller("oneProjectChartController", function($scope, dialog) {
	$scope.messageConfig = {
		size: 'md',
		type: 'edit',
		//modal header 内容
		header: 'chart',
		//modal body内容
		content: 'dialogTemplate/oneProjectChart.html',
		//icon样式,modal header文字前的图标
		icon: 'glyphicon glyphicon-edit'
	}
	
	$scope.openDialog = function() {
		dialog.openDialog($scope.messageConfig);
	}
})

app.controller("uploadFileController", function($scope, FileUploader, dialog, $interval, $http, $window, server) {
	$scope.messageConfig = {
		size: 'sm',
		type: 'notify',
		//modal header 内容
		header: 'notification',
		//modal body内容
		content: '',
		//icon样式,modal header文字前的图标
		icon: 'glyphicon glyphicon-edit'
	};
	
	$scope.failedFiles = [];
	
	$scope.uploader = new FileUploader({
		url: server + 'upload/uploadFiles',
		formData: [
			{
				accountId: $window.sessionStorage.userId,
				fileName:'swan_file_qImgUpload'
			}
		]
	});

	$scope.uploadAll = function() {
		$scope.uploader.uploadAll();
		$scope.uploading = true;
		/*var progressVal = $interval(function(){
            $http({
            	url:server + "fileStatus/upfile/progress",
            	method:"POST"}).success(function(data) {
            		$scope.progress = parseInt(data.data.percent.split("%")[0]);
            		alert($scope.progress + "," + data.data.percent);
            		if($scope.progress == 100) {
            			stop();
            		}
            	});
        }, 1000);
		
		var stop = function() {
			$interval.cancle(progressVal);
		};*/
	}
	
	/*$scope.uploader.filters.push({
        name: 'sizeFilter',
        fn: function(item, options) {
            return item.size/1024 < 2000;
        }
    });*/
	
	$scope.uploader.filters.push({
		name: 'filesCount',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 5;
        }
	});
	
	$scope.uploader.onSuccessItem = function(item, response, status, headers){
		console.log('onSuccessItem', response, status, headers);
	}
	
	$scope.uploader.onBeforeUploadItem = function(item){
		item.headers = {
			userInfo: $window.sessionStorage.userId + "|" + $window.sessionStorage.tokenId + "|" + $window.sessionStorage.targetUrl
		};
		item.alias = "swan_file_qImgUpload";
	}

	$scope.uploader.onProgressAll = function(progress) {
		console.info('onProgressAll', progress);
	};

	$scope.uploader.onErrorItem = function(item, response, status, headers){
		console.log('onErrorItem', response, status, headers);
	}

    // CALLBACKS
	$scope.uploader.onWhenAddingFileFailed = function(item, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
        if( filter.name == "sizeFilter" ) {
        	$scope.messageConfig.content = "添加文件失败，文件大小不可超过2M！";
        	dialog.openDialog($scope.messageConfig);
        };
        if( filter.name == "filesCount" ) {
        	$scope.messageConfig.content = "最多添加5个文件";
        	dialog.openDialog($scope.messageConfig);
        };
    };
    $scope.uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    $scope.uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    $scope.uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    $scope.uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
        //当为最后一个文件上传成功
        if(fileItem == $scope.uploader.queue[$scope.uploader.queue.length-1] && response.status == "0000") {
	        $scope.uploading = false;
	        var messageConfig = {
				size: 'sm',
				type: 'notify',
				//modal header 内容
				header: 'notification',
				//modal body内容
				content: '上传成功',
				//icon样式,modal header文字前的图标
				icon: 'glyphicon glyphicon-edit'
			};
			dialog.openDialog(messageConfig);
        }
    };
    $scope.uploader.onCompleteAll = function(response) {
        console.info('onCompleteAll----' + response);
    };
	
    $scope.filePath = "";
	$scope.files = [];
	$scope.fileSelect = function(value, files) {
		$scope.filePath = "";
		//$scope.filePath = value;
		angular.forEach(files, function(data, index) {
			$scope.files.push(data.name);
		});
		//alert(value.indexOf("\\", value.length-1));
		var filePathArray = value.split("\\");
		filePathArray = filePathArray.splice(filePathArray.length);
		var filePathString = filePathArray.join("\\");

		angular.forEach($scope.files, function(data, index) {
			data = filePathString + "\\" + data;
		})
		$scope.filePath = $scope.files.join(",");
	}
	
	
	 $scope.uploaderImg = new FileUploader({
         url: 'http://localhost:8080/Coc_ProjectTemplate/upload/uploadFiles',
         formData: [
			{
				fileType: '0',
				account: 'bugteacjer815',
				fileName:'swan_file_qImgUpload'
			}
		]
     });

     // FILTERS
	 $scope.uploaderImg.filters.push({
         name: 'imageFilter',
         fn: function(item /*{File|FileLikeObject}*/, options) {
             var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
             return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
         }
     });

     // CALLBACKS
	 $scope.uploaderImg.onAfterAddingFile = function(fileItem) {
	    console.info('onAfterAddingFile', fileItem);
	};
	$scope.uploaderImg.onWhenAddingFileFailed = function(item, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
        $scope.messageConfig.content = "请选择图片类型文件！";
        dialog.openDialog($scope.messageConfig);
    };
});

/**/

app.controller("datePickController", function($scope) {
	$scope.today = function() {
		$scope.editItem.start = new Date();
	};
	$scope.clear = function() {
		$scope.editItem.start = null;
	};

	$scope.open = function() {
		$scope.opened = true;
	};

	$scope.setDate = function(year, month, day) {
		$scope.editItem.start = new Date(year, month, day);
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
});

app.controller('porjectFinishController', function($scope) {
	$scope.today = function() {
		$scope.editItem.finish = new Date();
	};
	$scope.clear = function() {
		$scope.editItem.finish = null;
	};

	$scope.open = function() {
		$scope.opened = true;
	};

	$scope.setDate = function(year, month, day) {
		$scope.editItem.finish = new Date(year, month, day);
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];

});

app.controller('tmSelectController', function($scope) {
	//uib-popover-template="dynamicPopover.templateUrl" popover-title="{{dynamicPopover.title}}"
	$scope.dynamicPopover = {
		templateUrl: 'treeTemplate/singleMemberTree.html',
		title: "Member",
		isopen: false
	};
	$scope.treedata = [{
		"name": "IX430",
		"type": "department",
		"children": [{
			"name": "IX422",
			"type": "department",
			"children": [{
				"name": "Member A",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member B",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member C",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member D",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member E",
				"children": [],
				"checked": false,
				"type": "member"
			}]
		}]
	}];
	$scope.nodeList = [];
	$scope.closeTree = function() {
		$scope.dynamicPopover.isopen = false;
	}
	
	$scope.selectMember = function(node) {
		$scope.editItem.tm = node.name;
		$scope.dynamicPopover.isopen = false;
	}

	$scope.cancelSelect = function() {
		$scope.dynamicPopover.isopen = false;
	}
});

app.controller('pmSelectController', function($scope) {
	//uib-popover-template="dynamicPopover.templateUrl" popover-title="{{dynamicPopover.title}}"
	$scope.dynamicPopover = {
		templateUrl: 'treeTemplate/singleMemberTree.html',
		title: "Member",
		isopen: false
	};
	$scope.treedata = [{
		"name": "IX430",
		"type": "department",
		"children": [{
			"name": "IX422",
			"type": "department",
			"children": [{
				"name": "Member A"
			}, {
				"name": "Member B"
			}, {
				"name": "Member C"
			}, {
				"name": "Member D"
			}, {
				"name": "Member E"
			}]
		}]
	}];
	$scope.nodeList = [];
	$scope.closeTree = function() {
		$scope.dynamicPopover.isopen = false;
	}
	
	$scope.selectMember = function(node) {
		$scope.editItem.pm = node.name;
		$scope.dynamicPopover.isopen = false;
	}

	$scope.cancelSelect = function() {
		$scope.dynamicPopover.isopen = false;
	}
});

app.controller('sdSelectController', function($scope) {
	//uib-popover-template="dynamicPopover.templateUrl" popover-title="{{dynamicPopover.title}}"
	$scope.dynamicPopover = {
		templateUrl: 'treeTemplate/multipleMemberTree.html',
		title: "Member",
		isopen: false
	};
	$scope.treedata = [{
		"name": "IX430",
		"type": "department",
		"children": [{
			"name": "IX422",
			"type": "department",
			"children": [{
				"name": "Member A",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member B",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member C",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member D",
				"children": [],
				"checked": false,
				"type": "member"
			}, {
				"name": "Member E",
				"children": [],
				"checked": false,
				"type": "member"
			}]
		}]
	}];
	$scope.nodeList = [];
	$scope.closeTree = function() {
		$scope.dynamicPopover.isopen = false;
	}
	
	$scope.selectMember = function(node) {
		$scope.editItem.pm = node.name;
		$scope.dynamicPopover.isopen = false;
	}

	$scope.cancelSelect = function() {
		$scope.dynamicPopover.isopen = false;
	}
	
	$scope.multiSelect = function() {
		$scope.editItem.sd = '';
		$scope.nodeList = [];
		angular.forEach($scope.treedata[0].children[0].children, function(data, index) {
			$scope.checkSelect(data)
		});
		angular.forEach($scope.nodeList, function(data, index) {
			$scope.editItem.sd += data.name + ",";
		})
		$scope.editItem.sd = $scope.editItem.sd.substring(0, $scope.editItem.sd.length-1);
		$scope.dynamicPopover.isopen = false;
	}
	$scope.checkSelect = function(node) {
		if (node.checked == true) {
			$scope.nodeList.push(node)
		}
	}
});