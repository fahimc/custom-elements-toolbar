class TextViewer extends HTMLElement {
    static get observedAttributes() {
        return ['highlight'];
    }
    constructor() {
        super();
        this.highlight = '';
        this.styleElement = document.createElement('style');
        this.styleElement.id = 'text-viewer-style';
    }
    connectedCallback() {
        if (!document.querySelector('text-viewer-style'))
            document.body.appendChild(this.styleElement);
        this.styleElement.innerHTML = this.getStyle();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'highlight':
                this.highlight = newValue;
                this.setHighlight();
                break;
        }
    }
    getStyle() {
        return `
        .text-highlight {
            background-color:yellow;
        }
        text-viewer{
            padding:10px;
            font-family: Helvetica Neue,Helvetica,Arial,sans-serif; 
            display:block;
            font-size:0.85rem;
        }
        `;
    }
    setHighlight() {
        let content = this.innerHTML;
        content = content.replace(new RegExp(`<span class="text-highlight">(.*?)<\/span>`, 'gim'), '$1');
        if (this.highlight)
            content = content.replace(new RegExp(`(?!<)(${this.highlight})(?!>)`, 'gim'), '<span class="text-highlight">$1</span>');
        this.innerHTML = content;
    }
}
customElements.define('text-viewer', TextViewer);
//# sourceMappingURL=text-viewer.js.map