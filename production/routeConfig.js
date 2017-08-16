'use strict';

var app = angular.module('ecs', ['ui.router', 'oc.lazyLoad', 'ui.router.state.events', 'pascalprecht.translate']);

app.config(['$translateProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function ($translateProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: '../assets/i18n/',
        suffix: '.json'
    });

    // 获取当前浏览器的语系：zh-cn、en-us、zh-tw...
    var langKey = 'en-us';
    //var langKey = (navigator.browserLanguage || navigator.language).toLowerCase();
    console.log(langKey);

    //$rootScope.languageKey = langKey;

    $urlRouterProvider.otherwise('/login');
    //$locationProvider.html5Mode(true);
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'loginCtrl'
    })

    //.state('en-us', {
    //    url: '/en-us',
    //    templateUrl: 'main.html',
    //    controller: 'mainCtrl'
    //})
    //.state('zh-cn', {
    //    url: '/zh-cn',
    //    templateUrl: 'main.html',
    //    controller: 'mainCtrl'
    //})
    //.state('zh-tw', {
    //    url: '/zh-tw',
    //    templateUrl: 'main.html',
    //    controller: 'mainCtrl'
    //})
    //.state('en-us.custMgt', {
    //    url: '/custMgt',
    //    templateUrl: '../customerMgt/custMgt_list.html',
    //    controller: 'customerCtrl'
    //})
    //.state('zh-cn.custMgt', {
    //    url: '/custMgt',
    //    templateUrl: '../customerMgt/custMgt_list.html',
    //    controller: 'customerCtrl'
    //})
    //.state('zh-tw.custMgt', {
    //    url: '/custMgt',
    //    templateUrl: '../customerMgt/custMgt_list.html',
    //    controller: 'customerCtrl'
    //})

    .state('main', {
        url: '/' + langKey + '/partner',
        templateUrl: 'main.html',
        controller: 'mainCtrl'
    })

    .state('main.custMgt', {
        url: '/custMgt',
        templateUrl: '../customerMgt/custMgt_list.html',
        controller: 'customerCtrl'
    })
    .state('main.addPartner', {
        url: '/addPartner',
        templateUrl: '../customerMgt/custMgt_add_partner.html',
        controller: 'customerCtrl'
    })
    .state('main.addCustomer', {
        url: '/addCustomer',
        templateUrl: '../customerMgt/custMgt_add_customer.html',
        controller: 'customerCtrl'
    })
    .state('main.partnerDetail', {
        url: '/partnerDetail',
        templateUrl: '../customerMgt/custMgt_detail_partner.html',
        controller: 'customerCtrl'
    })
    .state('main.customerDetail', {
        url: '/customerDetail',
        templateUrl: '../customerMgt/custMgt_detail_customer.html',
        controller: 'customerCtrl'
    })

    .state('main.subscriptions', {
        url: '/subscriptions',
        templateUrl: '../customerMgt/subscriptions_list.html',
        controller: 'subscriptionCtrl'
    })
    .state('main.subscriptionsDetail', {
        url: '/subscriptionsDetail',
        templateUrl: '../customerMgt/subscriptions_detail.html',
        controller: 'subscriptionCtrl'
    })

    .state('main.keystore', {
        url: '/keystore',
        templateUrl: '../customerMgt/keystore_list.html'
    })

    .state('main.permissionMgt', {
        url: '/permissionMgt',
        templateUrl: '../permissionMgt/permission_list_customer.html'
    })

    .state('main.discount', {
        url: '/discount',
        templateUrl: '../rate/discount_setting.html'
    })
    .state('main.rateCard', {
        url: '/rateCard',
        templateUrl: '../rate/rateCard_list.html'
    })

    .state('main.usageTrend', {
        url: '/usageTrend',
        templateUrl: '../report/report_usageTrend.html'
    })

    .state('main.usageAlert', {
        url: '/usageAlert',
        templateUrl: '../usageAlert/usageAlert_budget_setting.html'
    });


    if (langKey == '' || langKey == null) {
        $translateProvider.preferredLanguage('zh-tw');
        return false;
    } else {
        $translateProvider.preferredLanguage(langKey);
        return false;
    }

}]);

