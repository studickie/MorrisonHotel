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
            xhr.open('POST', 'http://localhost:3000/auth/signout');

            xhr.onload = function () {
                window.location.reload();
            }

            xhr.send();
        });
    }
}

mainJs.initModalOpenButton = function () {
    var button = document.querySelector('a#anc_modal_open');

    if (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            var key = this.getAttribute('data-src');
            var iframe = document.querySelector('iframe#modal_video_iframe');

            if (iframe) {
                iframe.setAttribute('src', 'https://www.youtube.com/embed/' + key);
            }

            document.querySelector('#modal_video').classList.remove('modal--hidden');
        });
    }
}

mainJs.initModalCloseButton = function () {
    var button = document.querySelector('button[name=btn_modal_close]');
    
    if (button) {
        button.addEventListener('click', function () {
            var modalContainer = document.querySelector('#modal_video');

            if (modalContainer) {
                //document.querySelector('main').removeChild(modalContainer);
                modalContainer.classList.add('modal--hidden');
            }
        });
    }
}

mainJs.init = function () {
    mainJs.initNavMenuToggle();
    mainJs.initSignoutButton();
    mainJs.initModalOpenButton();
    mainJs.initModalCloseButton();
}

window.addEventListener('load', mainJs.init);