var titlePage = {};
titlePage.btnAddWatchlist = null;
//~ ----------------------
//*         Utils
//~ ----------------------
titlePage.createWatchlistAnchor = function() {
    var parent = document.querySelector('.title__watchlist');

    parent.removeChild(titlePage.btnAddWatchlist);
    titlePage.btnAddWatchlist = null;

    var anchor = document.createElement('a');
    anchor.setAttribute('href', '/watchlist');
    anchor.textContent = 'See Watchlist';

    parent.appendChild(anchor);
}
//~ ----------------------
//*     HTTP Requests
//~ ----------------------
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

titlePage.updateTitleRating = function( tmdbId, rating) {
    http('POST', 'http://localhost:3000/rating', { tmdbId, rating })
        .then(function(response) {
            console.log('success', response);
        })
        .catch(function(error) {
            console.log('error', error)
        })
}
//~ ----------------------
//*         Init
//~ ----------------------
titlePage.init = function () {
    titlePage.btnAddWatchlist = document.querySelector('button[name=watchlist_add]');
    var btnRating = document.querySelectorAll('button[name=rating]');

    if (titlePage.btnAddWatchlist) {
        //- add watchlist button event listener
        titlePage.btnAddWatchlist.addEventListener('click', function() {
            titlePage.addMovieToWatchlist(this.getAttribute('data-id'));
        });
    }

    if (btnRating.length > 0) {
        // - add rating button event listeners
        btnRating.forEach(function(btn) {
            btn.addEventListener('click', function() {
                titlePage.updateTitleRating(this.getAttribute('data-id'), parseInt(this.getAttribute('data-value')));
            });
        });
    }
}

window.addEventListener('load', titlePage.init);