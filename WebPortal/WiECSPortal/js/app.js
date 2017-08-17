'use strict';
var pathModule = angular.module("pathModule", []); //初始化路径模块，该模块包含所有所需相对路径常量
pathModule.constant('swanRelativePath', 'js/'); //swan相对于index.html的路径
pathModule.constant('i18nRelativePath', 'i18n/'); //i18n json文件相对于index.html的路径

//全局js对象
var globalStorage = new GlobalStorage();

var table=null;
//系统模块初始化，依赖路径模块，路由模块，多语言翻译模块和动态加载模块
var app = angular.module("ecs", ["pathModule", "ui.bootstrap",'swan.ui.dialog', "ui.router", 'oc.lazyLoad', 'ngCookies', 'pascalprecht.translate', 'translate.rule', 'LocalStorageModule','Module.customerMgt'
]);
// app.constant('language', [
//         { lang: 'English - US', langKey: 'en-us' },
//         { lang: '中文 - 繁體', langKey: 'zh-tw' },
//         { lang: '中文 - 简体', langKey: 'zh-cn' }
//     ]); //多语言种类配置
// app.constant("responseStatus", { //http请求可能出现的状态码配置
//     success: 0,
// });


app.config(function($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register; //动态注册
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    })
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useCookieStorage();
    }])
    .config(["$httpProvider", function($httpProvider) {
        //设置不缓存模板html文件
        if(!$httpProvider.defaults.headers.get){
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    }]);
