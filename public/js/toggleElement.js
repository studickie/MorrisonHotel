function ToggleElement(element, state) {
    this._element = element;
    this._active = state || false;

    this.addClickEvents();
}

ToggleElement.prototype = {
    addClickEvents: function () {
        var ctrl = this, button = this._element.children.btn_toggle;
        
        if (button) {
            button.addEventListener('click', function () {
                ctrl._active = !ctrl._active;

                ctrl._element.classList.toggle('toggle--active', ctrl._active);
            });
        }
    }
};