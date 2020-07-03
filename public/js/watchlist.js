var watchlistPage = {};

watchlistPage.removeWatchlistNode = function (id) {
    var nodeToRemove = document.getElementById(id);
    
    if (!nodeToRemove) return;

    var parent = document.querySelector('ul.watchlist__list');
    parent.removeChild(nodeToRemove);
}

watchlistPage.removeSelectedTitle = function (id) {
    http('DELETE', 'http://localhost:3000/watchlist/' + id)
        .then(function(response) {
            watchlistPage.removeWatchlistNode(id); //! change this to the response id
        })
        .catch(function(error) {
            console.log('Error:', error);
        })
}

watchlistPage.init = function () {
    var btnRemove = document.querySelectorAll('button[name=watchlist_remove]');

    if (btnRemove.length > 0) {
        btnRemove.forEach(function(btn) {
            btn.addEventListener('click', function() {
                watchlistPage.removeSelectedTitle(this.getAttribute('data-id'));
            });
        });
    }
}

window.addEventListener('load', watchlistPage.init);