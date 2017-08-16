'use strict';

app.controller('subscriptionCtrl', function ($scope, $state) {
    $scope.goToSubDetail = function () {
        $state.go('main.subscriptionsDetail');
    };

    $scope.goToCust = function () {
        alert('sub');
        $state.go('main.custMgt');
    };
});