(function () {
	angular.module('Demo', [])
	.config(["$cookiesProvider",cookiesFn ])
      	function cookiesFn($cookiesProvider) {
			var date = new Date();
		    date.setDate(date.getHours() + 2);
		    var expires = date;
          	$cookiesProvider.defaults = {
          		path: "../",
          		expires: expires,
          		secure: true
          	};
		}
}());