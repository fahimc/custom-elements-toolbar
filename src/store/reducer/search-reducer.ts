interface InitialSearchState {
    value: string;
};

const initialSearchState: InitialSearchState = 
    {
        value: ''
    }

const searchReducer = (state: InitialSearchState = initialSearchState, action: searchUpdate) => {
    switch (action.type) {
        case SearchActionKeys.SEARCH_UPDATE:
            return {
                ...state,
                value: action.value,
            }
        default:
            return state
    }
}