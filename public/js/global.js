var mainJs = {};
mainJs.baseUrl = undefined;

/**
 *      UTILS
 *      ----------------
 */
mainJs.urlEncoded = function (data) {
    return Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
}

/**
 *      HTTP REQUESTS
 *      ----------------
 */
mainJs.requestUpdateWatchlist = function (tmdbId, mediaType) {
    return fetch(mainJs.baseUrl + '/watchlist', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: mainJs.urlEncoded({
            tmdbId: tmdbId,
            mediaType: mediaType
        })
    });
}

mainJs.requestUpdateRating = function (rating, tmdbId, mediaType) {
    return fetch(mainJs.baseUrl + '/ratings' , {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: mainJs.urlEncoded({
            rating: rating,
            tmdbId: tmdbId,
            mediaType: mediaType
        })
    });
}

mainJs.requestSignout = function () {
    return fetch(mainJs.baseUrl + '/user/auth/signout', {
        method: 'POST'
    });
}

/**
 *      INIT PAGE 
 *      ----------------
 */
mainJs.initNavMenuToggle = function () {
    var menu = document.querySelector('[data-role=dropdown]');

    if (menu) new ToggleElement(menu);
}

mainJs.initSignoutButton = function () {
    var btn_signout = document.querySelector('button[name=btn_signout]');
    if (btn_signout) {
        btn_signout.addEventListener('click', function () {
            mainJs.requestSignout()
                .then(function() {
                    window.location.reload();
                });
        });
    }
}

mainJs.init = function () {
    mainJs.baseUrl = document.querySelector('#hdn_api_url').value;

    mainJs.initNavMenuToggle();
    mainJs.initSignoutButton();
}

window.addEventListener('load', mainJs.init);