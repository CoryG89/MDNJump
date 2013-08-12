
/** Opens up a new tab with a given URL */
var openTab = function (url) {
    chrome.tabs.create({url: url});
};

/** Opens the "Feeling Lucky" Google result in a new tab, given a
    given a particular query (and optional domain to target) */
var getLucky = function (query, site) {
    site = site ? ['site:', site, '+'].join('') : '';
    return ['https://google.com/search?btnI&q=', site, query].join('');
};

/** Creates a menu item to open the top search result on a given site for
    the text selection on the page */
var searchMenu = function (title, site) {
    return chrome.contextMenus.create({
        title: title,
        contexts: ['selection'],
        onclick: function (evt) {
            var targetQuery = evt.selectionText;
            var luckyURL = getLucky(targetQuery, site);
            openTab(luckyURL); 
        }
    });
};

var menu = searchMenu('MDNJump', 'developer.mozilla.org');
