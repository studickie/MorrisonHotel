var titlePage = {};
titlePage.btnAddWatchlist = null;
titlePage.player = null;

titlePage.createWatchlistAnchor = function () {
    var parent = document.querySelector('.title__button--watchlist');

    parent.removeChild(titlePage.btnAddWatchlist);
    titlePage.btnAddWatchlist = null;

    var anchor = document.createElement('a');
    anchor.setAttribute('href', '/watchlist');
    anchor.textContent = 'See my watchlist';

    parent.appendChild(anchor);
}

titlePage.addMovieToWatchlist = function (tmdbId, mediaType) {
    mainJs.requestUpdateWatchlist(tmdbId, mediaType)
        .then(function(res) {
            console.log(res)
            if (res.ok) {
                titlePage.createWatchlistAnchor()
            }
        })
}

titlePage.updateTitleRating = function (tmdbId, rating) {

}

titlePage.init = function () {
    titlePage.btnAddWatchlist = document.querySelector('button[name=btn_watchlist_add]');
    var slctRating = document.querySelector('select[name=slct_rating]');

    if (titlePage.btnAddWatchlist) {
        titlePage.btnAddWatchlist.addEventListener('click', function () {
            var tmdbId = this.getAttribute('data-id'), mediaType = this.getAttribute('data-type');
            titlePage.addMovieToWatchlist(tmdbId, mediaType);
        });
    }

    if (slctRating) {
        //~ set value of rating dropdown from hidden input value
        slctRating.value = document.querySelector('input[id=hdn_user_rating]').value;

        slctRating.addEventListener('change', function (e) {
            titlePage.updateTitleRating(this.getAttribute('data-id'), parseInt(e.target.value));
        });
    }
}

window.addEventListener('load', titlePage.init);

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
        events: {}
    });
}