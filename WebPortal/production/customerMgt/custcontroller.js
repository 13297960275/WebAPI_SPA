'use strict';

app.controller('custcontroller', function ($scope, $state) {
    $scope.goToAddPartner = function () {
        $state.go('main.addPartner')
    };

    $scope.goToAddCustomer = function () {
        $state.go('main.addCustomer')
    };

    $scope.goToPartnerDetail = function () {
        $state.go('main.partnerDetail')
    };

    $scope.goToCustomerDetail = function () {
        $state.go('main.customerDetail')
    };

})