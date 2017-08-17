// author:   Samuel Mueller 
// version: 1.0.4 
// license:  MIT 
// homepage: http://github.com/samu/angular-table 
(function() {
  var ColumnConfiguration, PageSequence, PaginatedSetup, ScopeConfigWrapper, Setup, StandardSetup, Table, TableConfiguration, configurationVariableNames, paginationTemplate,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("angular-table", []);

  	ColumnConfiguration = (function() {
  		function ColumnConfiguration(bodyMarkup, headerMarkup) {
  			this.attribute = bodyMarkup.attribute;
  			this.title = bodyMarkup.title;
  			this.sortable = bodyMarkup.sortable;
  			this.width = bodyMarkup.width;
  			this.initialSorting = bodyMarkup.initialSorting;
  			this.showColumnsArray = [];
  			if (headerMarkup) {
  				this.customContent = headerMarkup.customContent;
  				this.attributes = headerMarkup.attributes;
  			}
  		}

    ColumnConfiguration.prototype.createElement = function() {
    	var th;
    	return th = angular.element(document.createElement("th"));
    };

    ColumnConfiguration.prototype.renderTitle = function(element) {
    	return element.html(this.customContent || this.title);
    };

    ColumnConfiguration.prototype.renderAttributes = function(element) {
    	var attribute, _i, _len, _ref, _results;
      	if (this.customContent) {
      		_ref = this.attributes;
      		_results = [];
      		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      			attribute = _ref[_i];
      			_results.push(element.attr(attribute.name, attribute.value));
      		}
      		return _results;
      	}
    };

    ColumnConfiguration.prototype.renderSorting = function(element) {
    	var icon;
    	if (this.sortable) {
    		element.attr("ng-click", "predicate = '" + this.attribute + "'; descending = !descending;");
    		icon = angular.element("<i style='margin-left: 10px;'></i>");
    		icon.attr("ng-class", "getSortIcon('" + this.attribute + "', predicate)");
    		return element.append(icon);
    	}
    };

    ColumnConfiguration.prototype.renderWidth = function(element) {
    	return element.attr("width", this.width);
    };
    
    //teela 给head th添加ng-show指令，实现用户定制列的隐藏和显示
    ColumnConfiguration.prototype.renderNgShow = function(element) {
        return element.attr("ng-show", this.attribute);
    };

    ColumnConfiguration.prototype.renderHtml = function() {
	      var th;
	      th = this.createElement();
	      this.renderTitle(th);
	      this.renderAttributes(th);
	      this.renderSorting(th);
	      this.renderWidth(th);
	      //this.renderNgShow(th);
	      return th;
    };

    return ColumnConfiguration;

  })();

  	configurationVariableNames = (function() {
  		function configurationVariableNames(configObjectName) {
  			this.configObjectName = configObjectName;
  			this.itemsPerPage = "" + this.configObjectName + ".itemsPerPage";
  			this.sortContext = "" + this.configObjectName + ".sortContext";
  			this.fillLastPage = "" + this.configObjectName + ".fillLastPage";
  			this.maxPages = "" + this.configObjectName + ".maxPages";
  			//this.currentPage = "" + this.configObjectName + ".currentPage";
  			this.orderBy = "" + this.configObjectName + ".orderBy";
  		}

    return configurationVariableNames;

  	})();

  	TableConfiguration = (function() {
  		function TableConfiguration(tableElement, attributes) {
  			this.tableElement = tableElement;
  			this.attributes = attributes;
  			this.id = this.attributes.id;
  			this.config = this.attributes.atConfig;
  			this.paginated = this.attributes.atPaginated != null;
  			this.list = this.attributes.atList;
  			this.createColumnConfigurations();
  		}

	    TableConfiguration.prototype.capitaliseFirstLetter = function(string) {
	    	if (string) {
	    		return string.charAt(0).toUpperCase() + string.slice(1);
	    	} else {
	    		return "";
	    	}
	    };
	
	    TableConfiguration.prototype.extractWidth = function(classes) {
	    	var width;
	    	width = /([0-9]+px)/i.exec(classes);
	    	if (width) {
	    		return width[0];
	    	} else {
	    		return "";
	    	}
	    };
	
	    TableConfiguration.prototype.isSortable = function(classes) {
	    	var sortable;
	    	sortable = /(sortable)/i.exec(classes);
	    	if (sortable) {
	    		return true;
	    	} else {
	    		return false;
	    	}
	    };
	
	    TableConfiguration.prototype.getInitialSorting = function(td) {
	    	var initialSorting;
	    	initialSorting = td.attr("at-initial-sorting");
	    	if (initialSorting) {
	    		if (initialSorting === "asc" || initialSorting === "desc") {
	    			return initialSorting;
	    		}
	    		throw "Invalid value for initial-sorting: " + initialSorting + ". Allowed values are 'asc' or 'desc'.";
	    	}
	    	return void 0;
	    };
	
	    TableConfiguration.prototype.collectHeaderMarkup = function(table) {
	    	var customHeaderMarkups, th, tr, _i, _len, _ref;
	    	customHeaderMarkups = {};
	    	tr = table.find("tr");
	    	_ref = tr.find("th");
	    	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    		th = _ref[_i];
	    		th = angular.element(th);
	    		customHeaderMarkups[th.attr("at-attribute")] = {
	    				customContent: th.html(),
	    				attributes: th[0].attributes
	    		};
	    	}
	    	return customHeaderMarkups;
	    };
	
	    TableConfiguration.prototype.collectBodyMarkup = function(table) {
	    	var attribute, bodyDefinition, initialSorting, sortable, td, title, width, _i, _len, _ref;
	    	bodyDefinition = [];
	    	_ref = table.find("td");
	    	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    		td = _ref[_i];
	    		td = angular.element(td);
	    		attribute = td.attr("at-attribute");
	    		title = td.attr("at-title") || this.capitaliseFirstLetter(td.attr("at-attribute"));
	    		sortable = td.attr("at-sortable") !== void 0 || this.isSortable(td.attr("class"));
	    		width = this.extractWidth(td.attr("class"));
	    		initialSorting = this.getInitialSorting(td);
	    		bodyDefinition.push({
	    			attribute: attribute,
	    			title: title,
	    			sortable: sortable,
	    			width: width,
	    			initialSorting: initialSorting
	    		});
	    	}
	    	return bodyDefinition;
	    };
	
	    TableConfiguration.prototype.createColumnConfigurations = function() {
	    	var bodyMarkup, headerMarkup, i, _i, _len;
	    	headerMarkup = this.collectHeaderMarkup(this.tableElement);
	    	bodyMarkup = this.collectBodyMarkup(this.tableElement);
	    	this.columnConfigurations = [];
	    	for (_i = 0, _len = bodyMarkup.length; _i < _len; _i++) {
	    		i = bodyMarkup[_i];
	    		this.columnConfigurations.push(new ColumnConfiguration(i, headerMarkup[i.attribute]));
	    	}
	    };
	    return TableConfiguration;
  	})();

  	Setup = (function() {
    function Setup() {}

    Setup.prototype.setupTr = function(element, repeatString) {
    	var tbody, tr;
    	tbody = element.find("tbody");
    	tr = tbody.find("tr");
    	tr.attr("ng-repeat", repeatString);
    	return tbody;
    };
    return Setup;
  })();

  	StandardSetup = (function(_super) {
  		__extends(StandardSetup, _super);

  		function StandardSetup(configurationVariableNames, list) {
  			this.list = list;
  			this.repeatString = "item in " + this.list + " | orderBy:predicate:descending track by $index";
  		}

  		StandardSetup.prototype.compile = function(element, attributes) {
  			return this.setupTr(element, this.repeatString,this.list);
  		};

  		StandardSetup.prototype.link = function($scope, $element, $attributes, $filter, $http, table) {    	
  			var totalList = [];
  			var config = table.tableConfiguration.config;
  			var list = table.tableConfiguration.list;
  			
  			$scope[config].currentPage = 1;
  			$scope[config].totalItems = "";
  			$scope[config].successStatus = $scope[config].successStatus ? $scope[config].successStatus : "0000";
  			//刷新表格数据
  			var update = function() {
  				$scope[list] = [];
  				$scope[config].tableError = false;
  				if ( $scope[config].pageFront && totalList.length <= 0 
  						|| (typeof($scope[config].pageFront) == 'undefined') 
  						|| $scope[config].pageFront == false ) {
  					$http({
  	  					method: $scope[config].method,
  	  					url: $scope[config].url,
  	  					data: $scope[config].formData
  	  				}).success(function(data){
  	  					//成功获取table数据
  	  					if( (data.status == $scope[config].successStatus) && (data[list].length > 0)) {  	  				
  	  						$scope[config].tableError = false;
			  				if ($scope[config].pageFront === true) {
			  					totalList = data[list];
			  					//totalList = data;
			  					$scope[config].totalItems = totalList.length;
								if($scope[config].currentPage === Math.ceil($scope[config].totalItems/$scope[config].itemsPerPage)) {
									for(var i = ($scope[config].currentPage-1) * $scope[config].itemsPerPage; i < $scope[config].totalItems; i++){
										$scope[list].push(totalList[i]);
									}
								} else {
									for(var i = 0; i < $scope[config].itemsPerPage; i++){
										$scope[list].push(totalList[($scope[config].currentPage-1)*$scope[config].itemsPerPage+i]);
									}
								}
			  				} else{
			  					$scope[list] = data[list];
			  					$scope[config].totalItems = data[$scope[config].totalItemsKey];
			  				}
  	  				} else{
  	  						//status不为0000，则获取数据失败
  	  						$scope[config].tableError = true;
  	  						if( $scope[config].tableErrorFn!= undefined ) {
  	  							$scope[config].tableErrorFn(data);
  	  						}
  	  					}
  	  				}).error(function(data) {
  	  					//http请求未成功
  	  					$scope[config].tableError = true;
						if( $scope[config].tableErrorFn!= undefined ) {
							$scope[config].tableErrorFn(data);
						}
  	  				});
  				} else {
  					if($scope[config].currentPage === Math.ceil($scope[config].totalItems/$scope[config].itemsPerPage)) {
						for(var i = ($scope[config].currentPage-1) * $scope[config].itemsPerPage; i < $scope[config].totalItems; i++){
							$scope[list].push(totalList[i]);
						}
					} else {
						for(var i = 0; i < $scope[config].itemsPerPage; i++){
							$scope[list].push(totalList[($scope[config].currentPage-1)*$scope[config].itemsPerPage+i]);
						}
					}
  				}
  			}
  			
  			//当为前台翻页的时候监控页码变化
  			$scope.$watch(config+'.currentPage', function(newValue, oldValue) {
  				if($scope[config].pageFront === true) {
  					update();
  				}
  			});
  	
  			//当为后台翻页的时候监控formData变化
  			$scope.$watch(config+'.formData', function(newValue, oldValue) {
  				//if (newValue === oldValue)return;  //避免初次刷新
  				if($scope[config].pageFront === false || $scope[config].pageFront == undefined) {
	  				totalList = [];
	  				update();
  				}
  			}, true);
  			
  			//其他需要刷新列表的功能，例如dialog提交数据后
  			$scope.$on('reloadTable', function(event,data) {
  				totalList = [];
  				update();
  			});
  		};
  		
  		return StandardSetup;
  	})(Setup);

  	Table = (function() {
  		function Table(element, tableConfiguration, configurationVariableNames) {
  			this.element = element;
  			this.tableConfiguration = tableConfiguration;
		 	  this.configurationVariableNames = configurationVariableNames;
		 	  this.showColumnsArray = [];
  		}

	    Table.prototype.constructHeader = function() {
	    	var i, tr, _i, _len, _ref;
	    	tr = angular.element(document.createElement("tr"));
	    	_ref = this.tableConfiguration.columnConfigurations;
	      
	    	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    		i = _ref[_i];
	    		this.showColumnsArray.push(_ref[_i].attribute);
	    		tr.append(i.renderHtml());
	    	}
	    	return tr;
	    };
	
	    Table.prototype.setupHeader = function() {
	    	var header, thead, tr;
	    	if(this.element.find("thead").length > 0) {
	    		thead = this.element.find("thead");
	    	} else {
	    		thead = angular.element(document.createElement("thead"));
	    		this.element.prepend(thead);
	    	}
	    	if (thead) {
	    		//thead.attr("ng-show" , "!" + this.tableConfiguration.config + ".tableError");
	    		header = this.constructHeader();
	    		tr = angular.element(thead).find("tr");
	    		tr.remove();
	    		return thead.append(header);
	    	}
	    };
	
	    Table.prototype.getSetup = function() {
	    	if (this.tableConfiguration.paginated) {
	    		return new PaginatedSetup(this.configurationVariableNames);
	      	} else {
	      		return new StandardSetup(this.configurationVariableNames, this.tableConfiguration.list);
	      	}
	    };
	
	    Table.prototype.compile = function() {
	    	this.setupHeader();
	    	this.setup = this.getSetup();
	    	return this.setup.compile(this.element);
	    };
	
	    Table.prototype.setupInitialSorting = function($scope) {
	    	var bd, _i, _len, _ref, _results;
	    	_ref = this.tableConfiguration.columnConfigurations;
	    	_results = [];
	    	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    		bd = _ref[_i];
	    		if (bd.initialSorting) {
	    			if (!bd.attribute) {
	    				throw "initial-sorting specified without attribute.";
	    			}
	    			$scope.predicate = bd.attribute;
	    			_results.push($scope.descending = bd.initialSorting === "desc");
	    		} else {
	    			_results.push(void 0);
	    		}
	    	}
	    	return _results;
	    };
	
	    Table.prototype.post = function($scope, $element, $attributes, $filter, $http, table) {
	    	this.setupInitialSorting($scope);
	    	if (!$scope.getSortIcon) {
	    		$scope.getSortIcon = function(predicate, currentPredicate) {
	    			if (predicate !== $scope.predicate) {
	    				return "glyphicon glyphicon-minus";
	    			}
	    			if ($scope.descending) {
	    				return "glyphicon glyphicon-chevron-down";
	    			} else {
	    				return "glyphicon glyphicon-chevron-up";
	    			}
	    		};
	    	}
	    	return this.setup.link($scope, $element, $attributes, $filter, $http, table);
	    };
	    return Table;
  	})();

  	angular.module("angular-table").directive("atTable", [
	"$filter", "$http", "httpFactory", function($filter, $http, httpFactory) {
		return {
			restrict: "AC",
    		scope: true,
    		compile: function(element, attributes, transclude) {
    			var cvn, table, tc;
    			tc = new TableConfiguration(element, attributes);
    			cvn = new configurationVariableNames(attributes.atConfig);
    			table = new Table(element, tc, cvn);
    			table.compile();
    			
    			return {
    				post: function($scope, $element, $attributes) {
    					//$element.attr("ng-show" , "!" + table.tableConfiguration.config + ".tableError");
    					return table.post($scope, $element, $attributes, $filter, $http, table);
    				}
    			};
    		}
    	};
    }]);
 
	angular.module("angular-table").directive("atImplicit", [
		function() {
			return {
				restrict: "AC",
				compile: function(element, attributes, transclude) {
					var attribute;
					attribute = element.attr("at-attribute");
					if (!attribute) {
						throw "at-implicit specified without at-attribute: " + (element.html());
					}
					return element.append("{{item." + attribute + "}}");
				}
			};
	    }
	]);
  
  	angular.module("angular-table").directive("showColumn", function(){
  		return {
  			restrict: "AC",
  			compile: function(element, attributes, transclude) {
  				return {
  					post: function($scope, $element, $attributes) {
  						
  					}
  				}
  			}
  		}
  	})
}).call(this);