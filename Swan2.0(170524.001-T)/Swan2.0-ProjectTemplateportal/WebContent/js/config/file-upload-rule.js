angular.module('angularFileUpload').config(["$httpProvider", function($httpProvider) {
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