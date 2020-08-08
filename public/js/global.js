var mainJs = {};
mainJs.menuDropdown = null;

mainJs.initToggleElements = function () {
    var el = document.querySelector('[data-role=dropdown]');

    if (el) mainJs.menuDropdown = new ToggleElement(el);
}

mainJs.init = function () {
    mainJs.initToggleElements();
}

window.addEventListener('load', mainJs.init);