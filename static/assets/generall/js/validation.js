const validateForms = () => {
    const forms = document.querySelectorAll('form');
    if(!forms.length) return;
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formInputs = form.querySelectorAll('input');
            if(!formInputs.length) return;
            formInputs.forEach((input) => {
                
                input.value = input.value.trim()
                const inputType = input.getAttribute('data-input-type')
            })

            // form.submit()
        })
    })
}

validateForms();