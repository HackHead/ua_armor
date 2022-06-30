  //bootstrap carousel
  if ($().carousel) {
    $('.carousel').carousel();
}
    if ($().owlCarousel) {
    $('.owl-carousel').each(function () {
        var $carousel = $(this);
        $carousel.find('> *').each(function (i) {
            $(this).attr('data-index', i);
        });
        var data = $carousel.data();

        var loop = data.loop ? data.loop : true,
            margin = (data.margin || data.margin === 0) ? data.margin : 30,
            nav = data.nav ? data.nav : false,
            navPrev = data.navPrev ? data.navPrev : '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            navNext = data.navNext ? data.navNext : '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
            dots = data.dots ? data.dots : false,
            themeClass = data.themeclass ? data.themeclass : 'owl-theme',
            center = data.center ? data.center : false,
            items = data.items ? data.items : 4,
            autoplay = data.autoplay ? data.autoplay : false,
            speed = data.speed ? data.speed : 5000,
            responsiveXs = data.responsiveXs ? data.responsiveXs : 1,
            responsiveSm = data.responsiveSm ? data.responsiveSm : 2,
            responsiveMd = data.responsiveMd ? data.responsiveMd : 3,
            responsiveLg = data.responsiveLg ? data.responsiveLg : 4,
            responsiveXl = data.responsiveXl ? data.responsiveXl : 5,
            draggable = (data.draggable === false) ? data.draggable : true,
            syncedClass = (data.syncedClass) ? data.syncedClass : false,
            filters = data.filters ? data.filters : false;

        

        $carousel.owlCarousel({
            loop: loop,
            margin: margin,
            nav: nav,
            autoplay: autoplay,
            autoplayTimeout: speed,
            dots: dots,
            themeClass: themeClass,
            center: center,
            // navText: [navPrev, navNext],
            mouseDrag: draggable,
            touchDrag: draggable,
            items: items,
       autoWidth: false,
            responsive: {
                0: {
                    items: responsiveXs
                },
                575: {
                    items: responsiveSm
                },
                767: {
                    items: responsiveMd
                },
                992: {
                    items: responsiveLg
                },
                1200: {
                    items: responsiveXl
                }
            },
        })
            .addClass(themeClass);
        if (center) {
            $carousel.addClass('owl-center');
        }

        $(window).on('resize', function () {
            $carousel.trigger('refresh.owl.carousel');
        });

        //topline two synced carousels
        if ($carousel.hasClass('owl-news-slider-items') && syncedClass) {
            $carousel.on('changed.owl.carousel', function (e) {
                var indexTo = loop ? e.item.index + 1 : e.item.index;
                $(syncedClass).trigger('to.owl.carousel', [indexTo]);
            })
        }


    });


} //eof owl-carousel
if ($().owlCarousel) {
    $('.uws-products.carousel').each(function () {
        var $carousel = $(this);
        $carousel.find('> *').each(function (i) {
            $(this).attr('data-index', i);
        });
        var data = $carousel.data();

        var loop = data.loop ? data.loop : true,
            margin = (data.margin || data.margin === 0) ? data.margin : 30,
            nav = data.nav ? data.nav : false,
            navPrev = data.navPrev ? data.navPrev : '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            navNext = data.navNext ? data.navNext : '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
            dots = data.dots ? data.dots : false,
            themeClass = data.themeclass ? data.themeclass : 'owl-theme',
            center = data.center ? data.center : false,
            items = data.items ? data.items : 4,
            autoplay = data.autoplay ? data.autoplay : false,
            speed = data.speed ? data.speed : 5000,
            responsiveXs = data.responsiveXs ? data.responsiveXs : 1,
            responsiveSm = data.responsiveSm ? data.responsiveSm : 2,
            responsiveMd = data.responsiveMd ? data.responsiveMd : 3,
            responsiveLg = data.responsiveLg ? data.responsiveLg : 4,
            responsiveXl = data.responsiveXl ? data.responsiveXl : 5,
            draggable = (data.draggable === false) ? data.draggable : true,
            syncedClass = (data.syncedClass) ? data.syncedClass : false;


        var $products = $carousel.find('ul').addClass('owl-carousel owl-shadowitems owl-theme');
        if($carousel.hasClass('top-nav-arrows')){
            var $classNname = 'top-nav-arrows';
            $carousel.removeClass($classNname);
            $products.addClass($classNname);
        }
        $products.owlCarousel({
            loop: loop,
            margin: margin,
            nav: nav,
            autoplay: autoplay,
            autoplayTimeout: speed,
            dots: dots,
            themeClass: themeClass,
            center: center,
            navText: [navPrev, navNext],
            mouseDrag: draggable,
            touchDrag: draggable,
            items: items,
            responsive: {
                0: {
                    items: responsiveXs
                },
                575: {
                    items: responsiveSm
                },
                767: {
                    items: responsiveMd
                },
                992: {
                    items: responsiveLg
                },
                1200: {
                    items: responsiveXl
                }
            },
        })
            .addClass(themeClass);
        if (center) {
            $products.addClass('owl-center');
        }

        $(window).on('resize', function () {
            $products.trigger('refresh.owl.carousel');
        });

    });
} 