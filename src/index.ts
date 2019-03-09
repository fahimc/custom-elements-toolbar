const App = {
    init(){
        document.addEventListener('DOMContentLoaded', this.onLoaded.bind(this));
    },
    onLoaded(){
        const toolbarItems: NodeList = document.querySelectorAll('toolbar-item');
        const searchbox : SearchBox = document.querySelector('search-box');
        const textViewer : SearchBox = document.querySelector('text-viewer');

        toolbarItems.forEach(toolbarItem => toolbarItem.addEventListener(ToolbarItem.EVENT_ITEM_CLICKED,(event :CustomEvent )=>{
            if (event.detail.id)store.dispatch({
                type: SearchActionKeys.SEARCH_UPDATE,
                value: event.detail.id,
            })
        }));

        store.subscribe(()=>{
            searchbox.setAttribute('value', store.getState().search.value);
            textViewer.setAttribute('highlight', searchbox.value);
        });

        searchbox.addEventListener(SearchBox.EVENT_ON_CHANGE,(event:CustomEvent)=>{
            store.dispatch({
                type: SearchActionKeys.SEARCH_UPDATE,
                value: event.detail.value,
            })
        });

    }
}.init();