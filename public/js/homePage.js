var moviesPage = {};

moviesPage.init = function () {
    var smoothScroller = document.querySelector('[data-role=smooth_scroller]');
    // if (smoothScroller) new SmoothScroller(smoothScroller, 560, false, 5000);
    if (smoothScroller) new SmoothScroller(smoothScroller, 5000);
}

window.addEventListener('load', moviesPage.init);