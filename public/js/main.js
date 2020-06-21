function initToggleElements() {
    var el = document.querySelector('[data-role=dropdown]');

    if (el) new ToggleElement(el);
};

function init() {
    initToggleElements();
};

window.addEventListener('load', init);