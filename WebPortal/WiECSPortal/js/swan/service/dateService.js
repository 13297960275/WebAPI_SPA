angular.module('swan.service.dateService', [])
.factory('dateFactory', ['$http', function($http) {
	var dateFactory = {
		stringToDate: function(date, mark) {
			
			return mark=="/"?new　Date(Date.parse(date)) : 
					mark=="-"?new　 Date(Date.parse(date.replace(/-/g,　 "/"))) : 
					mark=="."?new　 Date(Date.parse(date.replace(/./g,　 "/"))) : null;
		},
		dateToString: function(date, mark){
			var month = date.getMonth() + 1;
			return date.getFullYear() + mark + month + mark + date.getDate();
		},
		longToDate: function(date) {
			var dateObj = new Date();
			return dateObj.setTime(date)
		},
		dateToLong: function(date) {
			return date.getTime();
		}
	}
	return dateFactory;
}]);