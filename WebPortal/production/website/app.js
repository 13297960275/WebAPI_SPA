var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: 'partial-home.html'
                },
                'list': {
                    url: '/home/list',
                    views: {
                        '': {
                            templateUrl: 'partial-home-list.html',
                            controller: 'listcontroller'
                        },
                        'detail': {
                            url: '/detail',
                            templateUrl: 'list-detail.html'
                        }
                    }
                },
                'paragraph': {
                    url: '/paragraph',
                    template: 'I could sure use a drink right now.'
                }
            }
        })
        .state('about', {
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
//routerApp.config(function ($stateProvider, $urlRouterProvider) {

//    $urlRouterProvider.otherwise('/home');

//    $stateProvider

//        // HOME STATES AND NESTED VIEWS ========================================
//        .state('home', {
//            url: '/home',
//            templateUrl: 'partial-home.html'
//        })

//        // nested list with custom controller
//        .state('home.list', {
//            url: '/list',
//            templateUrl: 'partial-home-list.html',
//            controller: 'listcontroller'
//        })
//        .state('list.detail', {
//            url: '/detail',
//            templateUrl: 'list-detail.html'
//        })
//        // nested list with just some random string data
//        .state('home.paragraph', {
//            url: '/paragraph',
//            template: 'I could sure use a drink right now.'
//        })

//        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
//        .state('about', {
//            url: '/about',
//            views: {
//                '': { templateUrl: 'partial-about.html' },
//                'columnOne@about': { template: 'Look I am a column!' },
//                'columnTwo@about': {
//                    templateUrl: 'table-data.html',
//                    controller: 'scotchController'
//                }
//            }

//        });

//});

