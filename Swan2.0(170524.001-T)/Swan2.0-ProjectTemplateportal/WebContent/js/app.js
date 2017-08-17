"use strict";
var pathModule = angular.module("pathModule", []); //初始化路径模块，该模块包含所有所需相对路径常量

//系统模块初始化，依赖路径模块，路由模块，多语言翻译模块和动态加载模块
var app = angular.module("myApp", ["pathModule", "ui.router", 'oc.lazyLoad', 'ngCookies'])
.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
  function($provide, $compileProvider, $controllerProvider, $filterProvider) {
    app.controller = $controllerProvider.register; //动态注册
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
  }
]);