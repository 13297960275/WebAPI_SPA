function ensureDefault(obj, prop, value) {
	if (!obj.hasOwnProperty(prop))
		obj[prop] = value;
}

angular.module('ui.accordionPackage', ['ui.bootstrap.accordion'])

.controller('AccordionPackageController', ['$scope', '$attrs', '$compile',function($scope, $attrs,$compile) {
	$scope.options = $scope.options || {};
	ensureDefault($scope.options, "nodeChildren", "children");
	/*	var accordionFormat, ngModel, accordionTemplateUrl;

		this.init = function(_ngModel_) {
			ngModel = _ngModel_;
			accordionPackageTemplateUrl = $attrs.accordionPackageTemplateUrl;

			accordionFormat = $attrs.accordionPackage;
			$attrs.$observe('accordionPackage', function(value, oldValue) {
				var newAccordionFormat = value;
				// Invalidate the $modelValue to ensure that formatters re-run
				// FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
				if (newAccordionFormat !== accordionFormat) {
					accordionFormat = newAccordionFormat;
					ngModel.$modelValue = null;

					if (!accordionFormat) {
						throw new Error('accordionPackage must have a accordion format specified.');
					}
				}
			});

			if (!accordionFormat) {
				throw new Error('accordionPackage must have a accordion format specified.');
			}

			accordionEl = angular.element(document).find('div uib-accordion><div uib-accordion-group></div></div>');

			accordionEl.attr({
				'template-url': accordionPackageTemplateUrl
			});

			accordionGroupEl = angular.element(document).find(accordionEl.children()[0]);
			//accordionGroupEl.attr('template-url',);

		};
	*/
	$scope.parentScopeOfAccordion = $scope.$parent;
	var template =
		'<div uib-accordion>' +
		'<uib-accordion-group' + $scope.heading + ' open-class="panel-open" panel-class="panel-default">' +
		'<a ng-repeat="item in item.' + $scope.options.nodeChildren + '"  ui-sref="{{ item.url }}" ng-class="{active:flag == $index}" ng-click="accordionItemShow($index)">{{ item.name | translate}}</a>' +
		'</uib-accordion-group>' +
		'</div>';

	this.template = $compile(template);

}])

.directive('accordionPackage', ['$compile', function( $compile ) {
	return {
		restrict: 'EA',
		require: 'accordionPackage',
		transclude: true,
		scope: {
			accordionModel: "=",
			heading: "=",
			openClass: "=",
			panelClass: "="
		},
		//controller: 'AccordionPackageController',
		//controllerAs: 'accordionPackages',
		controller: ['$scope', '$attrs', '$compile',function($scope, $attrs,$compile) {
			var accordionFormat, ngModel, accordionTemplateUrl;

			this.init = function(_ngModel_) {
				ngModel = _ngModel_;
				accordionPackageTemplateUrl = $attrs.accordionPackageTemplateUrl;

				accordionFormat = $attrs.accordionPackage;
				$attrs.$observe('accordionPackage', function(value, oldValue) {
					var newAccordionFormat = value;
					// Invalidate the $modelValue to ensure that formatters re-run
					// FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
					if (newAccordionFormat !== accordionFormat) {
						accordionFormat = newAccordionFormat;
						ngModel.$modelValue = null;

						if (!accordionFormat) {
							throw new Error('accordionPackage must have a accordion format specified.');
						}
					}
				});

				if (!accordionFormat) {
					throw new Error('accordionPackage must have a accordion format specified.');
				}

			}

			$scope.options = $scope.options || {};
			ensureDefault($scope.options, "nodeChildren", "children");
			/*	var accordionFormat, ngModel, accordionTemplateUrl;

				this.init = function(_ngModel_) {
					ngModel = _ngModel_;
					accordionPackageTemplateUrl = $attrs.accordionPackageTemplateUrl;

					accordionFormat = $attrs.accordionPackage;
					$attrs.$observe('accordionPackage', function(value, oldValue) {
						var newAccordionFormat = value;
						// Invalidate the $modelValue to ensure that formatters re-run
						// FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
						if (newAccordionFormat !== accordionFormat) {
							accordionFormat = newAccordionFormat;
							ngModel.$modelValue = null;

							if (!accordionFormat) {
								throw new Error('accordionPackage must have a accordion format specified.');
							}
						}
					});

					if (!accordionFormat) {
						throw new Error('accordionPackage must have a accordion format specified.');
					}

					accordionEl = angular.element(document).find('div uib-accordion><div uib-accordion-group></div></div>');

					accordionEl.attr({
						'template-url': accordionPackageTemplateUrl
					});

					accordionGroupEl = angular.element(document).find(accordionEl.children()[0]);
					//accordionGroupEl.attr('template-url',);

				};
			*/
			$scope.parentScopeOfAccordion = $scope.$parent;

			var template =
				'<div uib-accordion>' +
				'<uib-accordion-group open-class="panel-open" panel-class="panel-default">' +
				'<a ng-repeat="item in item.' + $scope.options.nodeChildren + '"  ui-sref="{{ item.url }}" ng-class="{active:flag == $index}" ng-click="accordionItemShow($index)" group-transclude>{{ item.name | translate}}</a>' +
				'</uib-accordion-group>' +
				'</div>';

			this.template = $compile(template);

		}],
/*		templateUrl: function(element, attrs) {
			return attrs.templateUrl || 'uib/template/accordion/accordionPackage.html';
		},
*/		compile: function(element, attrs, childTranscludeFn) {
			return function(scope, element, attrs, accordionCtrl) {
                scope.$watch("accordionModel", function updateNodeOnRootScope(newValue) {
                    if (angular.isArray(newValue)) {
                        if (angular.isDefined(scope.node) && angular.equals(scope.node[scope.options.nodeChildren], newValue))
                            return;
                        scope.node = {};
                        scope.synteticRoot = scope.node;
                        scope.node[scope.options.nodeChildren] = newValue;
                    }
                    else {
                        if (angular.equals(scope.node, newValue))
                            return;
                        scope.node = newValue;
                    }
                });

				accordionCtrl.template(scope, function(clone) {
					element.html('').append(clone);
				});
				//scope.$groupTransclude = childTranscludeFn;

			}
		}/*,
		link: function(scope, element, attrs, ctrl) {
							var ngModel = ctrls[0],
								ctrl = ctrls[1];

							ctrl.init(ngModel);
			
			ctrl.template(scope, function(clone) {
				element.html('').append(clone);
			});
		}
*/
	};
}])
/*.directive('groupTransclude', function() {
	return {
		link: function(scope, element, attrs, ctrl) {
							var ngModel = ctrls[0],
								ctrl = ctrls[1];

							ctrl.init(ngModel);
			
			ctrl.template(scope, function(clone) {
				element.html('').append(clone);
			});
		}	
	}
})*/;