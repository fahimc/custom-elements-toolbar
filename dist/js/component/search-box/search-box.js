class SearchBox extends HTMLElement {
    constructor() {
        super();
        this.value = '';
        this.element = document.createElement('input');
        this.styleElement = document.createElement('style');
        this.element.addEventListener('keyup', this.onInputChange.bind(this));
    }
    static get observedAttributes() {
        return ['value', 'placeholder'];
    }
    onInputChange(event) {
        const customEvent = new CustomEvent(SearchBox.EVENT_ON_CHANGE, {
            detail: {
                value: this.element.value
            }
        });
        this.dispatchEvent(customEvent);
        this.setValue(this.value);
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                this.setValue(newValue);
                break;
            case 'placeholder':
                this.placeholder = newValue;
                this.element.placeholder = this.placeholder;
                break;
        }
    }
    setValue(value) {
        this.element.value = this.value = value;
    }
}
SearchBox.EVENT_ON_CHANGE = 'EVENT_ON_CHANGE';
customElements.define('search-box', SearchBox);
//# sourceMappingURL=search-box.js.map