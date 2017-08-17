"use strict"
app.service('userService', function() {
	this.userId = "";
	this.userName = "";
	this.tokenId = "";
	this.targetUrl = "";
	this.randomNum = 1;
	
	this.setUserId = function(userId) {
		this.userId = userId;
	};
	this.setUserName = function(userName) {
		this.userName = userName;
	};
	this.setTokenId = function(tokenId) {
		this.tokenId = tokenId;
	};
	this.setTargetUrl = function(targetUrl) {
		this.targetUrl = targetUrl;
	};
})
.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", routeFn])
.config(["$httpProvider", function($httpProvider) {
	$httpProvider.interceptors.push(function($window) {
		var requestInterceptor = {
	        'request': function(config) {
	        	config.headers = config.headers || {};
				if ($window.sessionStorage.userId && $window.sessionStorage.tokenId) {
					config.headers.userInfo = $window.sessionStorage.userId + "|" + $window.sessionStorage.tokenId + "|" + $window.sessionStorage.targetUrl;
				}
				return config;
	        }
	    };
		return requestInterceptor;
	});
}])
.run(['$rootScope', '$state', '$window', 'userService',  function($rootScope, $state, $window, userService){
	//监听路由事件
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        if(toState.url!="/login") {
        	$window.sessionStorage.targetUrl = toState.name;
        	if(($window.sessionStorage.userId == "" || $window.sessionStorage.userId == undefined) 
        			&& ($window.sessionStorage.tokenId == "" || $window.sessionStorage.tokenId == undefined)) {
        		event.preventDefault();
        		$state.go("login");
        	}
        }
	})
}]);

function routeFn($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider.state("login", {
      url: "/login",
      views: {
        "": {
          templateUrl: "login.html",
          controller: "loginController"
        }
      },
      resolve: {
    	  loadModule: ["$ocLazyLoad", function($ocLazyLoad) {
  	        return $ocLazyLoad.load(['swan.ui.bootstrap',
  	            'swan.service.translate',
  	            'swan.service.httpService',
  	            'swan.service.validation',
  	            'swan.ui.pagination',
  	            'swan.ui.dialog'
  	        ]);
          }],
          loadMyCtrl: ['$ocLazyLoad', 'loadModule', function($ocLazyLoad, loadModule) {
              return $ocLazyLoad.load({
                  files: ['../js/controller/loginController.js',
                          '../js/controller/registerController.js']
              });
          }]
      }
    })
    .state("mainPage", {
      url: "/mainPage",
      views: {
        "": {
          templateUrl: "mainPage.html"
        }
      },
      resolve: {
    	  loadModule: ["$ocLazyLoad", function($ocLazyLoad) {
    	        return $ocLazyLoad.load(['swan.ui.chart',
    	            'swan.ui.bootstrap',
    	            'swan.service.translate',
    	            'swan.service.httpService',
    	            'swan.service.validation',
    	            'swan.ui.pagination',
    	            'swan.ui.dialog',
    	            'swan.service.fileUpload',
    	            'swan.ui.tree'
    	        ]);
            }],
            loadMyCtrl: ['$ocLazyLoad', 'loadModule', function($ocLazyLoad, loadModule) {
                return $ocLazyLoad.load({
                    files: ['../js/controller/accordionController.js',
                    '../js/controller/chartController.js',
                    '../js/controller/paginationController.js']
                });
            }]
      }
    })
    .state("mainPage.projectList", {
      url: "/projectList",
      views: {
        "": {
          templateUrl: "projectList.html",
          controller: "pagerCtrl"
        }
      },
      resolve: {
        deps: ["$ocLazyLoad", function($ocLazyLoad) {
          return $ocLazyLoad.load(['../js/controller/paginationController.js']);
        }]
      }
    })
    .state("mainPage.projectDetail", {
      url: "/projectDetai",
      views: {
        "": {
          templateUrl: "projectDetail.html",
          controller: "projectDetailController"
        }
      },
      resolve: {
        deps: ["$ocLazyLoad", function($ocLazyLoad) {
          return $ocLazyLoad.load(['../js/controller/projectDetailController.js']);
        }]
      }
    })
    .state("mainPage.myTask", {
      url: "/myTask",
      views: {
        "": {
          templateUrl: "myTask.html",
          controller: "myTaskController"
        }
      },
      resolve: {
        deps: ["$ocLazyLoad", function($ocLazyLoad) {
          return $ocLazyLoad.load(['../js/controller/myTaskController.js',
            '../js/controller/projectDetailController.js',
            '../js/controller/editMyTaskController.js'
          ]);
        }]
      }
    });
};