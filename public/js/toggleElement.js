function ToggleElement(element, state) {
    this._element = element;
    this._button = element.children.btn_toggle;
    this._active = state || false;

    this._button.addEventListener('click', this.handleToggle.bind(this));
}

ToggleElement.prototype = {
    toggleActive: function () {
        this._active = !this._active;
    },
    toggleStyle: function () {
        this._element.classList.toggle('toggle--active', this._active);
    },
    toggleAriaLabels: function () {
        this._button.setAttribute('aria-expanded', this._active);
    },
    handleToggle: function () {
        this.toggleActive();
        this.toggleAriaLabels();
        this.toggleStyle();
    }
};