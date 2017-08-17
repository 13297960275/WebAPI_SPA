"use strict";
app.constant("Modules_Config", function(swanRelativePath) {
	return {
	  Modules_Config : [{
	    name: "swan.ui.bootstrap",
	    module: true,
	    files: [
	        swanRelativePath + "swan/bootstrap/ui-bootstrap-tpls.js"
	    ],
	    serie: true
	  },{
	    name: "swan.ui.chart",
	    files: [
	      swanRelativePath + "swan/chart/Chart.js", 
	      swanRelativePath + "swan/chart/angular-chart.js"
	    ],
	    serie: true
	  },{
	    name: "swan.service.translate",
	    module: true,
	    files: [
	      swanRelativePath + "swan/translate/angular-translate.js", 
	      swanRelativePath + "swan/translate/angular-translate-loader-static-files.js",
	      swanRelativePath + "swan/translate/angular-translate-rule.js"
	    ],
	    serie: true
	  }, {
	    name: "swan.service.httpService",
	    module: true,
	    files: [
	      swanRelativePath + "swan/service/httpService.js"
	    ],
	    serie: true
	  }, {
	    name: "swan.ui.pagination",
	    module: true,
	    files: [
	      swanRelativePath + "swan/pagination/sng-pagination.js"
	    ],
	    serie: true
	  }, {
	    name: "swan.ui.dialog",
	    module: true,
	    files: [
	      swanRelativePath + "swan/dialog/sng-dialog.js"
	    ],
	    serie: true
	  }, {
	    name: "swan.ui.tree",
	    module: true,
	    files: [
	      swanRelativePath + "swan/tree/angular-tree-control.js", swanRelativePath + "swan/tree/tree-control.css"
	    ],
	    serie: true
	  },{
	    name: "swan.service.validation",
	    module: true,
	    files: [
	      swanRelativePath + "swan/validation/angular-validation.js", swanRelativePath + "swan/validation/angular-validation-rule.js"
	    ],
	    serie: true
	  }, {
	    name: "swan.service.fileUpload",
	    module: true,
	    files: [
	      swanRelativePath + "swan/fileUpload/angular-file-upload.js", 
	      swanRelativePath + "swan/fileUpload/imgDirectives.js"
	    ],
	    serie: true
	  }]
	}
})
.config(["$ocLazyLoadProvider", "Modules_Config", "swanRelativePath", routeFn]);

function routeFn($ocLazyLoadProvider, Modules_Config, swanRelativePath) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: false,
    modules: Modules_Config(swanRelativePath).Modules_Config
  });
};