var mainJs = {};
mainJs.menu = null;

mainJs.initMenu = function () {
    var menu = document.querySelector('#menu');

    if (menu) { 
        mainJs.menu = new ToggleElement(menu);
        
        var backdrop = document.querySelector('.menu__backdrop');
        
        if (backdrop) {
            backdrop.addEventListener('click', function() {
                mainJs.menu.handleToggle();
            });
        }
    }
}

mainJs.initSignoutButton = function () {
    var btn_signout = document.querySelector('button[name=btn_signout]');
    
    if (btn_signout) {
        btn_signout.addEventListener('click', http.requestSignout);
    }
}

mainJs.initGuestButton = function () {
    var btn_guest = document.querySelector('#btn_guest');
    
    if (btn_guest) {
        btn_guest.addEventListener('click', http.requestGuest);
    }
}
/**
 *      HTTP REQUESTS
 *      ----------------
 */
var http = {}
http.baseUrl = null;

http.urlEncoded = function (data) {
    return Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
}

http.requestUpdateWatchlist = function (tmdbId, mediaType) {
    return fetch(http.baseUrl + '/watchlist', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: http.urlEncoded({
            tmdbId: tmdbId,
            mediaType: mediaType
        })
    });
}

http.requestDeleteWatchlistTitle = function (tmdbId) {
    return fetch(http.baseUrl + '/watchlist', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: http.urlEncoded({
            tmdbId: tmdbId
        })
    });
}

http.requestUpdateRating = function (rating, tmdbId, mediaType) {
    return fetch(http.baseUrl + '/ratings' , {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: http.urlEncoded({
            rating: rating,
            tmdbId: tmdbId,
            mediaType: mediaType
        })
    });
}

http.requestDeleteRating = function (tmdbId) {
    return fetch(http.baseUrl + '/ratings', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: http.urlEncoded({
            tmdbId: tmdbId
        })
    });
}

http.requestGuest = function () {
    fetch(http.baseUrl + '/user/auth/signin?user=guest', {
        method: 'POST'
    })
    .then(function (res) {
        if (res.ok) {
            window.location.pathname = '/';
        }
    })
    
}

http.requestSignout = function () {
    return fetch(http.baseUrl + '/user/auth/signout', {
        method: 'POST'
    })
    .then(function() {
        window.location.reload();
    });
}
/**
 *      INIT PAGE 
 *      ----------------
 */
window.addEventListener('load', function () {
    http.baseUrl = document.querySelector('#hdn_api_url').value;

    mainJs.initMenu();
    mainJs.initSignoutButton();
    mainJs.initGuestButton();
});