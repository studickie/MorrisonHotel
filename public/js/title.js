var titlePage = {};
titlePage.btnAddWatchlist = null;

titlePage.createWatchlistAnchor = function() {
    var parent = document.querySelector('.title__watchlist');

    parent.removeChild(titlePage.btnAddWatchlist);
    titlePage.btnAddWatchlist = null;

    var anchor = document.createElement('a');
    anchor.setAttribute('href', '/watchlist');
    anchor.textContent = 'See Watchlist';

    parent.appendChild(anchor);
}

titlePage.addMovieToWatchlist = function (tmdbId) {
    //! disable button
    
    http('POST', 'http://localhost:3000/watchlist', { tmdbId })
        .then(function(response) {
            console.log('success:', response);

            titlePage.createWatchlistAnchor();
        })
        .catch(function(error) {
            console.log('error:', error);
        })
}

titlePage.init = function () {
    titlePage.btnAddWatchlist = document.querySelector('button[name=watchlist_add]');

    if (titlePage.btnAddWatchlist) {
        titlePage.btnAddWatchlist.addEventListener('click', function() {
            titlePage.addMovieToWatchlist(this.getAttribute('data-id'));
        });
    }
}

window.addEventListener('load', titlePage.init);