//~ --------------------------------------------------------------
//~     YouTube iframe API
//~     https://developers.google.com/youtube/iframe_api_reference
//~ --------------------------------------------------------------

var player = null;

function onYouTubeIframeAPIReady() {
    var key = document.querySelector('#video_iframe').getAttribute('data-src');
    var iframeHeight = window.innerWidth < 1024 
        ? document.querySelector('.page__wrapper').getBoundingClientRect().width * 0.5625
        : document.querySelector('#poster_picture').getBoundingClientRect().height;
        
    player = new YT.Player('video_iframe', {
        videoId: key,
        width: '100%',
        height: iframeHeight,
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




















// var titlePage = {};
// titlePage.btnAddWatchlist = null;
// //~ ----------------------
// //*         Utils
// //~ ----------------------
// titlePage.createWatchlistAnchor = function() {
//     var parent = document.querySelector('.title__watchlist');

//     parent.removeChild(titlePage.btnAddWatchlist);
//     titlePage.btnAddWatchlist = null;

//     var anchor = document.createElement('a');
//     anchor.setAttribute('href', '/watchlist');
//     anchor.textContent = 'See Watchlist';

//     parent.appendChild(anchor);
// }
// //~ ----------------------
// //*     HTTP Requests
// //~ ----------------------
// titlePage.addMovieToWatchlist = function (tmdbId) {
//     //! disable button

//     http('POST', 'http://localhost:3000/watchlist', { tmdbId })
//         .then(function(response) {
//             console.log('success:', response);

//             titlePage.createWatchlistAnchor();
//         })
//         .catch(function(error) {
//             console.log('error:', error);
//         })
// }

// titlePage.updateTitleRating = function( tmdbId, rating) {
//     http('POST', 'http://localhost:3000/rating', { tmdbId, rating })
//         .then(function(response) {
//             console.log('success', response);
//         })
//         .catch(function(error) {
//             console.log('error', error)
//         })
// }
// //~ ----------------------
// //*         Init
// //~ ----------------------
// titlePage.init = function () {
//     titlePage.btnAddWatchlist = document.querySelector('button[name=watchlist_add]');
//     var btnRating = document.querySelectorAll('button[name=rating]');

//     if (titlePage.btnAddWatchlist) {
//         //- add watchlist button event listener
//         titlePage.btnAddWatchlist.addEventListener('click', function() {
//             titlePage.addMovieToWatchlist(this.getAttribute('data-id'));
//         });
//     }

//     if (btnRating.length > 0) {
//         // - add rating button event listeners
//         btnRating.forEach(function(btn) {
//             btn.addEventListener('click', function() {
//                 titlePage.updateTitleRating(this.getAttribute('data-id'), parseInt(this.getAttribute('data-value')));
//             });
//         });
//     }
// }

// window.addEventListener('load', titlePage.init);