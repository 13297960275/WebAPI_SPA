"use strict";
app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", routeFn])
function routeFn($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider.state("login", {
        url: "/login",
        views: {
            "": {
                templateUrl: "module/common/template/login.html",
                controller: "loginCtrl"
            }
        },
        resolve: {
            loadModule: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load(['swan.ui.bootstrap',
                    'swan.service.translate',
                    'swan.service.httpService',
                    'swan.service.validation'
                    //'swan.ui.dialog'
                ]);
            }],
            loadMyCtrl: ['$ocLazyLoad', 'loadModule', function($ocLazyLoad, loadModule) {
                return $ocLazyLoad.load({
                    files: ['module/common/controller/commonCtrl.js'
                    ]
                });
            }]
        }
    })
    .state("main", {
        url: "/partner",
        views: {
            "": {
                templateUrl: "module/common/template/main.html"
            }
        },
        resolve: {
            loadModule: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load(['swan.ui.chart',
                    'swan.ui.bootstrap',
                    //'swan.service.translate',
                    'swan.service.httpService',
                    'swan.service.validation',
                    'swan.ui.pagination',
                    'swan.service.fileUpload',
                    'swan.ui.tree'
                    //'swan.ui.dialog'
                ]);
            }],
            loadMyCtrl: ['$ocLazyLoad', 'loadModule', function($ocLazyLoad, loadModule) {
                return $ocLazyLoad.load({
                    files: ['module/common/controller/commonCtrl.js',
                        'js/app-validation-rule.js'
                    ]
                });
            }]
        }
    });
};
