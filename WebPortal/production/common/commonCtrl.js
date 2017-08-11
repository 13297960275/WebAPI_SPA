'use strict';

app.controller('indexCtrl', function ($scope, $state) {
    //debugger
    $state.go('login');
});

app.controller('headerCtrl', function ($scope, $state) {

});

app.controller('footerCtrl', function ($scope, $state) {
    $scope.langs = [
	    { lang: '中文 - 繁體', langKey: 'zh-tw' },
	    { lang: '中文 - 简体', langKey: 'zh-cn' },
	    { lang: 'English - US', langKey: 'en-us' }
    ];

    $scope.langSelected = function (v) {
        console.log(v);
        var currentUrlHash = '' + window.location.hash;
        var rout = currentUrlHash.replace(/#+\/+([a-zA-Z0-9_\-])+\//, '.');
        console.log(currentUrlHash);
        console.log(rout);
        if (currentUrlHash == '' || currentUrlHash == null) {
            v = 'zh-tw' + rout;
        } else {
            v += rout;
        }
        console.log(v);
        $state.go(v);
    };
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
    $scope.doLogin = function () {
        $state.go('main.custMgt');
        //alert('haha');
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