app.controller("indexController", function($scope,language) {
	$scope.languageArray = language;
	$scope.language = {lang:language[0]};
});
app.controller("headerCtrl", function($scope, $location, userService) {
    $scope.logout = function() {
        $location.path("/login");
    };
    $scope.userName = userService.userName;
});