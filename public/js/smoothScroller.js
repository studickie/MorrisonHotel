//~ --------------------------------------------------------------
//*     Smooth Scroller Component
//~ --------------------------------------------------------------
//~     Parameters:
//~     1. $element: HTMLElement; toggle element container
//~
//~     Use:
//~     > requires scroll children have attribute data-role as 
//~         'scroll_item'
//~ --------------------------------------------------------------

function SmoothScroller ($element) {
    var ctrl = this;
    
    ctrl._el = $element;
    ctrl._scrolling = false;
    ctrl._scrollList = $element.querySelectorAll('[data-role=scroll_item]');
    ctrl._scrollIndex = 0;
    ctrl._scrollWidth = $element.getBoundingClientRect().width;
    ctrl._scrollStart = 0;
    ctrl._scrollChange = 0;
    ctrl._timeout = null;

    addSmoothScrollerEvents.call(ctrl);
}

SmoothScroller.prototype = {
    throttledUpdateScroll: function(changeValue) {
        var ctrl = this;

        if (!ctrl._scrolling) {
            ctrl._scrolling = true;
            ctrl._scrollChange = changeValue - ctrl._scrollStart;
            setTimeout(function() { ctrl._scrolling = false; }, 17);
        }

        return;
    },
    getScrollDirection: function() {
        if (this._scrollChange < 0 && this._scrollIndex < this._scrollList.length) {
            this._scrollIndex++;
        }
        else if (this._scrollChange > 0 && this._scrollIndex > 0) {
            this._scrollIndex--;
        }

        this.scrollToElement(this._scrollList[this._scrollIndex]);
        
        return;
    },
    scrollToElement: function(el) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    }
}

function addSmoothScrollerEvents() {
    var ctrl = this;

    ctrl._el.addEventListener('touchstart', function(evt) {
        evt.preventDefault();
        var eventDrag;

        ctrl._scrollStart = evt.touches[0].clientX;

        ctrl._el.addEventListener('touchmove', function eventDrag(evt) {
            evt.preventDefault();

            ctrl.throttledUpdateScroll(evt.touches[0].clientX);
        });

        ctrl._el.addEventListener('touchend', function eventEnd(evt) {
            evt.preventDefault();

            ctrl.getScrollDirection();

            //- Reset
            ctrl._scrollChange = 0;
            ctrl._scrollStart = 0;
            ctrl._el.removeEventListener('touchmove', eventDrag);
            ctrl._el.removeEventListener('touchend', eventEnd);
        });
    });
}