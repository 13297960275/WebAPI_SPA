'use strict';

app.controller('subscriptionCtrl', function ($scope, $state,$timeout) {

$timeout(function(){
	//Datatables 
	if ( jQuery.fn.dataTable.isDataTable( '#datatable-responsive' ) ) {
    table = jQuery('#datatable-responsive').DataTable();
}else{
		jQuery('#datatable-responsive').DataTable({
			lengthChange: false,
			searching: false,
			order: false,
			bSort: false
	});
}

	jQuery('input[type=radio]').addClass('flat');
	jQuery('.tree').treegrid();
	
},20);

    $scope.goToSubDetail = function () {
        $state.go('main.subscription.detail');
    };

    $scope.goToCust = function () {
        alert('sub');
        $state.go('main.customerMgt');
    };
});