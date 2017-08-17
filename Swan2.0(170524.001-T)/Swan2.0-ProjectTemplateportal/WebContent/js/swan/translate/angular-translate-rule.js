angular.module("translate.rule", ['pascalprecht.translate','pathModule'])
.config(function($translateProvider, i18nRelativePath) {
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: i18nRelativePath, 
			suffix: '.json'
		}]
	});
	$translateProvider.useSanitizeValueStrategy('escape');
})
.directive("changeLang", function($translate) {
	return {
        restrict: "AC",
        link: function(scope, iElement, iAttrs) {
         	var model = iAttrs.ngModel;
         	var language = iAttrs.language;
         	scope[model] = scope[language];

         	$translate.use(language);
         	scope.$watch(model, function(val) {
         		iAttrs.language = val;
         		$translate.use(val);
         	});
        }
    };
});