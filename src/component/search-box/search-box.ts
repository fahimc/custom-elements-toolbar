class SearchBox extends HTMLElement {
    public static get observedAttributes(): string[] {
        return ['value', 'placeholder'];
    }
    public static EVENT_ON_CHANGE: string = 'EVENT_ON_CHANGE';
    private element:HTMLInputElement;
    private styleElement:HTMLStyleElement;
    public value:string;
    public placeholder:string;
    constructor(){
        super();
        this.value = '';
        this.element = document.createElement('input');
        this.styleElement = document.createElement('style');
        this.element.addEventListener('keyup',this.onInputChange.bind(this));
    }
    onInputChange(event: KeyboardEvent){
        const customEvent: CustomEvent = new CustomEvent(SearchBox.EVENT_ON_CHANGE, {
            detail: {
                value: this.element.value
            }
        });
        this.dispatchEvent(customEvent);
        this.setValue(this.value);
    }
    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name){
            case 'value':
            this.setValue(newValue);
            break;
            case 'placeholder': 
                this.placeholder = newValue;
                this.element.placeholder = this.placeholder;
            break;
        }
    }
    setValue(value : string){
            this.element.value = this.value = value;
    }
}
customElements.define('search-box', SearchBox);