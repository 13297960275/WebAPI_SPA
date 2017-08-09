


//toggle ECS menu
    $(".arrow-down").hide();
    $("#ecsMenu").click(function(){
            $("#ECSitem").slideToggle();
            $(this).find(".arrow-up, .arrow-down").toggle();
    });
    $(".icon-menu-hamburger").click(function(){
            $('.top-menu').addClass('open').slideDown();
            $('.icon-menu-hamburger').css('visibility','hidden');
            $('.icon-menu-close').css('visibility','visible');
    }); 
    $(".icon-menu-close").click(function(){
            $('.top-menu').addClass('open').slideUp();
            $('.icon-menu-hamburger').css('visibility','visible');
            $('.icon-menu-close').css('visibility','hidden');
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
    $(window).resize(function(){
      var ww = $(window).width();
      //for swiper item num
      if (ww>992) swiper.params.slidesPerView = 6;
      if (ww<=992) swiper.params.slidesPerView = 4;
      //for swiper item show in small screen
      if (ww<768){
            $('.swiper').removeClass('swiper-container');
            $('.swiper-wrapper-xs').removeClass('swiper-wrapper');
      }else{
            $('#ecsMenu').show();
            $('.swiper').addClass('swiper-container');
            $('.swiper-wrapper-xs').addClass('swiper-wrapper');
      }
      swiper.reInit();
    })
    $(window).trigger('resize');
    



