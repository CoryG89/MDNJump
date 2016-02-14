/** Add a search menu, restricted to MDN */
var mdnUrl = 'https://developer.mozilla.org';

/** Google query URL with btnI key which activates I'm Feeling Lucky */
var googleUrl = 'https://google.com/search?btnI&q=';

/** Returns a Google query URL using I'm Feeling Lucky given an unformatted
    query and optional domain string to restict the search to */
function getLucky (query, site) {
    site = site ? ['site:', site, '+'].join('') : '';
    return [googleUrl, site, query].join('');
}

/** Creates a new item in the context menu to open the top search result on a
    given site for the text selection on the page */
chrome.contextMenus.create({
    id: 'mdnjump',
    title: 'MDNJump %s',
    contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "mdnjump") {
        var query = info.selectionText;
        var luckyUrl = getLucky(query, mdnUrl);
        chrome.tabs.create({ url: luckyUrl });
    }
});

/** Add basic omnibox functionality */
chrome.omnibox.setDefaultSuggestion({
    description: 'Press ENTER to jump to the top MDN page for: %s'
});
chrome.omnibox.onInputEntered.addListener(function (query) {
    var luckyUrl = getLucky(query, mdnUrl);
    chrome.tabs.update({ url: luckyUrl });
});
