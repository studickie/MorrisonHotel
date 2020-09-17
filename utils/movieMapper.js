exports.mapPosterList = (list, count = 0) => {
    count = count || list.length;
    let i = 0, listToReturn = [];

    while (listToReturn.length < count && i < list.length) {
        if (list[i].poster_path) {
            let itm = list[i];
            listToReturn.push(
                new PosterListItem(itm.id, itm.media_type, itm.title, itm.poster_path, itm.release_date,
                    itm.vote_average));
        }

        i++;
    }

    return listToReturn;
}

//  <summary>
//  retuns data for grouped images
exports.mapPosterGroup = (list, count = 0) => {
    count = count || list.length;
    let i = 0; listToReturn = [];

    while (listToReturn.length < count && i < list.length) {
        if (list[i].poster_path) {
            let itm = list[i];
            listToReturn.push(
                new BaseTitleDetails(itm.id, itm.media_type, itm.title, itm.poster_path, itm.release_date));
        }

        i++;
    }

    return listToReturn;
}

//  <summary>
//  returns data for home page highlights reel
exports.mapHighlightsList = (list, count = 0) => {
    count = count || list.length;
    let i = 0, listToReturn = [];

    while (listToReturn.length < count && i < list.length) {
        if (list[i].poster_path && list[i].backdrop_path) {
            let itm = list[i],
                title = itm.title || itm.name,
                releaseDate = itm.release_date || itm.first_air_date;

            listToReturn.push(
                new HighlightsItem(itm.id, itm.media_type, title, itm.poster_path, releaseDate, itm.backdrop_path));
        }

        i++;
    }

    return listToReturn;
}

//  <summary>
//  returns full title details data for title page
exports.mapTitleDetails = (data) => {
    const title = data.title || data.name,
        releaseDate = data.release_date || data.first_air_date,
        runtime = (data.runtime != undefined) ? data.runtime : data.episode_run_time[0];

    return new TitleFullDetails(
        data.id,
        data.media_type,
        title, data.poster_path,
        releaseDate,
        data.overview,
        runtime,
        data.vote_average,
        data.backdrop_path || ''
    );
}

exports.mapWatchlist = (list) => {
    return list.map(itm => {
        return {
            id: itm.id,
            title: itm.title,
            release_year: itm.release_date.slice(0, 4),
            poster_path: `https://image.tmdb.org/t/p/w342${itm.poster_path}`
        }
    })
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


//~ --------------------
//~     Types
//~ --------------------
class BaseTitleDetails {
    constructor(tmdbId, mediaType, title, posterPath, releaseDate) {
        this.tmdbId = tmdbId;
        this.mediaType = mediaType;
        this.title = title;
        this.posterSm = `https://image.tmdb.org/t/p/w185${posterPath}`;
        this.posterLg = `https://image.tmdb.org/t/p/w342${posterPath}`;
        this.releaseYear = this.dateToYear(releaseDate);
    }

    dateToYear = (date) => date.slice(0, 4);
}

class TitleFullDetails extends BaseTitleDetails {
    constructor(tmdbId, mediaType, title, posterPath, releaseDate, summary, runtime, voteAverage, backdropPath) {
        super(tmdbId, mediaType, title, posterPath, releaseDate);
        this.summary = summary;
        this.runtime = runtime;
        this.voteAverage = voteAverage;
        this.backdropSm = `https://image.tmdb.org/t/p/w300${backdropPath}`;
    }
}

class PosterListItem extends BaseTitleDetails {
    constructor(tmdbId, mediaType, title, posterPath, releaseDate, avgRating) {
        super(tmdbId, mediaType, title, posterPath, releaseDate);
        this.avgRating = this.motelRating(avgRating);
    }

    motelRating = (rating) => {
        return Math.round(Number(rating/2))
    }
}

class HighlightsItem extends BaseTitleDetails {
    constructor(tmdbId, mediaType, title, posterPath, releaseDate, backdropPath) {
        super(tmdbId, mediaType, title, posterPath, releaseDate);
        this.backdropSm = `https://image.tmdb.org/t/p/w780${backdropPath}`;
        this.backdropLg = `https://image.tmdb.org/t/p/w1280${backdropPath}`;
    }
}