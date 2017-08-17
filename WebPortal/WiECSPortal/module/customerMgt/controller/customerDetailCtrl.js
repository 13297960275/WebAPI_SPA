'use strict';

app.controller('customerDetailCtrl',function($scope,$state,$timeout){
	
	$timeout(function(){

		jQuery('#datatable-responsive, #datatable-responsive2').DataTable({
			lengthChange: false,
			searching: false,
			order: false,
			bSort: false
		});

	jQuery('.tree').treegrid();
	jQuery('#wizard').smartWizard();
	jQuery('input').iCheck({
		checkboxClass: 'icheckbox_flat-green',
		radioClass: 'iradio_flat-green'
	});

	jQuery('.license-input').hide();
	jQuery('.sub-item label').click(function () {
		var itemCheckobx = jQuery(this).find('input[type=checkbox]');
		if (itemCheckobx.is(":checked")) {
			jQuery(this).next('.license-input').show();
		} else {
			jQuery(this).next('.license-input').hide();
		}
	});

	},20);

});