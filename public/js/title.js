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

titlePage.init = function () {
    titlePage.btnAddWatchlist = document.querySelector('button[name=btn_watchlist_add]');
    var slctRating = document.querySelector('select[name=slct_rating]');

    if (titlePage.btnAddWatchlist) {
        titlePage.btnAddWatchlist.addEventListener('click', function() {
            titlePage.addMovieToWatchlist(this.getAttribute('data-id'));
        });
    }

    if (slctRating) {
        slctRating.value = document.querySelector('input[id=hdn_user_rating]').value;

        slctRating.addEventListener('change', function(e) {
            titlePage.updateTitleRating(this.getAttribute('data-id'), parseInt(e.target.value));
        });
    }
}

window.addEventListener('load', titlePage.init);

titlePage.player = null;
titlePage.breakpointWidth = 640;

titlePage.getPlayerIframeHeight = function () {
    return window.innerWidth < titlePage.breakpointWidth 
        ? document.querySelector('.page__wrapper').getBoundingClientRect().width * 0.5625
        : document.querySelector('#poster_picture').getBoundingClientRect().height;
}

window.addEventListener('resize', function() {
    titlePage.player.f.height = titlePage.getPlayerIframeHeight();
});

//~ --------------------------------------------------------------
//~     YouTube iframe API
//~     https://developers.google.com/youtube/iframe_api_reference
//~ --------------------------------------------------------------

function onYouTubeIframeAPIReady() {
    var key = document.querySelector('#video_iframe').getAttribute('data-src');
        
    titlePage.player = new YT.Player('video_iframe', {
        videoId: key,
        width: '100%',
        height: titlePage.getPlayerIframeHeight(),
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