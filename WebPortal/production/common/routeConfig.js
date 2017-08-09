'use strict';

var app = angular.module('ecs', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'logincontroller'
    })

    .state('main', {
        url: '/main',
        templateUrl: 'main.html',
        controller: 'maincontroller'
    })

    .state('main.custMgt', {
        url: '/custMgt',
        templateUrl: '../customerMgt/custMgt_list.html',
        controller: 'custcontroller'
    })
    .state('main.addPartner', {
        url: '/addPartner',
        templateUrl: '../customerMgt/custMgt_add_partner.html',
        controller: 'custcontroller'
    })
    .state('main.addCustomer', {
        url: '/addCustomer',
        templateUrl: '../customerMgt/custMgt_add_customer.html',
        controller: 'custcontroller'
    })
    .state('main.partnerDetail', {
        url: '/partnerDetail',
        templateUrl: '../customerMgt/custMgt_detail_partner.html',
        controller: 'custcontroller'
    })
    .state('main.customerDetail', {
        url: '/customerDetail',
        templateUrl: '../customerMgt/custMgt_detail_customer.html',
        controller: 'custcontroller'
    })

    .state('main.subscriptions', {
        url: '/subscriptions',
        templateUrl: '../customerMgt/subscriptions_list.html',
        controller: 'subscriptioncontroller'
    })
    .state('main.subscriptionsDetail', {
        url: '/subscriptionsDetail',
        templateUrl: '../customerMgt/subscriptions_detail.html',
        controller: 'subscriptioncontroller'
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

});