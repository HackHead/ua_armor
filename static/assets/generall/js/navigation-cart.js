
window.addEventListener('load', () => {
    (function(){
        const dropDownCart = document.querySelector('[data-dropdown-cart]'),
              dropDownMenu = document.querySelector('[data-dropdown-menu]'),
              amount = document?.querySelector('[data-navigation-cart-amount]');
        const toggleCart = () => {
            dropDownMenu?.classList.toggle('show')
        }
        const renderCart = (data) => {
            const totalItems = document.querySelector('[data-navigation-cart-total-items]');
            totalItems.textContent = `(${data.cart.products.length})`;
            amount.textContet = `${data.cart.total}`
        }
        const removeItem = (btn) => {
            const pid = btn.getAttribute('data-product-id');
                  itemWrap = document.querySelector(`[data-navigation-cart-item="${pid}"]`);
            itemWrap.style.opacity = 0;
            itemWrap.style.transition = `all 0.4s linear`;

            axios.post('/cart/remove', {
                product: pid
            }).then((data) => {
                itemWrap.classList.add('d-none');
                renderCart()
            }).catch((err) => {
                itemWrap.classList.remove('d-none');
                itemWrap.style.opacity = 1;
            })
        }
        dropDownCart.addEventListener('click', (e) => {
            if(e.target.hasAttribute('data-dropdown-toggle')){
                toggleCart()
            } else if (e.target.hasAttribute('data-navigation-cart-remove-button')){
                removeItem(e.target)
            }
        })
    })();
})