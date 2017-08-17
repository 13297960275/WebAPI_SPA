'use strict';

app.controller('headerCtrl', function ($scope, $state) {
    $scope.doLogout = function () {
        $state.go('login');
    };

    $scope.resetPwd = function () {
        alert('resetPwd');
    };
});

// app.controller('footerCtrl', function ($rootScope, $scope, $state, $translate) {
//     $scope.langs = [
// 	    { lang: 'English - US', langKey: 'en-us' },
// 	    { lang: '中文 - 繁體', langKey: 'zh-tw' },
// 	    { lang: '中文 - 简体', langKey: 'zh-cn' }
//     ];

//     $scope.langSelected = function (v) {
//         $translate.use(v);
//         //$scope.$emit('langChanged', v);
//         //console.log(v);
//         //var currentUrlHash = '' + window.location.hash;
//         //var rout = currentUrlHash.replace(/#+\/+([a-zA-Z0-9_\-])+\//, '.');
//         //console.log(currentUrlHash);
//         //console.log(rout);
//         //if (currentUrlHash == '' || currentUrlHash == null) {
//         //    v = 'zh-tw' + rout;
//         //} else {
//         //    v += rout;
//         //}
//         //console.log(v);
//         //$state.go(v);
//     };

//     //$scope.changeLanguage = function (langKey) {
//     //    $translate.use(langKey);
//     //};
// });

app.controller('menuCtrl', function ($scope, $state) {
    jQuery(".arrow-down").hide();
    jQuery("#ecsMenu").click(function(){
            jQuery("#ECSitem").slideToggle();
            jQuery(this).find(".arrow-up, .arrow-down").toggle();
    });
    jQuery(".icon-menu-hamburger").click(function(){
            jQuery('.top-menu').addClass('open').slideDown();
            jQuery('.icon-menu-hamburger').css('visibility','hidden');
            jQuery('.icon-menu-close').css('visibility','visible');
    }); 
    jQuery(".icon-menu-close").click(function(){
            jQuery('.top-menu').addClass('open').slideUp();
            jQuery('.icon-menu-hamburger').css('visibility','visible');
            jQuery('.icon-menu-close').css('visibility','hidden');
    });
    
    $scope.goToCustomer = function () {
        $state.go('main.customerMgt');
    };

    $scope.goToSubscription = function () {
        $state.go('main.subscription');
    };

    $scope.goToKeystore = function () {
        $state.go('main.keystore');
    };
});

// app.controller('mainCtrl', function ($scope, $state) {
//     //$scope.goToCust = function () {
//     //    alert('main');
//     //    jQuery('div.modal-backdrop.fade.in').remove();
//     //    alert('haha');
//     //    $state.go('main.custMgt');
//     //};
// });