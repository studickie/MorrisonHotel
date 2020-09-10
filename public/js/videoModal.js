var videoModal = {};

videoModal.initModalOpenButton = function () {
    var button = document.querySelector('a#anc_modal_open');

    if (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            var key = this.getAttribute('data-src');

            document.querySelector('#modal_video').classList.remove('modal--hidden');

            var iframe = document.createElement('iframe');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/' + key);
            document.querySelector('#video_modal_iframe').appendChild(iframe);
        });
    }
}

videoModal.initModalCloseButton = function () {
    var button = document.querySelector('button[name=btn_modal_close]');
    
    if (button) {
        button.addEventListener('click', function () {
            document.querySelector('#modal_video').classList.add('modal--hidden');
            
            var iframe = document.querySelector('iframe');
            document.querySelector('#video_modal_iframe').removeChild(iframe);
        });
    }
}

videoModal.init = function () {
    videoModal.initModalOpenButton();
    videoModal.initModalCloseButton();
}

window.addEventListener('load', videoModal.init);