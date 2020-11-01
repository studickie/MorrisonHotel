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
            http.requestUpdateWatchlist(tmdbId, mediaType)
                .then(function (res) {
                    if (res.ok) {
                        titlePage.createWatchlistAnchor();
                    } else {
                        console.log('Error - requestUpdateWatchlist'); 
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

        titlePage.slctRating.addEventListener('change', function () {
            var tmdbId = this.getAttribute('data-id');
            var mediaType = this.getAttribute('data-type');
            var rating = parseInt(this.value);

            if (rating < 1) {
                http.requestDeleteRating(tmdbId)
                    .then(function(res) {
                        if (res.ok) {
                            //- nothing to run
                        } else {
                            console.log('Error - requestDeleteRating');
                        }
                    });
            } else {
                http.requestUpdateRating(rating, tmdbId, mediaType)
                    .then(function(res) {
                        if (res.ok) {
                            //- nothing to run
                        } else {
                            console.log('Error - requestUpdateRating');
                        }
                    });
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