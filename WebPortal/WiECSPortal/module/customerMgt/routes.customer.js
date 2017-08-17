angular.module('Module.customerMgt', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state("main.customerMgt", {
                url:"/customerMgt",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/custMgt_list.html",
                        controller: "customerCtrl"
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/customerCtrl.js'
                            ]);
                    }]
                }
            })
            .state("main.customerMgt.addPartner", {
                url:"/addPartner",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/custMgt_add_partner.html",
                        controller: "addPartnerCtrl"
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/addPartnerCtrl.js'
                            ]);
                    }]
                }
            })
            .state("main.customerMgt.addCustomer", {
                url:"/addCustomer",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/custMgt_add_customer.html",
                        controller: "addCustomerCtrl"
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/addCustomerCtrl.js'
                            ]);
                    }]
                }
            })
            .state("main.customerMgt.partnerDetail", {
                url:"/partnerDetail",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/custMgt_detail_partner.html",
                        controller: "partnerDetailCtrl"
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/partnerDetailCtrl.js'
                            ]);
                    }]
                }
            })
            .state("main.customerMgt.customerDetail", {
                url:"/customerDetail",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/custMgt_detail_customer.html",
                        controller: "customerDetailCtrl"
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/customerDetailCtrl.js'
                            ]);
                    }]
                }
            })


            .state("main.subscription",{
                url:"/subscription",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/subscriptions_list.html",
                        controller: 'subscriptionCtrl'
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/subscriptionCtrl.js'
                            ]);
                    }]
                }
            })
            .state("main.subscription.detail", {
                url: "/detail",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/subscriptions_detail.html",
                        controller: "subsDetailCtrl"
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/subsDetailCtrl.js'
                            ]);
                    }]
                }
            })

            .state("main.keystore",{
                url:"/keystore",
                views: {
                    "": {
                        templateUrl: "module/customerMgt/template/keystore_list.html",
                        controller:"keystoreCtrl"
                    }
                },
                resolve: {
                    deps: ["$ocLazyLoad", function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'module/customerMgt/controller/keystoreCtrl.js'
                            ]);
                    }]
                }
            })
    });
