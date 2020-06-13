function setDropdownEvents() {
    var el = document.querySelector('[data-role=dropdown]');

    if (el) new ToggleElement(el);
};


function init() {
    setDropdownEvents();
};

window.addEventListener('load', init);