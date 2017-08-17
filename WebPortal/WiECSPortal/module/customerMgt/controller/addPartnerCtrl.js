'use strict';

app.controller('addPartnerCtrl',function($scope,$state,$timeout){
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
	jQuery('#sub-items label').click(function () {
		if (this.find('.sub-item').checked) {
			jQuery(this).parent().sibling('.license-input').show();

			alert(change)
		}
		alert(checked)
	});

	jQuery(".info-update").click(function (e) {
		wizardContent.smartWizard("goToStep", 1);
	});
	jQuery(".sub-update").click(function (e) {
		wizardContent.smartWizard("goToStep", 2);
	});
	},20);
});