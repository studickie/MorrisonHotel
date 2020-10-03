var titlePage = {};
titlePage.btnAddWatchlist = null;
titlePage.slctRating = null;
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

titlePage.initWatchlist = function () {
    titlePage.btnAddWatchlist = document.querySelector('button[name=btn_watchlist_add]');

    if (titlePage.btnAddWatchlist) {
        titlePage.btnAddWatchlist.addEventListener('click', function () {
            var tmdbId = this.getAttribute('data-id'), mediaType = this.getAttribute('data-type');
            mainJs.requestUpdateWatchlist(tmdbId, mediaType)
                .then(function (res) {
                    if (res.ok) {
                        titlePage.createWatchlistAnchor()
                    }
                });
        });
    }
}

titlePage.initRating = function () {
    titlePage.slctRating = document.querySelector('select[name=slct_rating]');

    if (titlePage.slctRating) {
        //~ set value of rating dropdown from hidden input value
        titlePage.slctRating.value = document.querySelector('input[id=hdn_user_rating]').value;

        titlePage.slctRating.addEventListener('change', function (e) {
            var tmdbId = this.getAttribute('data-id'), mediaType = this.getAttribute('data-type'),
                rating = parseInt(this.value);

            if (rating < 1) {
                mainJs.requestDeleteRating(tmdbId);
            } else {
                mainJs.requestUpdateRating(rating, tmdbId, mediaType);
            }
        });
    }
}

window.addEventListener('load', function () {
    titlePage.initWatchlist();
    titlePage.initRating();
});

//~ --------------------------------------------------------------
//~     YouTube iframe API
//~     developers.google.com/youtube/iframe_api_reference
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