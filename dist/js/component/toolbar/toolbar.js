class Toolbar extends HTMLElement {
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.setStyle();
        this.render();
    }
    render() {
        this.element.innerHTML = this.getTemplate();
    }
    setStyle() {
        this.styleElement.innerHTML = this.getStyle();
    }
    getStyle() {
        return `
        :host{
            display: block;
            width:100%;
            padding: 5px 10px;
            background-color: #e4e4e4;
            box-sizing: border-box;
            border-bottom: 1px solid #999;
        }
       ::slotted(toolbar-item){
            vertical-align: middle;
        }
        `;
    }
    getTemplate() {
        return `<slot/>`;
    }
}
customElements.define('toolbar-component', Toolbar);
//# sourceMappingURL=toolbar.js.map