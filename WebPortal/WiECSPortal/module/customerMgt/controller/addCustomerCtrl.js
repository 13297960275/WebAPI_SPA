'use strict';

app.controller('addCustomerCtrl',function($scope,$state,$timeout){
	$timeout(function(){

	jQuery('#datatable-responsive').DataTable({
		lengthChange: false,
		searching: false,
		order: [[2, "asc"]],
		columnDefs: [{ "orderable": false, "targets": 3 }]
	});

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

	jQuery(".info-update").click(function () {
		jQuery('#wizard').smartWizard("goToStep", 1);
	});
	jQuery(".sub-update").click(function () {
		jQuery('#wizard').smartWizard("goToStep", 2);
	});

	},20);
});