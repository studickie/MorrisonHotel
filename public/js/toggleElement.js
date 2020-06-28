//~ --------------------------------------------------------------
//*     Toggle Element Component
//~ --------------------------------------------------------------
//~     Parameters:
//~     1. $element: HTMLElement; toggle element container
//~     2. $state: Boolean [optional]; initial toggle state
//~
//~     Use:
//~     > component toggles CSS class 'toggle--active' on provided 
//~         element
//~     !! markup must include an element with a name attribute of
//~         'toggle_activator' which triggers the toggle effect
//~ --------------------------------------------------------------

function ToggleElement($element, $state) {
    var ctrl = this;

    ctrl._el = $element;
    ctrl._active = (ctrl.active = $state || false);

    addToggleElementEvents.call(ctrl);
}

ToggleElement.prototype = {
    get active() {
        return this._active;
    },
    set active(newState) {
        this._active = newState || false;

        this._el.classList.toggle('toggle--active', this._active);
    }
}

function addToggleElementEvents() {
    var ctrl = this;

    if (ctrl._el.children.toggle_activator) {
        ctrl._el.children.toggle_activator.addEventListener('click', function () {
            ctrl.active = !ctrl.active;
        });
    } else {
        console.error('Error -ToggleElement. No \'toggle activator\' element found');
    }
}