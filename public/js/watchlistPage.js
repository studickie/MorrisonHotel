var watchlistPage = {};

watchlistPage.removeWatchlistCard = function (id) {
    var parent = document.querySelector('#lst_titles');
    var card = document.getElementById(id);

    if (!parent || !card) {
        console.log('Error - removeWatchlistCard');
    } else {
        parent.removeChild(card);

        //~ add search bar to page if list contains no more titles
    }
}

watchlistPage.handleRemoveWatchlist = function () {
    var btns = document.querySelectorAll('button[name=btn_remove]');

    if (btns.length != 0) {
        btns.forEach(function (btn) {
            btn.addEventListener('click', function() {
                var tmdbId = this.getAttribute('data-id');
                
                http.requestDeleteWatchlistTitle(tmdbId)
                    .then(function (res) {
                        if (res.ok) {
                            //watchlistPage.removeWatchlistCard(tmdbId);

                            //~ use reload until search bar component is built
                            window.location.reload();
                        } else {
                            console.log('Error - requestDeleteWatchlistTitle');
                        }
                    });
            });
        })
    }
}

watchlistPage.init = function () {
    watchlistPage.handleRemoveWatchlist();
}

window.addEventListener('load', watchlistPage.init);