//增加路由跳转时的判断，如果是同一个页面重新刷新，则让其跳转到相应的页面。
app.run(['$rootScope', '$window', '$location', '$log', function ($rootScope, $window, $location, $log) {

    /* 监听路由的状态变化 */
    //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //    console.log('++++++log $stateChangeStart start+++++++++');
    //    console.log('arguments = ', arguments);
    //    console.log('event=', event);
    //    console.log('toState=', toState);
    //    console.log('toParams=', toParams);
    //    console.log('fromState=', fromState);
    //    console.log('fromParams=', fromParams);
    //    console.log('++++++log $stateChangeStart end+++++++++++');
    //});
    //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //    console.log('======log $$stateChangeSuccess start======');
    //    console.log('arguments = ', arguments);
    //    console.log('event=', event);
    //    console.log('toState=', toState);
    //    console.log('toParams=', toParams);
    //    console.log('fromState=', fromState);
    //    console.log('fromParams=', fromParams);
    //    console.log('======log $$stateChangeSuccess end========');
    //});

    //    //var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
    //    //var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);
    //    //var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
    //    //var isSecond = false;
    //    //function locationChangeStart(event, newUrl, currentUrl) {
    //    //    //调试用信息，测试无误后可删除
    //    //    console.log('arguments = ', arguments);
    //    //    console.log('newUrl = ', newUrl);
    //    //    console.log('decode -> newUrl = ', decodeURIComponent(newUrl));
    //    //    console.log('currentUrl = ', currentUrl);
    //    //    if (decodeURIComponent(newUrl) == currentUrl) {
    //    //        console.log('currentUrl.indexof = ', currentUrl.indexOf('upload_topic_image'));
    //    //        if (currentUrl.indexOf('upload_topic_image') >= 0) {
    //    //            if (isSecond) {
    //    //                console.log("$location.path('http://ctb.qingguo.com/weixinCt/main#/upload_topic_start')");
    //    //                $location.path('http://ctb.qingguo.com/weixinCt/main#/upload_topic_start');
    //    //                isSecond = false;
    //    //            } else {
    //    //                isSecond = true;
    //    //                console.log('isSecond =  ', isSecond);
    //    //            }
    //    //            event.preventDefault();
    //    //            return;
    //    //        }
    //    //    }
    //    //    console.log('locationChangeStart判断结束 ');
    //    //}
    //    //function locationChangeSuccess(event, newUrl, currentUrl) {
    //    //    //调试用信息，测试无误后可删除
    //    //    console.log('arguments = ', arguments);
    //    //    console.log('newUrl = ', newUrl);
    //    //    console.log('decode -> newUrl = ', decodeURIComponent(newUrl));
    //    //    console.log('currentUrl = ', currentUrl);
    //    //    if (decodeURIComponent(newUrl) == currentUrl) {
    //    //        console.log('currentUrl.indexof = ', currentUrl.indexOf('upload_topic_image'));
    //    //        if (currentUrl.indexOf('upload_topic_image') >= 0) {
    //    //            if (isSecond) {
    //    //                console.log("$location.path('http://ctb.qingguo.com/weixinCt/main#/upload_topic_start')");
    //    //                $location.path('http://ctb.qingguo.com/weixinCt/main#/upload_topic_start');
    //    //                isSecond = false;
    //    //            } else {
    //    //                isSecond = true;
    //    //                console.log('isSecond =  ', isSecond);
    //    //            }
    //    //            event.preventDefault();
    //    //            return;
    //    //        }
    //    //    }
    //    //    console.log('locationChangeSuccess判断结束 ');
    //    //}
    //    //function routeChangeStart(event, newUrl, currentUrl) {
    //    //    //调试用信息，测试无误后可删除
    //    //    console.log('routeChangeStart-----开始 ');
    //    //    console.log('arguments = ', arguments);
    //    //    if (newUrl != undefined && currentUrl != undefined && newUrl.$$route != undefined && currentUrl.loadedTemplateUrl != undefined) {
    //    //        console.log('newUrl = ', newUrl);
    //    //        console.log('newUrl.url = ', newUrl.$$route.templateUrl);
    //    //        console.log('currentUrl = ', currentUrl.loadedTemplateUrl);
    //    //        if (newUrl.$$route.templateUrl == currentUrl.loadedTemplateUrl) {
    //    //            console.log('currentUrl.indexof = ', currentUrl.loadedTemplateUrl.indexOf('upload_topic_image'));
    //    //            if (currentUrl.loadedTemplateUrl.indexOf('upload_topic_image') >= 0) {
    //    //                //                        if (isSecond) {
    //    //                console.log("$location.path('http://ctb.qingguo.com/weixinCt/main#/upload_topic_start')");
    //    //                $location.path('http://ctb.qingguo.com/weixinCt/main#/upload_topic_start');
    //    //                isSecond = false;
    //    //                //                        } else {
    //    //                //                            isSecond = true;
    //    //                //                            console.log('isSecond =  ', isSecond);
    //    //                //                        }
    //    //                event.preventDefault();
    //    //                return;
    //    //            }
    //    //        }
    //    //    }
    //    //    console.log('routeChangeStart-----结束 ');
    //    //}

}]);