var titlePage = {};
titlePage.btnAddWatchlist = null;

titlePage.createWatchlistAnchor = function() {
    var parent = document.querySelector('.title__button--watchlist');

    parent.removeChild(titlePage.btnAddWatchlist);
    titlePage.btnAddWatchlist = null;

    var anchor = document.createElement('a');
    anchor.setAttribute('href', '/watchlist');
    anchor.textContent = 'See my watchlist';

    parent.appendChild(anchor);
}

titlePage.addMovieToWatchlist = function (tmdbId, mediaType) {
    http('POST', 'http://localhost:3000/watchlist', { tmdbId, mediaType })
        .then(titlePage.createWatchlistAnchor())
        .catch(function(error) {
            console.log('error:', error);
        });
}

titlePage.updateTitleRating = function( tmdbId, rating) {
    http('POST', 'http://localhost:3000/rating', { tmdbId, rating });
}

titlePage.init = function () {
    titlePage.btnAddWatchlist = document.querySelector('button[name=btn_watchlist_add]');
    var slctRating = document.querySelector('select[name=slct_rating]');

    if (titlePage.btnAddWatchlist) {
        titlePage.btnAddWatchlist.addEventListener('click', function() {
            titlePage.addMovieToWatchlist(this.getAttribute('data-id'), this.getAttribute('data-type'));
        });
    }

    if (slctRating) {
        //~ set value of rating dropdown from hidden input value
        slctRating.value = document.querySelector('input[id=hdn_user_rating]').value;

        slctRating.addEventListener('change', function(e) {
            titlePage.updateTitleRating(this.getAttribute('data-id'), parseInt(e.target.value));
        });
    }
}

window.addEventListener('load', titlePage.init);

titlePage.player = null;

//~ --------------------------------------------------------------
//~     YouTube iframe API
//~     https://developers.google.com/youtube/iframe_api_reference
//~ --------------------------------------------------------------

function onYouTubeIframeAPIReady() {
    var key = document.querySelector('#video_iframe').getAttribute('data-src');
        
    titlePage.player = new YT.Player('video_iframe', {
        videoId: key,
        width: '100%',
        height: '100%',
        events: {
            //'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log('on ready', event, event.target);
}

function onPlayerStateChange(event) {
    console.log('change', event, event.target);
}