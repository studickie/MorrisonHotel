//~ --------------------------------------------------------------
//*     Smooth Scroller Component
//~     -------------------------
//~     Parameters:
//~     1. $element: HTMLElement; toggle element container element
//~
//~     Use:
//~     > modifies element CSS to create a smooth-scroll effects
//~     > requires a list parent with attribute data-role as
//~         'scroll_list'
//~     > requires scroll children with attribute data-role as 
//~         'scroll_item'
//~ --------------------------------------------------------------

function SmoothScroller($element, $transitionTime) {
    var ctrl = this;
    
    this._el = $element;
    this._transitionTime = $transitionTime;
    ctrl._scrolling = false;
    ctrl._scrollList = this.setScrollList();
    ctrl._scrollCount = this._scrollList.children.length;
    ctrl._scrollIndex = 0;
    ctrl._indexOffset = 0;
    ctrl._scrollWidth = this._el.getBoundingClientRect().width;
    ctrl._scrollStart = 0;
    ctrl._scrollChange = 0;
    ctrl._eventDrag = null;
    ctrl._eventEnd = null;
    ctrl._scrollInterval = null;
    ctrl._inTransition = false;

    addSmoothScrollerEvents.call(this);
    this.startScrollInterval();
    this.setElementTransitionTime();
}

SmoothScroller.prototype = {
    setScrollList: function() {
        const scrollList = this._el.querySelector('[data-role=scroll_list]');
        if (!scrollList) return null; //! better error handling
        return scrollList;
    },
    setElementTransitionTime: function() {
        this._scrollList.style.transitionDuration = `${this._transitionTime}ms`
    },
    updateChangeFromTouch: function (changeValue) {
        var ctrl = this;

        if (!ctrl._scrolling) {
            ctrl._scrolling = true;

            setTimeout(function () { ctrl._scrolling = false; }, 500);

            ctrl._scrollChange = changeValue - ctrl._scrollStart;
        }
    },
    updateIndexFromTouch: function () {
        if (this._scrollChange < 0 && this._scrollIndex < this._scrollCount - 1) {
            this._scrollIndex += (1 + this._indexOffset);

        } else if (this._scrollChange > 0 && this._scrollIndex > 0) {
            this._scrollIndex--;

        } else {
            //* scrollIndex stays at current value
        }
        
        this._indexOffset = 0;
    },
    transitionToNext: function () {
        this._scrollList.style.transform = 'translate('
            + (this._scrollWidth * (this._scrollIndex * -1)) + 'px)';
    },
    stopTransition: function () {
        this._scrollList.style.transform = getComputedStyle(this._scrollList).transform;
        if (this._inTransition) this._indexOffset = -1;
    },
    resetEvents: function () {
        this._scrollChange = 0;
        this._scrollStart = 0;
        this._el.removeEventListener('touchmove', this._eventDrag);
        this._el.removeEventListener('touchend', this._eventEnd);
    },
    startScrollInterval: function () {
        var ctrl = this;
        ctrl._scrollInterval = setInterval(function () {
            if (ctrl._scrollIndex < ctrl._scrollCount - 1) {
                ctrl._scrollIndex++;
                ctrl.setTransitionClass();
                ctrl.transitionToNext();
            } else {
                clearInterval(ctrl._scrollInterval);
            }
        }, 5000);
    },
    stopScrollInterval: function() {
        clearInterval(this._scrollInterval);
    },
    setTransitionClass: function() {
        var ctrl = this;

        setTimeout(function() { //! better state tracking
            ctrl._inTransition = false;
            ctrl._scrollList.classList.toggle('scroll--transition', ctrl._inTransition);
        }, ctrl._transitionTime);

        this._inTransition = true;
        this._scrollList.classList.toggle('scroll--transition', this._inTransition);
    }
};

function addSmoothScrollerEvents() {
    var ctrl = this;

    ctrl._el.addEventListener('touchstart', function (evt) {
        ctrl._scrollStart = evt.touches[0].clientX;
        ctrl.stopScrollInterval();
        ctrl.stopTransition();

        ctrl._el.addEventListener('touchmove', ctrl._eventDrag = function (evt) {
            evt.preventDefault();
            ctrl.updateChangeFromTouch(evt.touches[0].clientX);
        });

        ctrl._el.addEventListener('touchend', ctrl._eventEnd = function () {
            ctrl.updateIndexFromTouch();
            ctrl.setTransitionClass();
            ctrl.transitionToNext();
            ctrl.resetEvents();
            ctrl.startScrollInterval();
        });
    });
}