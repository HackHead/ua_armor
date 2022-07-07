
if($().carousel){$('.carousel').carousel()}
if($().owlCarousel){$('.owl-carousel').each(function(){var $carousel=$(this);$carousel.find('> *').each(function(i){$(this).attr('data-index',i)});var data=$carousel.data();var loop=data.loop?data.loop:!0,margin=(data.margin||data.margin===0)?data.margin:30,nav=data.nav?data.nav:!1,navPrev=data.navPrev?data.navPrev:'<ion-icon name="caret-back-outline"></ion-icon>',navNext=data.navNext?data.navNext:'<ion-icon name="caret-forward-outline"></ion-icon>',dots=data.dots?data.dots:!1,themeClass=data.themeclass?data.themeclass:'owl-theme',center=data.center?data.center:!1,items=data.items?data.items:4,autoplay=data.autoplay?data.autoplay:!1,speed=data.speed?data.speed:5000,responsiveXs=data.responsiveXs?data.responsiveXs:1,responsiveSm=data.responsiveSm?data.responsiveSm:2,responsiveMd=data.responsiveMd?data.responsiveMd:3,responsiveLg=data.responsiveLg?data.responsiveLg:4,responsiveXl=data.responsiveXl?data.responsiveXl:5,draggable=(data.draggable===!1)?data.draggable:!0,syncedClass=(data.syncedClass)?data.syncedClass:!1,filters=data.filters?data.filters:!1;
$carousel.owlCarousel({loop:loop,margin:margin,nav:nav,autoplay:autoplay,autoplayTimeout:speed,dots:dots,themeClass:themeClass,center:center,navText:[navPrev,navNext],mouseDrag:draggable,touchDrag:draggable,items:items,autoWidth:!1,responsive:{0:{items:responsiveXs},575:{items:responsiveSm},767:{items:responsiveMd},992:{items:responsiveLg},1200:{items:responsiveXl}},}).addClass(themeClass);if(center){$carousel.addClass('owl-center')}
$(window).on('resize',function(){$carousel.trigger('refresh.owl.carousel')});if($carousel.hasClass('owl-news-slider-items')&&syncedClass){$carousel.on('changed.owl.carousel',function(e){var indexTo=loop?e.item.index+1:e.item.index;$(syncedClass).trigger('to.owl.carousel',[indexTo])})}})}
if($().owlCarousel){$('.uws-products.carousel').each(function(){var $carousel=$(this);$carousel.find('> *').each(function(i){$(this).attr('data-index',i)});var data=$carousel.data();var loop=data.loop?data.loop:!0,margin=(data.margin||data.margin===0)?data.margin:30,nav=data.nav?data.nav:!1,navPrev=data.navPrev?data.navPrev:'<ion-icon name="caret-back-outline"></ion-icon>',navNext=data.navNext?data.navNext:'<ion-icon name="caret-forward-outline"></ion-icon>',dots=data.dots?data.dots:!1,themeClass=data.themeclass?data.themeclass:'owl-theme',center=data.center?data.center:!1,items=data.items?data.items:4,autoplay=data.autoplay?data.autoplay:!1,speed=data.speed?data.speed:5000,responsiveXs=data.responsiveXs?data.responsiveXs:1,responsiveSm=data.responsiveSm?data.responsiveSm:2,responsiveMd=data.responsiveMd?data.responsiveMd:3,responsiveLg=data.responsiveLg?data.responsiveLg:4,responsiveXl=data.responsiveXl?data.responsiveXl:5,draggable=(data.draggable===!1)?data.draggable:!0,syncedClass=(data.syncedClass)?data.syncedClass:!1;var $products=$carousel.find('ul').addClass('owl-carousel owl-shadowitems owl-theme');if($carousel.hasClass('top-nav-arrows')){var $classNname='top-nav-arrows';$carousel.removeClass($classNname);$products.addClass($classNname)}
$products.owlCarousel({loop:loop,margin:margin,nav:nav,autoplay:autoplay,autoplayTimeout:speed,dots:dots,themeClass:themeClass,center:center,navText:[navPrev,navNext],mouseDrag:draggable,touchDrag:draggable,items:items,autoWidth:!1,responsive:{0:{items:responsiveXs},575:{items:responsiveSm},767:{items:responsiveMd},992:{items:responsiveLg},1200:{items:responsiveXl}},}).addClass(themeClass);if(center){$products.addClass('owl-center')}
$(window).on('resize',function(){$products.trigger('refresh.owl.carousel')})})}
$(document).ready(function(){var sync1=$("#sync1");var sync2=$("#sync2");sync1.owlCarousel({singleItem:!0,autoPlay:!0,slideSpeed:1000,navigation:!1,pagination:!1,afterAction:syncPosition,responsiveRefreshRate:200,});sync2.owlCarousel({items:5,itemsDesktop:[1199,10],itemsDesktopSmall:[979,10],itemsTablet:[768,8],itemsMobile:[479,4],pagination:!1,responsiveRefreshRate:100,afterInit:function(el){el.find(".owl-item").eq(0).addClass("synced")}});function syncPosition(el){var current=this.currentItem;$("#sync2").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
if($("#sync2").data("owlCarousel")!==undefined){center(current)}}
$("#sync2").on("click",".owl-item",function(e){e.preventDefault();var number=$(this).data("owlItem");sync1.trigger("owl.goTo",number)});function center(number){var sync2visible=sync2.data("owlCarousel").owl.visibleItems;var num=number;var found=!1;for(var i in sync2visible){if(num===sync2visible[i]){var found=!0}}
if(found===!1){if(num>sync2visible[sync2visible.length-1]){sync2.trigger("owl.goTo",num-sync2visible.length+2)}else{if(num-1===-1){num=0}
sync2.trigger("owl.goTo",num)}}else if(num===sync2visible[sync2visible.length-1]){sync2.trigger("owl.goTo",sync2visible[1])}else if(num===sync2visible[0]){sync2.trigger("owl.goTo",num-1)}}});$('[data-star]').click((e)=>{e.preventDefault()
const rate=$(e.currentTarget).attr('data-star');
$('.stars').addClass('selected');
$('[data-star]').each(function(){$(this).removeClass('active')});$(e.currentTarget).addClass('active');
$('#rtn').val(rate)});


(function(){
  const filterLinks = document.querySelectorAll('[data-filter-link]');
  const filterOption = document.querySelector('[data-filter-option]');
  const handleFilterLink = (e) => {
    e.preventDefault();
    if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search);
      const key = e.target.getAttribute('data-filter-key'),
            value = e.target.getAttribute('data-filter-value');

      searchParams.set(key, value);
      
      window.location.search = searchParams.toString();
  }
  }

  document.addEventListener('click', (e) => {
    if(e.target.hasAttribute('data-filter-link')) {
      handleFilterLink(e)
    }
  });

  
  if(filterOption) {
    filterOption.addEventListener('change', (e) => {
      if ('URLSearchParams' in window) {
        var searchParams = new URLSearchParams(window.location.search);
        const key = e.target.querySelector(`[value="${e.target.value}"]`).getAttribute('data-filter-key'),
            value = e.target.querySelector(`[value="${e.target.value}"]`).getAttribute('data-filter-value');
  
        searchParams.set(key, value);
        
        window.location.search = searchParams.toString();
    }
      
    })

  }
  
  document.addEventListener('load', () => {
    document.querySelector('.cat-item-all').textContent = document?.querySelectorAll('.total_products')?.length;
  })
})();


