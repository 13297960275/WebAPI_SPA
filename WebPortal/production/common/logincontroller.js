'use strict';

app.controller('logincontroller', function ($scope, $state) {
    $scope.doLogin = function () {
        $state.go('main');
        alert("haha");
    };
});