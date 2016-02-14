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

/** Opens a url with the query as the search term in the new tab*/
function open_url(query){
    var luckyUrl = getLucky(query, mdnUrl);
    chrome.tabs.create({ url: luckyUrl });
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
        open_url(query);
    }
});

/** Add basic omnibox functionality */
chrome.omnibox.setDefaultSuggestion({
    description: 'Press ENTER to jump to the top MDN page for: %s'
});
chrome.omnibox.onInputEntered.addListener(function (query) {
    open_url(query);
});

/** Open the url with the selected text as query search term
    when the browser action icon is clicked  */
chrome.browserAction.onClicked.addListener(function(tab){
    console.log("Browser Action Clicked")
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
        }, function(selection) {
            open_url(selection[0]);
        });
});