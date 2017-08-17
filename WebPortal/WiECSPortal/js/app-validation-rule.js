(function() {
    angular.module('validation.rule', ['validation'])
        .config(['$validationProvider',
            function($validationProvider) {

                var expression = {
                    required: function(value) {
                        return !!value;
                    },
                    url: function(value, scope, element, attrs, param){
                        if(!value)return true;
                        var reg = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
                        return reg.test(value);
                    }, 
                    email: function(value, scope, element, attrs, param){
                        if(!value)return true;
                        var reg = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
                        return reg.test(value);
                    },
                    number: /^\d+$/,
                    minlength: function(value, scope, element, attrs, param) {
                        return value.length >= param;
                    },
                    maxlength: function(value, scope, element, attrs, param) {
                        return value.length <= param;
                    },
                    telephone: function(value, scope, element, attrs, param){
                        if(!value)return true;
                        var reg = new RegExp(/^(\d{2,4}-)?(\d{6,7})(#\d+)?$/);
                        return reg.test(value);
                    }
                };

                var defaultMsg = {
                    required: {
                        error: 'required', //This should be Required!!
                        success: 'It\'s Required'
                    },
                    url: {
                        error: 'This should be Url',
                        success: 'It\'s Url'
                    },
                    email: {
                        error: 'emailError',
                        success: 'It\'s Email'
                    },
                    number: {
                        error: 'This should be Number',
                        success: 'It\'s Number'
                    },
                    minlength: {
                        error: 'min',//This should be longer
                        success: 'Long enough!'
                    },
                    maxlength: {
                        error: 'This should be shorter',
                        success: 'Short enough!'
                    },
                     telephone: {
                        error: 'This should be telephone',
                        success: 'It\'s telephone'
                    }
                };

                $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
                $validationProvider.showSuccessMessage = false;
            }
        ]);

}).call(this);