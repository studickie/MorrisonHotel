//~ --------------------------------------------------------------
//*     Smooth Scroller Component
//~     -------------------------
//~     Parameters:
//~     1. element: HTMLElement; scroller containing element
//~     2. transitionTime: number; scroller transition time
//~     3. autoInterval: boolean [optional]; add auto scroll interval
//~     3. intervalTime: number [optional]; time between auto-scrolls
//~
//~     Use:
//~     > modifies element CSS to create a smooth-scroll effects
//~     > requires a list with attribute 'data-role' as
//~         'scroll_list', children with attribute 'data-role' as 
//~         'scroll_item'
//~ --------------------------------------------------------------

function SmoothScroller(element, transitionTime, autoInterval, intervalTime) {
    var ctrl = this;

    ctrl.element = element;
    ctrl.autoInterval = autoInterval || false;
    ctrl.intervalTime = intervalTime || 0;
    ctrl.interval = null;
    ctrl.intervalActive = false;
    ctrl.transitionTime = transitionTime;
    ctrl.transition = null;
    ctrl.transitionActive = false;
    ctrl.transitionDirection = 0; //- can be -1 (reverse), 0 (no movement) or 1 (forward)
    ctrl.scrollList = null;
    ctrl.scrollCount = 0;
    ctrl.scrollIndex = 0;
    ctrl.indexOffset = 0;
    ctrl.scrollWidth = 0;
    ctrl.activeScrolling = false;
    ctrl.positionStart = 0;
    ctrl.positionChange = 0;
    ctrl.touchMove = null;
    ctrl.touchEnd = null;

    var check = this.init();
    if (!check) {
        console.error('Smooth Scroller Init Error');
        return;
    }
}

SmoothScroller.prototype = {
    //~ Init Methodss
    //~ --------------
    init: function () {
        if (window.innerWidth < 990) {
            if (!this.addTouchEvents()) return false;
        } else {
            if (!this.addClickEvents()) return false;
        }
        if (!this.setScrollList()) return false;
        if (!this.setTransitionTime()) return false;

        if (this.autoInterval) this.startInterval();

        return true
    },
    setScrollList: function () {
        const scrollList = this.element.querySelector('[data-role=scroll_list]');
        if (scrollList) {
            this.scrollList = scrollList;
            this.scrollCount = scrollList.children.length;
            this.scrollWidth = scrollList.getBoundingClientRect().width;

            return true;
        }
        return false;
    },
    setTransitionTime: function () {
        if (this.transitionTime != undefined) {
            this.scrollList.style.transitionDuration = `${this.transitionTime}ms`;

            return true;
        }
        return false;
    },
    addTouchEvents: function () {
        var ctrl = this;

        if (ctrl.element) {
            ctrl.element.addEventListener('touchstart', function (evt) {
                ctrl.positionStart = evt.touches[0].clientX;

                if (ctrl.transitionActive) ctrl.stopTransition();
                if (ctrl.intervalActive) ctrl.stopInterval();

                ctrl.element.addEventListener('touchmove', ctrl.touchMove = function (evt) {
                    evt.preventDefault();
                    ctrl.setPositionChangeFromTouch(evt.touches[0].clientX);
                });

                ctrl.element.addEventListener('touchend', ctrl.touchEnd = function () {
                    ctrl.setScrollIndex();
                    ctrl.startTransition();
                    ctrl.resetEvents();
                });
            });

            return true;
        }
        return false;
    },
    addClickEvents: function () {
        var ctrl = this;

        if (ctrl.element) {
            var buttonLeft = ctrl.element.querySelector('button[data-role=scroller_button_left]');
            if (buttonLeft) {
                buttonLeft.addEventListener('click', function () {
                    if (ctrl.transitionActive) return;

                    ctrl.setScrollIndex(1);
                    ctrl.startTransition();
                });
            } else {
                return false;
            }

            var buttonRight = ctrl.element.querySelector('button[data-role=scroller_button_right]');
            if (buttonRight) {
                buttonRight.addEventListener('click', function () {
                    if (ctrl.transitionActive) return;

                    ctrl.setScrollIndex(-1);
                    ctrl.startTransition();
                });
            } else {
                return false;
            }

            return true;
        }
        return false;
    },
    //~ Timing Methods
    //~ ----------------
    startTransition: function () {
        var ctrl = this;

        if (ctrl.transitionActive) ctrl.stopTransition();

        if (ctrl.scrollIndex != ctrl.scrollCount) {
            ctrl.transition = setTimeout(function () {
                ctrl.transitionActive = false;
                ctrl.transitionDirection = 0;
                //ctrl.scrollList.classList.toggle('scroller--active', false);
                if (ctrl.autoInterval) ctrl.startInterval();
            }, ctrl.transitionTime);

            //~ Updates CSS, sets appropriate object state flags
            ctrl.transitionActive = true;
            //ctrl.scrollList.classList.toggle('scroller--active', true);
            ctrl.scrollList.style.transform = 'translate('
                + (ctrl.scrollWidth * (ctrl.scrollIndex * -1)) + 'px)';
        }
    },
    stopTransition: function () {
        this.indexOffset = this.transitionDirection;
        this.transitionActive = false;
        this.transitionDirection = 0;
        //this.scrollList.classList.toggle('scroller--active', false);
        clearInterval(this.transition);
        this.scrollList.style.transform = getComputedStyle(this.scrollList).transform;
    },
    startInterval: function () {
        var ctrl = this;

        if (ctrl.intervalActive) ctrl.stopInterval();
        if (ctrl.scrollIndex != ctrl.scrollCount) {
            ctrl.interval = setTimeout(function () {
                ctrl.intervalActive = false;
                ctrl.setScrollIndex(-1);
                ctrl.startTransition();
            }, ctrl.intervalTime);

            ctrl.intervalActive = true;
        }
    },
    stopInterval: function () {
        this.intervalActive = false;
        clearInterval(this.interval);
    },
    //~ Utility Methods
    //~ -----------------
    setPositionChangeFromTouch: function (changeValue) {
        var ctrl = this;

        if (!ctrl.activeScrolling) {
            ctrl.activeSscrolling = true;

            setTimeout(function () { ctrl.activeSscrolling = false; }, 500);

            ctrl.positionChange = changeValue - ctrl.positionStart;
        }
    },
    setScrollIndex: function (forceChange) {
        //- process used to increment, decrement scrollIndex
        var change = forceChange || this.positionChange;

        if (change < 0 && this.scrollIndex < this.scrollCount - 1) {
            this.scrollIndex += (1 - this.indexOffset)
            this.transitionDirection = 1;

        } else if (change > 0 && this.scrollIndex > 0) {
            this.scrollIndex -= (1 + this.indexOffset);
            this.transitionDirection = -1;

        } else {
            //- scrollIndex stays at current value
        }
    },
    resetEvents: function () {
        //- process to run at the end of all touch events
        this.positionChange = 0;
        this.positionStart = 0;
        this.indexOffset = 0;
        this.element.removeEventListener('touchmove', this.touchMove);
        this.element.removeEventListener('touchend', this.touchEnd);
    }
};