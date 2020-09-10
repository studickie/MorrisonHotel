var mainJs = {};

mainJs.initNavMenuToggle = function () {
    var menu = document.querySelector('[data-role=dropdown]');
    
    if (menu) new ToggleElement(menu);
}

mainJs.initSignoutButton = function () {
    var button = document.querySelector('button[name=btn_signout]');

    if (button) {
        button.addEventListener('click', function () {
            const xhr = new XMLHttpRequest();
            //xhr.open('POST', 'http://localhost:3000/auth/signout');
            xhr.open('POST', 'https://morrisonhotel.tech/auth/signout');

            xhr.onload = function () {
                window.location.reload();
            }

            xhr.send();
        });
    }
}

mainJs.init = function () {
    mainJs.initNavMenuToggle();
    mainJs.initSignoutButton();
}

window.addEventListener('load', mainJs.init);