'use strict';

app.controller('indexCtrl', function ($scope,$rootScope,  $state) {
    $scope.languageArray = language;
    $scope.language = { lang: language[0] };

    $state.go('login');
});

app.controller('headerCtrl', function ($scope, $state) {
    $scope.doLogout = function ($scope, $state) {
        $state.go('login');
    };

    $scope.resetPwd = function ($scope, $state) {
        alert('haha');
    };
});

app.controller('footerCtrl', function ($rootScope, $scope, $state, $translate) {
    $scope.langs = [
	    { lang: 'English - US', langKey: 'en-us' },
	    { lang: '中文 - 繁體', langKey: 'zh-tw' },
	    { lang: '中文 - 简体', langKey: 'zh-cn' }
    ];

    $scope.langSelected = function (v) {
        $translate.use(v);
        //$scope.$emit('langChanged', v);
        //console.log(v);
        //var currentUrlHash = '' + window.location.hash;
        //var rout = currentUrlHash.replace(/#+\/+([a-zA-Z0-9_\-])+\//, '.');
        //console.log(currentUrlHash);
        //console.log(rout);
        //if (currentUrlHash == '' || currentUrlHash == null) {
        //    v = 'zh-tw' + rout;
        //} else {
        //    v += rout;
        //}
        //console.log(v);
        //$state.go(v);
    };

    //$scope.changeLanguage = function (langKey) {
    //    $translate.use(langKey);
    //};
});

app.controller('menuCtrl', function ($scope, $state) {
    //toggle ECS menu
    jQuery('.arrow-down').hide();
    jQuery('#ecsMenu').click(function () {
        jQuery('#ECSitem').slideToggle();
        jQuery(this).find('.arrow-up, .arrow-down').toggle();
    });
    jQuery('.icon-menu-hamburger').click(function () {
        jQuery('.top-menu').addClass('open').slideDown();
        jQuery('.icon-menu-hamburger').css('visibility', 'hidden');
        jQuery('.icon-menu-close').css('visibility', 'visible');
    });
    jQuery('.icon-menu-close').click(function () {
        jQuery('.top-menu').addClass('open').slideUp();
        jQuery('.icon-menu-hamburger').css('visibility', 'visible');
        jQuery('.icon-menu-close').css('visibility', 'hidden');
    });

    $scope.goToRatecard = function () {
        $state.go('main.rateCard');
    };
});

app.controller('loginCtrl', function ($scope, $state) {
    var redirectUri = 'http://localhost:50965/production/common/index.html#/main.custMgt';
    var clientId = '80c63a44-4c0e-4ebd-b898-4f5f0b8a2e8a';
    var str = '?response_type=code';
    str += '&redirect_uri=' + redirectUri;
    str += '&client_id=' + clientId;
    str += '&prompt=login';
    var loginUrl = 'https://login.microsoftonline.com/common/oauth2/authorize' + str;
    $scope.doLogin = function () {
        $state.go('main.custMgt');
        //window.location.href = loginUrl;
    };
});

app.controller('mainCtrl', function ($scope, $state) {
    //$scope.goToCust = function () {
    //    alert('main');
    //    jQuery('div.modal-backdrop.fade.in').remove();
    //    alert('haha');
    //    $state.go('main.custMgt');
    //};
});