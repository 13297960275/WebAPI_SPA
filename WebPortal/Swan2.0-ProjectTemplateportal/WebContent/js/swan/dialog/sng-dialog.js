//angular.module('swan.ui.dialog', ['ui.bootstrap', 'pascalprecht.translate', 'pathModule'])
angular.module('swan.ui.dialog', ['pathModule','ui.bootstrap'])
.run(["$templateCache", templateCacheFn])
//dialog服务，可以用于在js中直接打开dialog，config为配置对象
.factory("dialog", ['$uibModal', function($uibModal) {
	var dialog = {
		openDialog: function(config) {
			var modalInstance = $uibModal.open({
                 templateUrl: config.templateUrl || '_dialogTemplate/' + config.type + '.html',
                 controller: config.controller || config.type + 'CtrlModalInstance', // 初始化modal的scope
                 size: config.size || '', //大小配置
                 backdrop: 'static',
                 windowTemplateUrl: '_dialogTemplate/windowTemplateUrl.html',
                 resolve: {
                     data: config
                 }
            });
			return modalInstance;
		}
	}
	return dialog;
}])
//notify modal controller，cancel函数：点击按钮关闭modal
.controller('notifyCtrlModalInstance', function($scope, $uibModalInstance, data) { //依赖于modalInstance
    $scope.modalConfig = data;
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel'); // 退出
    }
})
//confirm modal controller：ok函数：点击按钮关闭modal，提交请求；cancel函数，点击按钮关闭modal，取消请求
.controller('confirmCtrlModalInstance', function($scope, $uibModalInstance, data) { //依赖于modalInstance
    $scope.modalConfig = data;
    $scope.editItem = data.editItem? angular.extend({}, data.editItem) : {};
    $scope.ok = function() {
        if (typeof $scope.modalConfig.ok == 'function') {
        	$scope.modalConfig.ok($scope.editItem);
			$uibModalInstance.close("confirm"); //操作成功后关闭模态框
        }
        $uibModalInstance.close("confirm"); //关闭并返回当前选项
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel'); // 退出
    }
})
//edit modal controller：ok函数：点击按钮关闭modal，提交请求（修改或新增内容）；cancel函数，点击按钮关闭modal，取消请求
.controller('editCtrlModalInstance', function($scope, $uibModalInstance, data) { //依赖于modalInstance
    $scope.modalConfig = data;
    $scope.editItem = data.editItem? angular.extend({}, data.editItem) : {};
    $scope.ok = function() {
        if (typeof $scope.modalConfig.ok == 'function') {
        	var flag = $scope.modalConfig.ok($scope.editItem);
        	if(flag == false) {
        		return;
        	} else {
        		$uibModalInstance.close("edit"); //操作成功后关闭模态框
        	}
        	
        }
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel'); //退出
    }
    
    $scope.reset = function() {
    	$scope.user.account = "";
    }
})
.controller('progressCtrlModalInstance', function($scope, $uibModalInstance, data, $rootScope, $timeout) { //依赖于modalInstance
    $scope.modalConfig = data;
    $scope.modalConfig.errorMsg = '';

    $scope.$watch('modalConfig.progress', function(newValue, oldValue) {
    	if(newValue == 100) {
    		//$scope.modalConfig.msg = "complete";
    		$timeout(function() {
         		$uibModalInstance.close();
                 $scope.$destroy();
         	}, 2000);
    	}
    })
    var _progress = 0;
    var count = 0;
    //判断超时
    var _fakeWaitProgress = function(data) {
        $timeout(function() {
            if (_progress < 100) {
            	 if (count == 9 && _progress == data) {
            		 $scope.modalConfig.errorMsg = 'Upload Error!Timeout!'
                 	$timeout(function() {
                 		$uibModalInstance.close();
                        $scope.$destroy();
                 	}, 2000);
                 	return;
                 }
            	_progress = data;
                _fakeWaitProgress($scope.modalConfig.progress);
                count ++;
            }
        }, 1000);
    };
    _fakeWaitProgress($scope.modalConfig.progress);
})
.directive('dialogDrt', ['$uibModal', 'swanRelativePath', function($uibModal, swanRelativePath) {
    return {
        restrict: "AC",
        scope: true,
        link: function(scope, iElement, iAttrs) {
        	scope.openDialog = function(obj) { //打开模态 
        		if( typeof(obj) != 'undefined') {
        			scope.messageConfig.editItem = obj;
        		}
                 var modalInstance = $uibModal.open({
                     templateUrl: iAttrs.templateUrl || swanRelativePath + 'swan/dialog/template/' + scope.messageConfig.type + '.html',
                     //dialog所属controller
                     controller: scope.messageConfig.controller || scope.messageConfig.type + 'CtrlModalInstance', // 初始化modal的scope
                     size: scope.messageConfig.size || '', //大小配置
                     windowTemplateUrl: '_dialogTemplate/windowTemplateUrl.html',
                     resolve: {
                         data: scope.messageConfig
                     }
                 });
             }
        }
    }
}]);

