


//toggle ECS menu
    jQuery(".arrow-down").hide();
    jQuery("#ecsMenu").click(function(){
            jQuery("#ECSitem").slideToggle();
            jQuery(this).find(".arrow-up, .arrow-down").toggle();
    });
    jQuery(".icon-menu-hamburger").click(function(){
            jQuery('.top-menu').addClass('open').slideDown();
            jQuery('.icon-menu-hamburger').css('visibility','hidden');
            jQuery('.icon-menu-close').css('visibility','visible');
    }); 
    jQuery(".icon-menu-close").click(function(){
            jQuery('.top-menu').addClass('open').slideUp();
            jQuery('.icon-menu-hamburger').css('visibility','visible');
            jQuery('.icon-menu-close').css('visibility','hidden');
    });

//swiper
    var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 6,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        });
//window resize
    jQuery(window).resize(function(){
      var ww = jQuery(window).width();
      //for swiper item num
      if (ww>992) swiper.params.slidesPerView = 6;
      if (ww<=992) swiper.params.slidesPerView = 4;
      //for swiper item show in small screen
      if (ww<768){
            jQuery('.swiper').removeClass('swiper-container');
            jQuery('.swiper-wrapper-xs').removeClass('swiper-wrapper');
      }else{
            jQuery('#ecsMenu').show();
            jQuery('.swiper').addClass('swiper-container');
            jQuery('.swiper-wrapper-xs').addClass('swiper-wrapper');
      }
      // swiper.reInit();
    });
    jQuery(window).trigger('resize');


