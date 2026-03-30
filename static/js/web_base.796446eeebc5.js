let navItem = document.querySelectorAll('.top-nav');
let active = document.querySelector('.nav-item .nav-link.active');

document.querySelectorAll('.dropdown-btn').forEach(element => {
    element.addEventListener('click', (event) => {
        let menu = element.parentElement?.nextElementSibling;
        if (!menu) {
            return;
        }

        let expanded = menu.classList.toggle('show');
        element.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
});

navItem.forEach(element => {
    if (window.innerWidth >= 992) {
        element.addEventListener('mouseover', (event) => {
            element.querySelector('.dropdown-menu')?.classList.add('show');
            element.querySelector('.nav-link').classList.add('hover');
            active?.classList.remove('active');
        });
    
        element.addEventListener('mouseout', (event) => {
            element.querySelector('.dropdown-menu')?.classList.remove('show');
            element.querySelector('.nav-link').classList.remove('hover');
            active?.classList.add('active');
        });
    }
});

const logoImg = document.querySelector('#logo');
const navbar = document.querySelector('.navbar');

if (logoImg && navbar) {
    let lastCompactState = null;
    let ticking = false;

    const applyNavCompactState = () => {
        const shouldCompact = window.scrollY > 30;
        if (shouldCompact !== lastCompactState) {
            logoImg.classList.toggle('scale-img', shouldCompact);
            navbar.classList.toggle('scale-nav', shouldCompact);
            lastCompactState = shouldCompact;
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(applyNavCompactState);
            ticking = true;
        }
    }, { passive: true });

    applyNavCompactState();
}
