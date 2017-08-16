'use strict';
var pathModule = angular.module("pathModule", []); //初始化路径模块，该模块包含所有所需相对路径常量
pathModule.constant('swanRelativePath', 'js/'); //swan相对于index.html的路径
pathModule.constant('i18nRelativePath', 'i18n/lang_'); //i18n json文件相对于index.html的路径

//全局js对象
var globalStorage = new GlobalStorage();


//系统模块初始化，依赖路径模块，路由模块，多语言翻译模块和动态加载模块
var app = angular.module("ecs", ["pathModule", "ui.bootstrap",'swan.ui.dialog', "ui.router", 'oc.lazyLoad', 'ngCookies', 'pascalprecht.translate', 'translate.rule', 'LocalStorageModule'
]);
app.constant('language', [
        { lang: 'English - US', langKey: 'en-us' },
        { lang: '中文 - 繁體', langKey: 'zh-tw' },
        { lang: '中文 - 简体', langKey: 'zh-cn' }
    ]); //多语言种类配置
app.constant("responseStatus", { //http请求可能出现的状态码配置
    success: 0,
});


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

        //$httpProvider.interceptors.push('authInterceptorService');
        $httpProvider.interceptors.push(function($rootScope, $window, $q, server, userSession, $timeout) {
            var requestInterceptor = {
                'request': function(config) {
                    config.headers = config.headers || {};
                    var account = globalStorage.getItem(globalStorage.USER.ACCOUNT);
                    var accessToken = globalStorage.getItem(globalStorage.USER.ACCESSTOKEN);
                    var targetUrl = globalStorage.getItem(globalStorage.USER.TARGET_URL);
                    if (account && accessToken) {
                        config.headers.userinfo = account + "|" + accessToken + "|" + targetUrl;
                    } 

                     var filterUrls = [
                        'token',
                        'user/setpwd',
                        'user/mail',
                        'user/resetpwd',
                        'user/initpwd'
                    ]

                    $rootScope.checkUrl = function(urls, url){
                        for(var i=0;i<urls.length;i++){
                            if(url.indexOf(urls[i]) > -1){
                                return true;
                            }
                        }
                        return false;
                    }

                     if(config.url.indexOf(server) > -1 && !$rootScope.checkUrl(filterUrls, config.url)){
                        if ((account == "" || account == undefined) && (accessToken == "" || accessToken == undefined)) {
                            //event.preventDefault();
                            globalStorage.clear();
                            $rootScope.$broadcast('auth-session-timeout'); 
                            return $q.reject("reason"); 
                        }else{
                            //更改cookie时间
                            globalStorage.setItem(globalStorage.USER.ACCOUNT,account);
                            globalStorage.setItem(globalStorage.USER.ACCESSTOKEN,accessToken);
                        }

                     }
                    return config;
                }
            };
            return requestInterceptor;
        });
    }])
    .run(function($rootScope, $state, $window, $translate, userSession, $timeout) {
        //多语言
        $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
            $translate.refresh();
        });

        //监听路由事件
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (toState.name != "login" && !toState.name.startsWith("person")) {
                var oldState = globalStorage.getItem(globalStorage.USER.TARGET_URL);
                globalStorage.setItem(globalStorage.USER.TARGET_URL, toState.name);
                var account = globalStorage.getItem(globalStorage.USER.ACCOUNT);
                var accessToken = globalStorage.getItem(globalStorage.USER.ACCESSTOKEN);
                
                //权限控制
                if(toState.name!="mainPage.dashboard"&&toState.name!="mainPage.setting.modifyPassword"){
                    var privilege = null;
                    if(typeof(globalStorage.getItem(globalStorage.USER.PRIVILEGE)) != 'undefined'){
                        privilege = JSON.parse(globalStorage.getItem(globalStorage.USER.PRIVILEGE));
                        var flg = false;
                        var n,count = 0;
                        for(n in privilege){
                          if(privilege.hasOwnProperty(n)){
                             count++;
                          }
                        }
                       
                        for(var i=0;i<count;i++){
                            var privilegeC = privilege[i].submenulist;
                            if(privilegeC!=null){
                                for(var j=0;j<privilegeC.length;j++){
                                    privilegeC[j].menulink = privilegeC[j].menulink.replace('#/','');
                                    privilegeC[j].menulink = privilegeC[j].menulink.replace(/\//g,'.');
                                    if(toState.name == privilegeC[j].menulink){
                                        flg = true;
                                        break;
                                    }else{
                                        continue;
                                    }
                                }
                            }
                        }
                        
                        if(!flg){
                            event.preventDefault();
                            $state.go("mainPage.dashboard");
                            
                        }
                    }else{
                        event.preventDefault();
                        globalStorage.clear();
                        $rootScope.$broadcast('auth-session-timeout'); 
                    }
                }else{
                    if(accessToken == undefined){
                        event.preventDefault();
                        globalStorage.clear();
                        $rootScope.$broadcast('auth-session-timeout');
                    }
                }
                //同步到userSession
                userSession.setAccount(globalStorage.getItem(globalStorage.USER.ACCOUNT));
                userSession.setUserName(globalStorage.getItem(globalStorage.USER.USERNAME));
                userSession.setAccessToken(globalStorage.getItem(globalStorage.USER.ACCESSTOKEN));
                userSession.setTargetUrl(globalStorage.getItem(globalStorage.USER.TARGET_URL));
                if(typeof(globalStorage.getItem(globalStorage.USER.PRIVILEGE)) != 'undefined'){
                    userSession.setPrivilege(JSON.parse(globalStorage.getItem(globalStorage.USER.PRIVILEGE)));
                }else{
                    userSession.setPrivilege(globalStorage.getItem(globalStorage.USER.PRIVILEGE));
                }
                userSession.setLanguage(globalStorage.getItem(globalStorage.USER.LANGUAGE));
                userSession.setTenantid(globalStorage.getItem(globalStorage.USER.TENANTID));
                userSession.setTenantcode(globalStorage.getItem(globalStorage.USER.TENANTCODE));
                userSession.setRoleid(globalStorage.getItem(globalStorage.USER.ROLEID));
                userSession.setRolecode(globalStorage.getItem(globalStorage.USER.ROLECODE));
                userSession.setDeptid(globalStorage.getItem(globalStorage.USER.DEPTID));   
            }
            
        })
    });

