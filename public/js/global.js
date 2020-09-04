var mainJs = {};
mainJs.menuDropdown = null;

mainJs.initToggleElements = function () {
    var el = document.querySelector('[data-role=dropdown]');

    if (el) mainJs.menuDropdown = new ToggleElement(el);
}

mainJs.initSignoutButton = function () {
    var button = document.querySelector('button[name=btn_signout]');

    if (button) {
        button.addEventListener('click', function () {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/auth/signout');

            xhr.onload = function () {
                window.location.reload();
            }

            xhr.send();
        });
    }
}

mainJs.init = function () {
    mainJs.initToggleElements();
    mainJs.initSignoutButton();
}

window.addEventListener('load', mainJs.init);