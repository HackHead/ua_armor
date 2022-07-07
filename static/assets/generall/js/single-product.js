
window.addEventListener('load', () => {
    (function(){
        const cartBtn = document.querySelector('[data-single-product-cart-button]'),
              itemAdd = document.querySelector('[data-single-product-add-item]'),
              itemRemove = document.querySelector('[data-single-product-remove-item]'),
              qtyInput = document.querySelector('[data-single-product-qty-input]'),
              product = cartBtn.getAttribute('data-single-product-id'),
              content = document.querySelector('[data-navigation-cart-content]'),
              min = parseInt(qtyInput.getAttribute('min')),
              max = parseInt(qtyInput.getAttribute('max'));
    
        let counter = min;
        setInterval(() => {
            qtyInput.value = counter;
        }, 100)
        
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

        itemAdd.addEventListener('click', (e) => {
            if(counter >= max) return;
            counter++
        });
    
        itemRemove.addEventListener('click', (e) => {
            if(counter <= min) return;
            counter--
        });
        cartBtn.addEventListener('click', (e) => {
            const renderCart = (data) => {
                const totalItems = document.querySelector('[data-navigation-cart-total-items]');
                totalItems.textContent = `(${data.cart.products.length})`;
                console.log(content)
            }
            cartBtn.setAttribute("disabled", "")
            cartBtn.classList.add("waiting")
            cartBtn.innerHTML = `
                <span class="loading-block"></span>
                <span class="loading-block"></span>
                <span class="loading-block"></span>
            `
            axios.post('/cart/add', {
                product: product,
                quantity: counter
            }).then((res) => {
                cartBtn.removeAttribute("disabled")
                cartBtn.classList.remove("waiting")
                cartBtn.innerHTML = ``
                cartBtn.textContent = `В корзину`
                counter = min;
                initModal('success', 'Товар додано в корзину')
                renderCart(res.data)
            }).catch((err) => {
                cartBtn.removeAttribute("disabled")
                cartBtn.classList.remove("waiting")
                cartBtn.innerHTML = ``
                cartBtn.textContent = `В корзину`
                throw new Error(err)
            });
        })
    })();
})