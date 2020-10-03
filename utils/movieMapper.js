exports.mapPosterList = (list, count = 0) => {
    count = count || list.length;

    return iterate(list, count, (itm) => {
        if (itm.poster_path) {
            let itm = itm;
            let title = itm.title || itm.name, releaseDate = itm.release_date || itm.first_air_date;

            return new PosterListItem(itm.id, title, itm.poster_path, releaseDate, itm.vote_average);
        }
    });
}

//  <summary>
//  retuns data for grouped images
exports.mapPosterGroup = (list, count = 0) => {
    count = count || list.length;

    return iterate(list, count, (itm) => {
        if (itm.poster_path) {
            let title = itm.title || itm.name, releaseDate = itm.release_date || itm.first_air_date;
            return new BaseTitleDetails(itm.id, title, itm.poster_path, releaseDate);
        }
    });
}

//  <summary>
//  returns data for home page highlights reel
exports.mapHighlightsList = (list, count = 0) => {
    count = count || list.length;

    return iterate(list, count, (itm) => {
        if (itm.poster_path && itm.backdrop_path) {
            let title = itm.title || itm.name, releaseDate = itm.release_date || itm.first_air_date;

            return new HighlightsItem(itm.id, title, itm.poster_path, releaseDate, itm.media_type, itm.backdrop_path);
        }
    });
}

//  <summary>
//  returns full title details data for title page
exports.mapTitleDetails = (data) => {
    const title = data.title || data.name,
        releaseDate = data.release_date || data.first_air_date,
        runtime = (data.runtime != undefined) ? data.runtime : data.episode_run_time[0];

    return new TitleFullDetails(
        data.id,
        title, data.poster_path,
        releaseDate,
        data.overview,
        runtime,
        data.vote_average,
        data.backdrop_path || ''
    );
}

exports.mapTitleList = (list, refList) => {
    const listToReturn = list.map(itm => {
        const title = itm.title || itm.name, releaseDate = itm.release_date || itm.first_air_date;

        const mediaType = refList.filter(ref => ref.tmdbId == itm.id)[0].mediaType;

        return new TitleListItem(itm.id, title, itm.poster_path, releaseDate, mediaType, itm.vote_average);
    });

    return listToReturn;
}

exports.mapTitleListWithRatings = (list, refList) => {
    const listToReturn = list.map(itm => {
        const title = itm.title || itm.name, releaseDate = itm.release_date || itm.first_air_date;

        const ref = refList.filter(ref => ref.tmdbId == itm.id)[0];

        return new RatedTitleListItem(itm.id, title, itm.poster_path, releaseDate, ref.mediaType, itm.vote_average, ref.rating);
    });

    return listToReturn;
}

//  <summary> 
//  returns video object to display on title page based on selection criteria
exports.selectRelevantVideo = (list) => {
    if (list.length > 0) {
        const result = list.reduce((acc, vid) => {
            if (vid.site.toLowerCase() == 'youtube') {
                acc.push({
                    id: vid.id,
                    score: setVideoScore(vid)
                });
            }

            return acc;
        }, []).sort((a, b) => b.score - a.score)[0];

        return list.find(vid => vid.id == result.id);

    } else {
        return {};
    }
}

//~ --------------------
//~     Utilities
//~ --------------------

//  <summary> 
//  returns a score based on set criteria to help with selecting most relevant video from a list
const setVideoScore = (videoData) => {
    const name = videoData.name.toLowerCase();
    const type = videoData.type.toLowerCase();
    let score = 0;
    // check type
    if (type == 'trailer') {
        score = score + 2;
    } else if (type == 'teaser') {
        score = score + 1;
    }
    // check name for 'Offical', 'Final'
    if (name.includes('official')) {
        score = score + 3;
    }

    if (name.includes('trailer')) {
        score = score + 1;
    }

    if (name.includes('final')) {
        score = score + 2;
    }

    return score;
}

//  <summary> 
//  allows iterating over an array to retrieive a set amount of items which meet a certain criteria
const iterate = (list, count, execute) => {
    let listToReturn = [], i = 0;

    while (listToReturn.length < count && i < list.length) {
        listToReturn = listToReturn.concat([execute(list[i])]);

        i++;
    }

    return listToReturn;
}


//~ --------------------
//~     Types
//~ --------------------
class BaseTitleDetails {
    constructor(tmdbId, title, posterPath, releaseDate) {
        this.tmdbId = tmdbId;
        this.title = title;
        this.posterSm = `https://image.tmdb.org/t/p/w185${posterPath}`;
        this.posterLg = `https://image.tmdb.org/t/p/w342${posterPath}`;
        this.releaseYear = this.dateToYear(releaseDate);
    }

    dateToYear = (date) => date.slice(0, 4);
}

class TitleFullDetails extends BaseTitleDetails {
    constructor(tmdbId, title, posterPath, releaseDate, summary, runtime, voteAverage, backdropPath) {
        super(tmdbId, title, posterPath, releaseDate);
        this.summary = summary;
        this.runtime = runtime;
        this.voteAverage = voteAverage;
        this.backdropSm = `https://image.tmdb.org/t/p/w300${backdropPath}`;
    }
}

class PosterListItem extends BaseTitleDetails {
    constructor(tmdbId, title, posterPath, releaseDate, avgRating) {
        super(tmdbId, title, posterPath, releaseDate);
        this.avgRating = avgRating;
    }
}

class TitleListItem extends BaseTitleDetails {
    constructor(tmdbId, title, posterPath, releaseDate, mediaType, voteAverage) {
        super(tmdbId, title, posterPath, releaseDate);
        this.mediaType = mediaType;
        this.voteAverage = voteAverage;
    }
}

class RatedTitleListItem extends TitleListItem {
    constructor(tmdbId, title, posterPath, releaseDate, mediaType, voteAverage, userRating) {
        super(tmdbId, title, posterPath, releaseDate, mediaType, voteAverage);
        this.userRating = userRating;
    }
}

class HighlightsItem extends BaseTitleDetails {
    constructor(tmdbId, title, posterPath, releaseDate, mediaType, backdropPath) {
        super(tmdbId, title, posterPath, releaseDate);
        this.mediaType = mediaType;
        this.backdropSm = `https://image.tmdb.org/t/p/w780${backdropPath}`;
        this.backdropLg = `https://image.tmdb.org/t/p/w1280${backdropPath}`;
    }
}