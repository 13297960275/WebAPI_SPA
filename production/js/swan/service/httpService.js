
angular.module('swan.service.httpService', [])
.factory('httpFactory', ['$http', '$timeout', function($http, $timeout) {
	var httpFactory = {
		get: function(url, params, successFn, errorFn) {
			return $http({method: "GET",url: url,params: params});
		},
		post: function(url, params, data, successFn, errorFn){
			return $http({method: "post", url: url, data: data});
		}
	}
	return httpFactory;
}]);
