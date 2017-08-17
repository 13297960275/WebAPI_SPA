'use strict';

app.controller('partnerDetailCtrl',function($scope,$state,$timeout){
	
	$timeout(function(){

		jQuery('#datatable-responsive, #datatable-responsive2').DataTable({
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