'use strict';

app.controller('keystoreCtrl',function($scope,$state,$timeout){
	$timeout(function(){
	
		jQuery('#datatable-responsive').DataTable({
			lengthChange: false,
			searching: false,
			order: false,
			bSort: false
		});

	jQuery('input').iCheck({
		checkboxClass: 'icheckbox_flat-green',
		radioClass: 'iradio_flat-green'
	});

	jQuery('.tree').treegrid();

	},20);
});