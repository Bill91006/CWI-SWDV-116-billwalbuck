// One shared menu controller for every page.
const menuButton = document.querySelector('.nav-toggle');
const menuLinks = document.querySelector('.nav-links');
const mobileScreen = window.matchMedia('(max-width: 600px)');

function setMenuOpen(open) {
    menuLinks.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
}

menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

// Escape closes the menu and returns keyboard focus to its button.
menuLinks.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileScreen.matches) {
        setMenuOpen(false);
        menuButton.focus();
    }
});

// Reset when crossing the breakpoint so the next mobile view starts closed.
mobileScreen.addEventListener('change', () => setMenuOpen(false));
