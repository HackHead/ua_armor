
  Vue.createApp({
    data() {
      return {
        cart: '',
        cartLen: '',
        navShow: false,
        singleProductQuantity: 1,
        qtyLimits: {
          min: 1,
          max: 10
        },
        activeTab: 'description'
      }
    },
    mounted(){
      this.fetchCart()
      this.initOwl()
      this.initTimer()
    },
    methods: {
      initOwl (){
        if ($().carousel) {
          $('.carousel').carousel()
        }
        if ($().owlCarousel) {
          $('.owl-carousel').each(function() {
            var $carousel = $(this);
            $carousel.find('> *').each(function(i) {
              $(this).attr('data-index', i)
            });
            var data = $carousel.data();
            var loop = data.loop ? data.loop : !0,
              margin = (data.margin || data.margin === 0) ? data.margin : 30,
              nav = data.nav ? data.nav : !1,
              navPrev = data.navPrev ? data.navPrev : '<ion-icon name="caret-back-outline"></ion-icon>',
              navNext = data.navNext ? data.navNext : '<ion-icon name="caret-forward-outline"></ion-icon>',
              dots = data.dots ? data.dots : !1,
              themeClass = data.themeclass ? data.themeclass : 'owl-theme',
              center = data.center ? data.center : !1,
              items = data.items ? data.items : 4,
              autoplay = data.autoplay ? data.autoplay : !1,
              speed = data.speed ? data.speed : 5000,
              responsiveXs = data.responsiveXs ? data.responsiveXs : 1,
              responsiveSm = data.responsiveSm ? data.responsiveSm : 2,
              responsiveMd = data.responsiveMd ? data.responsiveMd : 3,
              responsiveLg = data.responsiveLg ? data.responsiveLg : 4,
              responsiveXl = data.responsiveXl ? data.responsiveXl : 5,
              draggable = (data.draggable === !1) ? data.draggable : !0,
              syncedClass = (data.syncedClass) ? data.syncedClass : !1,
              filters = data.filters ? data.filters : !1;
            $carousel.owlCarousel({
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
              autoWidth: !1,
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
            }).addClass(themeClass);
            if (center) {
              $carousel.addClass('owl-center')
            }
            $(window).on('resize', function() {
              $carousel.trigger('refresh.owl.carousel')
            });
            if ($carousel.hasClass('owl-news-slider-items') && syncedClass) {
              $carousel.on('changed.owl.carousel', function(e) {
                var indexTo = loop ? e.item.index + 1 : e.item.index;
                $(syncedClass).trigger('to.owl.carousel', [indexTo])
              })
            }
          })
        }
        if ($().owlCarousel) {
          $('.uws-products.carousel').each(function() {
            var $carousel = $(this);
            $carousel.find('> *').each(function(i) {
              $(this).attr('data-index', i)
            });
            var data = $carousel.data();
            var loop = data.loop ? data.loop : !0,
              margin = (data.margin || data.margin === 0) ? data.margin : 30,
              nav = data.nav ? data.nav : !1,
              navPrev = data.navPrev ? data.navPrev : '<ion-icon name="caret-back-outline"></ion-icon>',
              navNext = data.navNext ? data.navNext : '<ion-icon name="caret-forward-outline"></ion-icon>',
              dots = data.dots ? data.dots : !1,
              themeClass = data.themeclass ? data.themeclass : 'owl-theme',
              center = data.center ? data.center : !1,
              items = data.items ? data.items : 4,
              autoplay = data.autoplay ? data.autoplay : !1,
              speed = data.speed ? data.speed : 5000,
              responsiveXs = data.responsiveXs ? data.responsiveXs : 1,
              responsiveSm = data.responsiveSm ? data.responsiveSm : 2,
              responsiveMd = data.responsiveMd ? data.responsiveMd : 3,
              responsiveLg = data.responsiveLg ? data.responsiveLg : 4,
              responsiveXl = data.responsiveXl ? data.responsiveXl : 5,
              draggable = (data.draggable === !1) ? data.draggable : !0,
              syncedClass = (data.syncedClass) ? data.syncedClass : !1;
            var $products = $carousel.find('ul').addClass('owl-carousel owl-shadowitems owl-theme');
            if ($carousel.hasClass('top-nav-arrows')) {
              var $classNname = 'top-nav-arrows';
              $carousel.removeClass($classNname);
              $products.addClass($classNname)
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
              autoWidth: !1,
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
            }).addClass(themeClass);
            if (center) {
              $products.addClass('owl-center')
            }
            $(window).on('resize', function() {
              $products.trigger('refresh.owl.carousel')
            })
          })
        }
        $(document).ready(function() {
          var sync1 = $("#sync1");
          var sync2 = $("#sync2");
          sync1.owlCarousel({
            singleItem: !0,
            autoPlay: !0,
            slideSpeed: 1000,
            navigation: !1,
            pagination: !1,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
          });
          sync2.owlCarousel({
            items: 5,
            itemsDesktop: [1199, 10],
            itemsDesktopSmall: [979, 10],
            itemsTablet: [768, 8],
            itemsMobile: [479, 4],
            pagination: !1,
            responsiveRefreshRate: 100,
            afterInit: function(el) {
              el.find(".owl-item").eq(0).addClass("synced")
            }
          });
        
          function syncPosition(el) {
            var current = this.currentItem;
            $("#sync2").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
            if ($("#sync2").data("owlCarousel") !== undefined) {
              center(current)
            }
          }
          $("#sync2").on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number)
          });
        
          function center(number) {
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = !1;
            for (var i in sync2visible) {
              if (num === sync2visible[i]) {
                var found = !0
              }
            }
            if (found === !1) {
              if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
              } else {
                if (num - 1 === -1) {
                  num = 0
                }
                sync2.trigger("owl.goTo", num)
              }
            } else if (num === sync2visible[sync2visible.length - 1]) {
              sync2.trigger("owl.goTo", sync2visible[1])
            } else if (num === sync2visible[0]) {
              sync2.trigger("owl.goTo", num - 1)
            }
          }
        });
        $('[data-star]').click((e) => {
          e.preventDefault()
          const rate = $(e.currentTarget).attr('data-star');
          $('.stars').addClass('selected');
          $('[data-star]').each(function() {
            $(this).removeClass('active')
          });
          $(e.currentTarget).addClass('active');
          $('#rtn').val(rate)
        });
      },
      async fetchCart(){
        await axios.get("/api/cart/all").then((res) => {
          if(res.data.cart){
            this.cart = res?.data?.cart;
            this.cartLen = this?.cart?.products?.length
          }
        })
      },
      async addToCart(e){
        const product = e.target.getAttribute('data-product-id'),
              quantity = this.singleProductQuantity;
          const initModal = (type, text) => {
            const popup = document.querySelector('.product-added-popup');
            switch (type) {
                case 'danger':
                    popup.classList.add('danger');
                    break;
                case 'success':
                    popup.classList.add('success');
                    break;
            }
            popup.textContent = text
            popup.classList.remove('hidden');
            setTimeout(() => {
                popup.classList.add('hidden')
            }, 4000)
        }
        e.target.setAttribute("disabled", "");
        e.target.classList.add("waiting");
        e.target.innerHTML = `
            <span class="loading-block"></span>
            <span class="loading-block"></span>
            <span class="loading-block"></span>
        `;

        await axios.post('/api/cart/add', {
          product: product,
          quantity: quantity,
        }).then((res) => {
          this.singleProductQuantity = 1;
          e.target.removeAttribute("disabled");
          e.target.classList.remove("waiting");
          e.target.innerHTML = `В корзину`;
          initModal('success','Додано в корзину')
          this.cart = res.data.cart;
          this.cartLen = this.cart.products.length

        })
      },
      async removeFromCart(e){
        const product = e.target.getAttribute('data-product-id');
        await axios.post('/api/cart/remove', {
          product: product,
        }).then((res) => {
          this.cart = res.data.cart;
          this.cartLen = this.cart.products.length
        })
        
      },
      updateProductQuantity(e, action){
        const [min, max] = [this.qtyLimits.min, this.qtyLimits.max];
        if(action === 'add') {
          if(this.singleProductQuantity < max) this.singleProductQuantity++;
        };
        if(action === 'rm') {
          if(this.singleProductQuantity > min) this.singleProductQuantity--;
        };
      },
      initFilter(key, value){
          if ('URLSearchParams' in window) {
            var searchParams = new URLSearchParams(window.location.search);
            
            searchParams.set(key, value);
            
            window.location.search = searchParams.toString();
            
        }
      },
      filterPrice(e){
        if ('URLSearchParams' in window) {
          var searchParams = new URLSearchParams(window.location.search);
          const min = e.target.elements[0].value,
                max = e.target.elements[1].value;
          if(min) searchParams.set('min', min);
          if(max) searchParams.set('max', max);
          
          window.location.search = searchParams.toString();
          
      }
      },
      initTimer(){
        function getTimeRemaining(endtime) {
          const total = Date.parse(endtime) - Date.parse(new Date());
          const seconds = Math.floor((total / 1000) % 60);
          const minutes = Math.floor((total / 1000 / 60) % 60);
          const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
          const days = Math.floor(total / (1000 * 60 * 60 * 24));
          
          return {
            total,
            days,
            hours,
            minutes,
            seconds
          };
        }
        
        function initializeClock(endtime) {
          const daysSpan = document.querySelector('[data-promotion-days]');
          const hoursSpan = document.querySelector('[data-promotion-hours]');
          const minutesSpan = document.querySelector('[data-promotion-minutes]');
          const secondsSpan = document.querySelector('[data-promotion-seconds]');
          
          function updateClock() {
          
            const t = getTimeRemaining(endtime);
            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        
            if (t.total <= 0) {
              clearInterval(timeinterval);
            }
          }
        
          updateClock();
          const timeinterval = setInterval(updateClock, 1000);
        }
        
        const deadline = new Date(Date.parse(document.querySelector("[data-promotion-deadline]")?.getAttribute('data-promotion-deadline')));
        if(document.querySelector('[data-promotion-container]')) initializeClock(deadline);;
        
      }
    },
  }).mount('#app')