app.service('userSession', function() {
    this.account = "";
    this.userName = "";
    this.accessToken = "";
    this.targetUrl = "";
    this.privilege = [];
    this.language = '';
    this.tenantid = 0;
    this.tenantcode = '';
    this.roleid = 0;
    this.rolecode = '';
    this.deptid = 0;

    this.setAccount = function(account) {
        this.account = account;
    };
    this.setUserName = function(userName) {
        this.userName = userName;
    };
    this.setAccessToken = function(accessToken) {
        this.accessToken = accessToken;
    };
    this.setTargetUrl = function(targetUrl) {
        this.targetUrl = targetUrl;
    };
    this.setPrivilege = function(privilege) {
        this.privilege = privilege;
    }
    this.setLanguage = function(language) {
        this.language = language;
    }
    this.setTenantid = function(tenantid){
        this.tenantid = tenantid ? tenantid : 0;
    }
    this.setTenantcode = function(tenantcode){
        this.tenantcode = tenantcode ? tenantcode : '';
    }
    this.setRoleid = function(roleid){
        this.roleid = roleid;
    }
    this.setRolecode = function(rolecode){
         this.rolecode = rolecode;
    }
    this.setDeptid = function(deptid){
         this.deptid = deptid;
    }

    this.clear = function() {
        this.account = "";
        this.userName = "";
        this.accessToken = "";
        this.targetUrl = "";
        this.privilege = [];
        this.language = '';
        this.tenantid = 0;
        this.tenantcode = '';
        this.roleid = 0;
        this.rolecode = '';
        this.deptid = 0;
    }
})

//防止按钮重复提交
app.controller('MainCtrl', function($scope, $timeout) {
  $scope.functionThatReturnsPromise = function() {
    return $timeout(angular.noop, 1);//这里可以设置时间，改文字可以删除
  }
});

app.directive('clickAndDisable', function() {
  return {
    scope: {
      clickAndDisable: '&'
    },
    link: function(scope, iElement, iAttrs) {
      iElement.bind('click', function() {
        iElement.prop('disabled',true);
        scope.clickAndDisable().finally(function() {
          iElement.prop('disabled',false);
        })
      });
    }
  };
});
