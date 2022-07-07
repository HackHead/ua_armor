
window.addEventListener('load', () => {
    (function(){
        const dropDownCart = document.querySelector('[data-dropdown-cart]'),
              dropDownMenu = document.querySelector('[data-dropdown-menu]'),
              amount = document?.querySelector('[data-navigation-cart-amount]'),
              cartBtn = document.querySelector('[data-dropdown-toggle]');

        // document.addEventListener('click', (e) => {
        //     if(e.target.hasAttribute('data-dropdown-toggle')){
        //         dropDownMenu?.classList.toggle('show')
        //     }
        //     else {
        //         dropDownMenu?.classList.remove('show')
        //     }
        // });
        // cartBtn.addEventListener('mouseover', (e) => {
        //     axios.get('/api/cart/all')
        //          .then((data) => {
        //             console.log(data)
        //          })
        //     const render = () => {
        //         const mainTemplate = `
        //         .widget.woocommerce.widget_shopping_cart
        //         .widget_shopping_cart_content
        //           ul.woocommerce-mini-cart.cart_list.product_list_widget
        //             li.woocommerce-mini-cart-item.mini_cart_item
        //               a(href='http://webdesign-finder.com/armashop/product/deathraze-foe-of-eternal/')
        //                 img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail(src='http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4.png' alt='' srcset='http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4.png 800w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-150x150.png 150w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-300x300.png 300w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-768x768.png 768w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-600x600.png 600w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-100x100.png 100w' sizes='(max-width: 800px) 100vw, 800px' width='800' height='800')
        //               .minicart-product-meta
        //                 a(href='http://webdesign-finder.com/armashop/product/deathraze-foe-of-eternal/') Deathraze, Foe Of Eternal&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
        //                 span.quantity
        //                   | 2 &times; 
        //                   span.woocommerce-Price-amount.amount
        //                     span.woocommerce-Price-currencySymbol &pound;
        //                     | 18
        //                     sup 00
        //             li.woocommerce-mini-cart-item.mini_cart_item
        //               a(href='http://webdesign-finder.com/armashop/product/deathraze-foe-of-eternal/')
        //                 img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail(src='http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4.png' alt='' srcset='http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4.png 800w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-150x150.png 150w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-300x300.png 300w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-768x768.png 768w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-600x600.png 600w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-100x100.png 100w' sizes='(max-width: 800px) 100vw, 800px' width='800' height='800')
        //               .minicart-product-meta
        //                 a(href='http://webdesign-finder.com/armashop/product/deathraze-foe-of-eternal/') Deathraze, Foe Of Eternal&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
        //                 span.quantity
        //                   | 2 &times; 
        //                   span.woocommerce-Price-amount.amount
        //                     span.woocommerce-Price-currencySymbol &pound;
        //                     | 18
        //                     sup 00
        //             li.woocommerce-mini-cart-item.mini_cart_item
        //               a(href='http://webdesign-finder.com/armashop/product/deathraze-foe-of-eternal/')
        //                 img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail(src='http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4.png' alt='' srcset='http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4.png 800w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-150x150.png 150w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-300x300.png 300w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-768x768.png 768w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-600x600.png 600w, http://webdesign-finder.com/armashop/wp-content/uploads/2020/03/gun_4-100x100.png 100w' sizes='(max-width: 800px) 100vw, 800px' width='800' height='800')
        //               .minicart-product-meta
        //                 a(href='http://webdesign-finder.com/armashop/product/deathraze-foe-of-eternal/') Deathraze, Foe Of Eternal&#x9;&#x9;&#x9;&#x9;&#x9;&#x9;
        //                 span.quantity
        //                   | 2 &times; 
        //                   span.woocommerce-Price-amount.amount
        //                     span.woocommerce-Price-currencySymbol &pound;
        //                     | 18
        //                     sup 00
        //               // .minicart-product-meta
        //           p.woocommerce-mini-cart__total.total
        //             strong Subtotal:
        //             span.woocommerce-Price-amount.amount
        //               span.woocommerce-Price-currencySymbol &pound;
        //               | 36
        //               sup 00
        //           p.woocommerce-mini-cart__buttons.buttons
        //             a.button.wc-forward(href='/cart/') Переглянути
        //             a.button.checkout.wc-forward(href='/order/') Придбати                
        //         `
        //     }
        // })
    })();
})