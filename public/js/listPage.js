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
                var tmdbId = this.getAttribute('data-id'), mediaType = this.getAttribute('data-type');
                mainJs.requestUpdateWatchlist(tmdbId, mediaType);
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
                mainJs.requestDeleteWatchlistTitle(tmdbId)
                    .then(function() {
                        listPage.removeDeletedTitle(tmdbId);
                    })
            });
        });
    }
}

window.addEventListener('load', function() {
    listPage.initAddWatchlistButtons();
    listPage.initRemoveWatchlistButtons();
});