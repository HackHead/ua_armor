
// ===============================================
// TABS
// ===============================================


const toggleTabs = (e) => {
    e.preventDefault();
    const bodies = document.querySelectorAll('.tab-body'),
          heads = document.querySelectorAll('ul.tabs li');
    bodies.forEach((body) => {
        body.style.display = 'none';
    });
    heads.forEach((head) => {
        head.classList.remove('active');
    });
    e.currentTarget.classList.add('active')
    const activeBody = document.querySelector(`#${e.currentTarget.getAttribute('aria-controls')}`);
    activeBody.style.display = 'block';
    
}