'use strict';

app.controller('loginCtrl', function ($scope, $state) {
    $scope.doLogin = function () {
        $state.go('main.custMgt');
        //alert("haha");
    };
});