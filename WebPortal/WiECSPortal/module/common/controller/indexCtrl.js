'use strict';

app.controller('indexCtrl', function ($scope,$rootScope,$translate,  $state) {
    // $state.go('login');
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