![idiots win](http://idiots.win/img/twitter-card.png)
####(The Google Autocomplete Guessing Game)

### What is this?
idiots win turns Google autocomplete function into a guessing game. Each new round, the game takes the five top autocompletes for a given query, randomizes them, and invites you to guess which one was meant to come first in the results.

### Tell me more about this autocomplete query.
It is decidedly *not* officially supported by Google. The site does a json request out to suggestqueries.google.com and comes back with the results. It works for now, I have no idea if it will continue to work in the future.

Also, Google's autocomplete is constantly changing and based on regional information. The top result is realistically only the top result for you at that moment.

### Who made this
[Lemon](https://thefpl.us/meet/lemon) made this. [Montrith](https://thefpl.us/meet/montrith) provided the majority of the queries.

### Isn't this kind of like Google Feud? 
[Google Feud](http://www.googlefeud.com/) is a site built by [Justin Hook](https://twitter.com/justinhook) that turns Google's autocomplete into a game of Family Feud. It's terrific, you should play it if you haven't. This is a different thing with a similar premise.

### Can I suggest queries?
Sure. Either get a hold of Lemon to get access to the master spreadsheet, or submit a pull request.

### Do you take pull requests?
Absolutely.

### What's this written in?
* [Jade](http://jade-lang.com/)
* [Sass](http://sass-lang.com/)
* [jQuery](http://jquery.com/)
* The typing effect was modified from [this pen](http://codepen.io/stathisg/pen/Bkvhg/) by [Stathis](http://codepen.io/stathisg/)