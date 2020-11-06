var ratingsPage = {};

ratingsPage.initUserRatings = function () {
    var list = document.querySelectorAll('.rating--user');

    if (list.length != 0) {
        list.forEach(function (itm) {
            itm.children.slct_rating.value = itm.children.hdn_user_rating.value

            itm.children.slct_rating.addEventListener('change', function () {
                var tmdbId = this.getAttribute('data-id');
                var mediaType = this.getAttribute('data-type');
                var rating = parseInt(this.value);
    
                if (rating < 1) {
                    http.requestDeleteRating(tmdbId)
                        .then(function(res) {
                            if (res.ok) {
                                //- nothing to run
                                window.location.reload();
                            } else {
                                console.log('Error - requestDeleteRating');
                            }
                        });
                } else {
                    http.requestUpdateRating(rating, tmdbId, mediaType)
                        .then(function(res) {
                            if (res.ok) {
                                //- nothing to run
                                window.location.reload();
                            } else {
                                console.log('Error - requestUpdateRating');
                            }
                        });
                }
            });
        });
    } else {
        console.log('Error - initUserRatings');
    }
}

ratingsPage.init = function () {
    ratingsPage.initUserRatings();
}

window.addEventListener('load', ratingsPage.init);