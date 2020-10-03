window.addEventListener('load', function () {
    var smoothScroller = document.querySelector('[data-role=smooth_scroller]');
    if (smoothScroller) new SmoothScroller(smoothScroller, 5000);
});