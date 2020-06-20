function ToggleElement ($element, $state) {
    var ctrl = this;
    
    //~ Expects:
    //~     $element: HTMLElement; container element of dropdown
    //~     $state: Boolean [optional]; initial state of dropdown
    //~ -----------------------------------------------------------
    ctrl._el = $element;
    ctrl._active = false;

    ctrl.active = $state || false;
    
    //~ Requires child with name attribute 'toggle_activator'
    //~ -----------------------------------------------------------
    ctrl._el.children.toggle_activator.addEventListener('click', function() { 
        ctrl.active = !ctrl.active; 
    });
};

ToggleElement.prototype = {
    get active() {
        return this._active;
    },
    set active(newState) {
        this._active = newState || false;

        this._el.classList.toggle('toggle--active', this._active);
    }
};