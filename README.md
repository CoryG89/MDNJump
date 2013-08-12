MDNJump
=======

MDNJump is a simple extension for Google Chrome which adds a context menu for
text selections allowing quick reference lookups on the fly. MDN is generally
my favorite reference for front end development so I created this extension so
I could more quicky search MDN for new topics I am reading about.

Usage
------
To use MDNJump, select some text on a page you're reading such as 
`window.location` and right click. The MDNJump context menu entry will be
present. Click the menu button and instead of being brought to a search results
page, you will be brought directly to this [**wonderful reference**][ex-ref].

Permissions
-----------

 - **Tabs** -- MDNJump will open a new tab when you perform a jump.
 - **Context Menus** -- MDNJump will create a context menu item for use when
    the context menu is activated while text is selected.

Technical
---------

When I set out to create this extension I first looked at how I could 
dynamically query MDN based on a text selection. I began by trying to construct
a URL which would take the following form:

    http://developer.mozilla.org/search?q=Your+text+selection+here

This allows me to construct a URL based on a text-selection to query MDN,
however, it's kind of a pain to have to select the top entry on the MDN search
results page every time. I could find no way to simply link directly to the top
search result. What I needed was something like the 
[**I'm Feeling Lucky**][lucky-button] on Google's search page. This would allow
me to jump directly to the top result.

This gave me an idea: why not simply use the I'm Feeling Lucky feature from
Google? I began looking around to see if it was possible to construct a Google
search query URL which allowed use of the Feeling Lucky feature. I found this
[Stack Exchange question][lucky-blog-post] which explained that adding the
field `btnI` in the query string would enable I'm Feeling Lucky.

So we can use URLs of the following form:

    http://google.com/search?btnI&q=Your+text+selection+here

I created a simple function used to construct these URLs, optionally
restricting them to a given domain:

```javascript
/** Opens the "Feeling Lucky" Google result in a new tab, given a
	given a particular query (and optional domain to target) */
var getLucky = function (query, site) {
	site = site ? ['site:', site, '+'].join('') : '';
	return ['https://google.com/search?btnI&q=', site, query].join('');
};
```

Using this I am able to get the URLs of the following form, which is what
MDNJump opens in a new tab based on your text selection:

	http://google.com/search?btnI&q=site:developer.mozilla.org+Your+text+selection+here

[ex-ref]: https://developer.mozilla.org/en-US/docs/Web/API/window.location