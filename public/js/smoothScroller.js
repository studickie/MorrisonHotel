//~ --------------------------------------------------------------
//*     Smooth Scroller Component
//~ --------------------------------------------------------------
//~     Parameters:
//~     1. $element: HTMLElement; toggle element container element
//~
//~     Use:
//~     > modifies element CSS to create a smooth-scroll effect
//~         on touch events for mobile devices
//~     > requires a list parent with attribute data-role as
//~         'scroll_list'
//~     > requires scroll children with attribute data-role as 
//~         'scroll_item'
//~ --------------------------------------------------------------

function SmoothScroller ($element) {
    var ctrl = this;

    //~     Public Properties
    //~ ---------------------------
    this._el = $element;
    //~     Private Properties
    //~ ---------------------------
    ctrl._scrolling = false;
    ctrl._scrollList = $element.querySelector('[data-role=scroll_list]');
    ctrl._scrollCount = $element.querySelectorAll('[data-role=scroll_item]').length;
    ctrl._scrollIndex = 0;
    ctrl._scrollWidth = $element.getBoundingClientRect().width;
    ctrl._scrollStart = 0;
    ctrl._scrollChange = 0;
    ctrl._eventDrag = null;
    ctrl._eventEnd = null;
    
    addSmoothScrollerEvents.call(ctrl);
}

SmoothScroller.prototype = {
    updateScrollChange: function(changeValue) {
        var ctrl = this;

        if (!ctrl._scrolling) {
            ctrl._scrolling = true;

            setTimeout(function() { ctrl._scrolling = false; }, 500);

            ctrl._scrollChange = changeValue - ctrl._scrollStart;
        }
    },
    updateScrollIndex: function() {
        if (this._scrollChange < 0 && this._scrollIndex < this._scrollCount - 1) {
            this._scrollIndex++;
        }
        else if (this._scrollChange > 0 && this._scrollIndex > 0) {
            this._scrollIndex--;
        }
    },
    updateScrollList: function() {
        this._scrollList.style.transform = 'translate(' 
            + (this._scrollWidth * (this._scrollIndex * -1)) + 'px)';
    },
    resetEvents: function() {
        this._scrollChange = 0;
        this._scrollStart = 0;
        this._el.removeEventListener('touchmove', this._eventDrag);
        this._el.removeEventListener('touchend', this._eventEnd);
    }
};

function addSmoothScrollerEvents() {
    var ctrl = this;

    ctrl._el.addEventListener('touchstart', function(evt) {
        ctrl._scrollStart = evt.touches[0].clientX;

        ctrl._el.addEventListener('touchmove', ctrl._eventDrag = function (evt) {
            evt.preventDefault();
            ctrl.updateScrollChange(evt.touches[0].clientX);
        });

        ctrl._el.addEventListener('touchend', ctrl._eventEnd = function () {
            ctrl.updateScrollIndex();
            ctrl.updateScrollList();
            ctrl.resetEvents();
        });
    });
}