function templateCacheFn($templateCache){
	$templateCache.put("_dialogTemplate/windowTemplateUrl.html",
			  "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\" " +
			  		"uib-modal-animation-class=\"fade\" modal-in-class=\"in\" " +
			  				"ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\">\n" +
			    "<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\" style=\"{{size}}\">\n" +
			    	"<div class=\"modal-content\" uib-modal-transclude style=\"{{size}}\"></div>\n" +
			    "</div>\n" +
			"</div>\n"
		  );
	$templateCache.put("_dialogTemplate/notify.html",
	"<div class=\"modal-header dialog-header-notify\"> " +
	  "<button type=\"button\" class=\"close\" ng-click=\"cancel()\" class=\"pull-right\">&times;</button> " +
	  "<h4 class=\"modal-title text-info\"> " +
	    "<span translate=\"{{modalConfig.header}}\" class=\"{{modalConfig.icon}}\"></span> " +
	  "</h4> " +
	"</div> " +
	"<div class=\"modal-body text-info\" translate=\"{{modalConfig.content}}\"> " +
	"</div> " +
	"<div class=\"modal-footer\"> " +
	  "<button type=\"button\" class=\"btn btn-primary\" ng-click=\"cancel()\" translate> ok" +
	  "</button> " +
	"</div> " 
	);
	$templateCache.put("_dialogTemplate/confirm.html",
			"<div class=\"modal-header dialog-header-confirm\">" +
	  "<button type=\"button\" class=\"confirm close glyphicon glyphicon-remove\" ng-click=\"cancel()\"></button>" +
	  "<h4 class=\"modal-title\">" +
	    "<span translate=\"{{modalConfig.header}}\" class=\"{{modalConfig.icon}}\"></span>" +
	  "</h4>" +
	"</div>" +
	"<div class=\"modal-body\" translate=\"{{modalConfig.content}}\">" +

	"</div>" +
	"<div class=\"modal-footer\">" +
	 " <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\" translate>ok" +
	  "</button>" +
	  "<button type=\"button\" class=\"btn btn-warning\" ng-click=\"cancel()\" translate>no" +
	  "</button>" +
	"</div>" 
	);
	$templateCache.put("_dialogTemplate/edit.html",
			"<div class=\"modal-header dialog-header-edit\">" +
	 " <button type=\"button\" class=\"confirm close glyphicon glyphicon-remove\" ng-click=\"cancel()\"></button>" +
	  "<h4 class=\"modal-title\">" +
	    "<span translate=\"{{modalConfig.header}}\" class=\"{{modalConfig.icon}}\"></span>" +
	  "</h4>" +
	"</div>" +
	"<div class=\"modal-body\" ng-include=\"modalConfig.content\">" +

	"</div>" +
	"<div class=\"modal-footer\">" +
	  "<button type=\"button\" class=\"btn btn-info\" ng-click=\"ok()\" translate>ok" +
	 " </button>" +
	 " <button type=\"button\" class=\"btn btn-warning\" ng-click=\"cancel()\" translate> no" +
	  "</button>" +
	"</div>"
	);
	/*$templateCache.put("_dialogTemplate/progress.html",
			<div class="modal-header dialog-header-wait">
  	<h4 class="modal-title">
    	<span translate="{{modalConfig.header}}" class=""></span> 
    	<!-- {{modalConfig.header}} -->
  	</h4>
</div>
<div class="modal-body">
  	<p style="color:red">{{modalConfig.errorMsg}}</p>
  	<div class="progress progress-striped active">
    <!-- <div class="progress-bar progress-bar-info" style="width: {{modalConfig.progress}}"></div> -->
    	<uib-progressbar value="modalConfig.progress"></uib-progressbar>
  	</div>
  	<div class="text-center bold">
  		{{modalConfig.progress}}%
  	</div>
</div>
	);*/
}