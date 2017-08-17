angular.module('swan.service.dateCustomModule', [])
.factory('dateSettingService',function(){
	var currDay = new Date;
	var minDate = {
		year:currDay.getFullYear(),
		month: currDay.getMonth(),
		day:1
	};
	var maxDate = {
		year:currDay.getFullYear(),
		month: (currDay.getMonth()) + 1,
		day:1
	};
	var dateSetting = {
		getMinDate: function(){ return minDate; },
		getMaxDate: function(){ return maxDate; },
		setMinDate: function(date){
			if(date == undefined) return;
			minDate = {
				year:date.getFullYear(),
				month: date.getMonth(),
				day:date.getDate()
			};
			return minDate;
		},
		setMaxDate: function(date){
			maxDate = {
				year:date.getFullYear(),
				month: date.getMonth(),
				day:date.getDate()
			};
			return maxDate;
		}
	}
 	return dateSetting;
});
