'use strict';

app.controller('customerCtrl', function ($scope, $state,$timeout) {

    $timeout(function(){
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
    jQuery('.tree').treegrid({
        expanderExpandedClass: 'fa fa-angle-down fa-lg',
        expanderCollapsedClass: 'fa fa-angle-right fa-lg'
    });
    },20);
    

    $scope.goToAddPartner = function () {
        $state.go('main.customerMgt.addPartner')
    };

    $scope.goToAddCustomer = function () {
        $state.go('main.customerMgt.addCustomer')
    };

    $scope.goToPartnerDetail = function () {
        $state.go('main.customerMgt.partnerDetail')
    };

    $scope.goToCustomerDetail = function () {
        $state.go('main.customerMgt.customerDetail')
    };

})