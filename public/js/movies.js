var moviesPage = {};

moviesPage.init = function () {
    var smoothScroller = document.querySelector('[data-role=smooth_scroller]');
    if (smoothScroller) new SmoothScroller(smoothScroller);
}

window.addEventListener('load', moviesPage.init);