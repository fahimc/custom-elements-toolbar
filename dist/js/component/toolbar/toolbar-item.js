class ToolbarItem extends HTMLElement {
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.onMouseOverPanelHandler = this.onMouseOver.bind(this);
        this.onMouseOutPanelHandler = this.onMouseOut.bind(this);
        this.onBodyClickHandler = this.onBodyClick.bind(this);
        this.onItemClickedHandler = this.onItemClicked.bind(this);
        this.isMouseOverMenu = false;
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);
        this.setListener();
        this.setStyle();
        this.render();
        this.createMenu();
    }
    render() {
        this.element.innerHTML = this.getTemplate();
    }
    createMenu() {
        this.menu = document.querySelector(`#${ToolbarItem.MENU_ID}`);
        if (!this.menu) {
            this.menu = document.createElement('div');
            this.menu.id = ToolbarItem.MENU_ID;
            document.body.appendChild(this.menu);
            this.menu.addEventListener('mouseover', this.onMouseOverPanelHandler);
            this.menu.addEventListener('mouseout', this.onMouseOutPanelHandler);
        }
    }
    onClick(event) {
        if (this.hasAttribute('disabled'))
            return;
        const template = this.querySelector('template');
        if (template) {
            this.openMenu();
            event.stopPropagation();
        }
        else {
            const id = this.getAttribute(ToolbarItem.MENU_ITEM_ID_ATTRIBUTE);
            this.dispatch(id);
        }
    }
    openMenu() {
        const rect = this.getBoundingClientRect();
        this.menu.classList.add('show');
        this.menu.innerHTML = this.getMenuTemplate();
        this.menu.style.top = `${rect.y + rect.height}px`;
        this.menu.style.left = `${rect.x}px`;
        document.body.addEventListener('click', this.onBodyClickHandler);
        const listItems = this.menu.querySelectorAll('li');
        if (listItems)
            listItems.forEach(item => item.addEventListener('click', this.onItemClickedHandler));
    }
    onItemClicked(event) {
        const id = event.currentTarget.getAttribute(ToolbarItem.MENU_ITEM_ID_ATTRIBUTE);
        this.dispatch(id);
        this.hideMenu();
    }
    dispatch(id) {
        const customEvent = new CustomEvent(ToolbarItem.EVENT_ITEM_CLICKED, {
            detail: {
                id: id,
            }
        });
        this.dispatchEvent(customEvent);
    }
    onMouseOver(event) {
        this.isMouseOverMenu = true;
    }
    onMouseOut(event) {
        this.isMouseOverMenu = false;
    }
    onBodyClick(event) {
        if (this.menu && !this.isMouseOverMenu) {
            this.hideMenu();
        }
    }
    hideMenu() {
        document.body.removeEventListener('click', this.onBodyClickHandler);
        const listItems = this.menu.querySelectorAll('li');
        if (listItems)
            listItems.forEach(item => item.removeEventListener('click', this.onItemClickedHandler));
        this.menu.classList.remove('show');
    }
    setListener() {
        this.addEventListener('click', this.onClick.bind(this));
    }
    setStyle() {
        this.styleElement.innerHTML = this.getStyle();
    }
    getStyle() {
        return `
        :host{
            display: inline-block;
            padding:2px;
            box-sizing: border-box;
        }
        :host(:hover){
            background-color: #ccc;
            cursor:pointer;
        }
        :host([disabled]){
            background-color: #ddd;
            cursor:initial;
        }
        ::slotted(i){
            font-size: 1.5rem;
            margin-left: auto;
            display: inline-block;
            color:#999;
        }
        :host([disabled]) ::slotted(i){
            color:#ccc;
        }
        .content{
            display:none;
        }
        `;
    }
    getMenuStyle() {
        return `
        #${ToolbarItem.MENU_ID} {
            font-family: Helvetica Neue,Helvetica,Arial,sans-serif; 
            display:none;
            position:absolute;
            min-width:150px;
            min-height:100px;
            background-color:white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            padding:5px;
        }
        #${ToolbarItem.MENU_ID} ul {
            width:100%;
            list-style: none;
            padding: 0;
            margin: 0;
        }
        #${ToolbarItem.MENU_ID} ul li{
            font-size: 0.8rem;
            border-bottom: 1px solid #ccc;
            padding: 2px 4px;
            cursor:pointer;
        }
        #${ToolbarItem.MENU_ID} ul li:hover {
            background-color: #e4e4e4;
        }
        #${ToolbarItem.MENU_ID}.show {
            display:block;
        }
        `;
    }
    getTemplate() {
        return `
        <slot name="icon"></slot>`;
    }
    getMenuTemplate() {
        const template = this.querySelector('template');
        return `
        <style>${this.getMenuStyle()}</style>
        <div>
            ${template ? template.innerHTML : ''}
        </div>
        `;
    }
}
ToolbarItem.MENU_ID = 'toolbar-menu';
ToolbarItem.MENU_ITEM_ID_ATTRIBUTE = 'data-menu-item-id';
ToolbarItem.EVENT_ITEM_CLICKED = 'EVENT_ITEM_CLICKED';
customElements.define('toolbar-item', ToolbarItem);
//# sourceMappingURL=toolbar-item.js.map