
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
    },
    methods: {
      async fetchCart(){
        await axios.get("/api/cart/all").then((req) => {
          if(req.data.cart){
            this.cart = req?.data?.cart;
            this.cartLen = this?.cart?.products?.length
          }
        })
      },
      async addToCart(e){
        const product = e.target.getAttribute('data-product-id'),
              quantity = this.singleProductQuantity;

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
      filterPrice(e){
        if ('URLSearchParams' in window) {
          var searchParams = new URLSearchParams(window.location.search);
          const min = e.target.elements[0].value,
                max = e.target.elements[1].value;
          if(min) searchParams.set('min', min);
          if(max) searchParams.set('max', max);
          
          window.location.search = searchParams.toString();
          
      }
      }
    },
  }).mount('#app')