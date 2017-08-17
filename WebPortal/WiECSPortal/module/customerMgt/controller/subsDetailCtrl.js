'use strict';

app.controller('subsDetailCtrl',function($scope,$state,$timeout){
	
	$timeout(function(){
// Datatables 
		jQuery('#datatable-responsive, #datatable-responsive2').DataTable({
			lengthChange: false,
			searching: false,
			order: false,
			bSort: false
		});

// /Datatables
	jQuery('#wizard').smartWizard();
	jQuery('input').iCheck({
		checkboxClass: 'icheckbox_flat-green',
		radioClass: 'iradio_flat-green'
	});

// license input control
	jQuery('.license-input').hide();
	jQuery('.sub-item label').click(function () {
		var itemCheckobx = jQuery(this).find('input[type=checkbox]');
		if (itemCheckobx.is(":checked")) {
			jQuery(this).next('.license-input').show();
		} else {
			jQuery(this).next('.license-input').hide();
		}
	});

// smartWizard goToStep

	jQuery(".sub-update").click(function () {
		jQuery('#wizard').smartWizard("goToStep", 1);
	});
	jQuery(".button-cancel").click(function () {
		jQuery('#add-sub').modal('hide');
	});

	},20);

});