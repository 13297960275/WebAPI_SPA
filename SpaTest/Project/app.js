var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('app', {
            url: '/app/:app',
            abstract: true,
            controller: 'listcontroller'
        })
        // HOME STATES AND NESTED VIEWS ========================================
        .state('app.home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        // nested list with custom controller
        .state('app.home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: 'listcontroller'
        })

        // nested list with just some random string data
        .state('app.home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('app.about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }

        });

});

routerApp.controller('scotchController', function ($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});

