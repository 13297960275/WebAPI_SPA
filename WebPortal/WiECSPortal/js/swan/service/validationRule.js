(function() {
    angular.module('validation.rule', ['validation','service.httpService'])
	    .config(function($provide){
		   //Just a dummy decorator
		   $provide.decorator('httpFactory', function($delegate){
		      return $delegate;
		  	});
           $provide.decorator('$q',function($delegate){
            return $delegate;
           })
		})
        .config(['$validationProvider','httpFactoryProvider','$qProvider',
            function($validationProvider,httpFactoryProvider,$qProvider) {

            	var httpFactory = httpFactoryProvider.$get();
                var $q = $qProvider.$get();

                var expression = {
                    required: function(value) {
                        return !!value;
                    },
                    beright: function(value, scope, element, attrs, param){
                        var flag = false;
						if (defaultEquality(value, attrs.currValue) == true) {
                            flag = true;
						}
                        return flag;
                    },
                    equality: function(value, scope, element, attrs, param){
						if (defaultEquality(value, attrs.checkEquality)) {
							return false;
						}else return true;
                    },
                    unique: function(value, scope, element, attrs, param){
                        var checkUnique = function(){
                            var deferred = $q.defer();
                            var promise = deferred.promise;

                            httpFactory.get('../json/userData.json', param)
                            //httpFactory.post('/login/checkAccount',param)
                                .success(function(data) {
                                    data.flag = true;
                                    var list = data.users;
                                    angular.forEach(list, function(item, key) {
                                        if (item[param] === value) { 
                                            data.flag = false;
                                        }
                                    });
                                    deferred.resolve(data.flag);
                                }).error(function(error) {
                                    deferred.reject(error);
                                });
                            return promise;
                        };

                        return checkUnique().then(function(result){
                                return result;
                            },function(error){
                                return error;
                            });

                    }
                };
                var defaultMsg = {
                    required: {
                        error: 'required' /*'required'*/ , //This should be Required!!
                        success: 'It\'s Required'
                    },
                    beright: {
                    	error: '',
                    	success:''
                    },
                    equality:{
                    	error: '',
                    	success:''
                	},
                	unique:{
                		error:''
                	}
                };

                $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
                $validationProvider.showSuccessMessage = false;
            }
        ]);

}).call(this);
