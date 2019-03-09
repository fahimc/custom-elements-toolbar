;
const initialSearchState = {
    value: ''
};
const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case SearchActionKeys.SEARCH_UPDATE:
            return Object.assign({}, state, { value: action.value });
        default:
            return state;
    }
};
//# sourceMappingURL=search-reducer.js.map