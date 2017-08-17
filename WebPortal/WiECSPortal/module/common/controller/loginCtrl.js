'use strict';

app.controller('loginCtrl', function ($scope, $state) {
    var redirectUri = 'http://localhost:50965/production/common/index.html#/main.custMgt';
    var clientId = '80c63a44-4c0e-4ebd-b898-4f5f0b8a2e8a';
    var str = '?response_type=code';
    str += '&redirect_uri=' + redirectUri;
    str += '&client_id=' + clientId;
    str += '&prompt=login';
    var loginUrl = 'https://login.microsoftonline.com/common/oauth2/authorize' + str;
    $scope.doLogin = function () {
        $state.go('main.customerMgt');
        //window.location.href = loginUrl;
    };
});