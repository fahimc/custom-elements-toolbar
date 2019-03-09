var SearchActionKeys;
(function (SearchActionKeys) {
    SearchActionKeys["SEARCH_UPDATE"] = "SEARCH_UPDATE";
})(SearchActionKeys || (SearchActionKeys = {}));
const searchUpdateAction = (value) => {
    return { type: SearchActionKeys.SEARCH_UPDATE, value };
};
//# sourceMappingURL=search-action.js.map