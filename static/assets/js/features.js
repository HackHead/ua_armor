(function (){
    let   addFeatureButton = document.querySelector('[data-add-feature]'),
          container = document.querySelector('[data-features-container]'),
          wrap = document.querySelector('.features-wrap'),
          counter = 100;
    
    const addItem = () => {
        

        const template = `
        <div class="form-check mb-2 d-flex" style="justify-content: space-between; padding-left: 0;" data-feature-id="${counter}">
            <input name="featureKeys[]" class="form-control" required placeholder='Ключ' style="max-width: 40%" >
            <input name="featureValues[]" class="form-control" required placeholder='Значение' style="max-width:  40%">
            <button class="btn btn-primary btn-rounded mr-2" type="button" data-remove-feature=${counter}><i class='bx bxs-trash-alt' style="pointer-events: none"></i></button>
        </div>
        `
        counter++;

        container.insertAdjacentHTML('beforeend', template)
    };
    const removeItem = (id) => {
        const item = container.querySelector(`[data-feature-id="${id}"]`)
        item.remove()
    }
    wrap.addEventListener('click', (e) => {
        const counter = container.querySelectorAll('[data-single-feature]').length - 1;
        if(e.target.hasAttribute('data-remove-feature')) {
            e.preventDefault()
            removeItem(e.target.getAttribute('data-remove-feature'))
        } 
        if(e.target.hasAttribute('data-add-feature')){
            e.preventDefault()
            addItem()
        }
    })
})();