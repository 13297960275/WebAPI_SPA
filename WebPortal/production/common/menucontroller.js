'use strict';

app.controller('menucontroller', function ($scope, $state) {
    //toggle ECS menu
    jQuery(".arrow-down").hide();
    jQuery("#ecsMenu").click(function () {
        jQuery("#ECSitem").slideToggle();
        jQuery(this).find(".arrow-up, .arrow-down").toggle();
    });
    jQuery(".icon-menu-hamburger").click(function () {
        jQuery('.top-menu').addClass('open').slideDown();
        jQuery('.icon-menu-hamburger').css('visibility', 'hidden');
        jQuery('.icon-menu-close').css('visibility', 'visible');
    });
    jQuery(".icon-menu-close").click(function () {
        jQuery('.top-menu').addClass('open').slideUp();
        jQuery('.icon-menu-hamburger').css('visibility', 'visible');
        jQuery('.icon-menu-close').css('visibility', 'hidden');
    });

    $scope.goToRatecard = function () {
        $state.go('main.rateCard');
    };
});