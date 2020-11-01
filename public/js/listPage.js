var listPage = {};

listPage.removeDeletedTitle = function(titleId) {
    var parent = document.querySelector('.titleList__list');
    var item = document.getElementById(titleId);

    parent.removeChild(item);
    window.location.reload();
}

listPage.initAddWatchlistButtons = function() {
    var button_add = document.querySelectorAll('button[name=btn_watchlist_add]');

    if (button_add.length > 0) {
        button_add.forEach(btn => {
            btn.addEventListener('click', function() {
                var tmdbId = this.getAttribute('data-id');
                var mediaType = this.getAttribute('data-type');

                http.requestUpdateWatchlist(tmdbId, mediaType)
                    .then(function(res) {
                        if (res.ok) {
                            //- nothing to run
                        } else {
                            console.log('Error - requestUpdateWatchlist');
                        }
                    });
            });
        });
    }
}

listPage.initRemoveWatchlistButtons = function() {
    var button_remove = document.querySelectorAll('button[name=btn_watchlist_remove]');

    if (button_remove.length > 0) {
        button_remove.forEach(btn => {
            btn.addEventListener('click', function() {
                var tmdbId = this.getAttribute('data-id');

                http.requestDeleteWatchlistTitle(tmdbId)
                    .then(function(res) {
                        if (res.ok) {
                            listPage.removeDeletedTitle(tmdbId);
                        } else {
                            console.log('Error - requestDeleteWatchlistTitle');    
                        }  
                    });
            });
        });
    }
}

window.addEventListener('load', function() {
    listPage.initAddWatchlistButtons();
    listPage.initRemoveWatchlistButtons();
});