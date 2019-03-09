const rootReducer = Redux.combineReducers({
    search: searchReducer,
})

const store = Redux.createStore(rootReducer);


