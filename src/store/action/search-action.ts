enum SearchActionKeys {
    SEARCH_UPDATE = 'SEARCH_UPDATE'
} 

interface searchUpdate {
    type: SearchActionKeys;
    value: string;
}

const searchUpdateAction = (value:string) : searchUpdate => {
    return { type: SearchActionKeys.SEARCH_UPDATE, value }
}