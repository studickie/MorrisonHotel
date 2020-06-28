function moviesInit () {
    var smoothScroller = document.querySelector('.highlights')
    if (smoothScroller) new SmoothScroller(smoothScroller);
}

window.addEventListener('load', moviesInit);