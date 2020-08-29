//~ --------------------------------------------------------------
//*     Toggle Element Component
//~ --------------------------------------------------------------
//~     Parameters:
//~     1. element: HTMLElement; toggle element container
//~     2. state: Boolean [optional]; initial toggle state
//~ --------------------------------------------------------------

function ToggleElement(element, state) {
    this._element = element;
    this._active = (this.active = state || false);

    addToggleElementEvents.call(this);
}

ToggleElement.prototype = {
    get active() {
        return this._active;
    },
    set active(newState) {
        this._active = newState || false;

        this._element.classList.toggle('toggle--active', this._active);
    }
}

function addToggleElementEvents() {
    var ctrl = this;
    
    if (this._element.children.btn_toggle) {
        this._element.children.btn_toggle.addEventListener('click', function () {
            ctrl.active = !ctrl.active;
        });
    }
}