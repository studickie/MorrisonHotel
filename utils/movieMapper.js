exports.mapPosterList = (list, count = 0) => {
    count = count || list.length;
    let i = 0, listToReturn = [];

    while(listToReturn.length < count && i < list.length) {
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
    
    while(listToReturn.length < count && i < list.length) {
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

    while(listToReturn.length < count && i < list.length) {
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

exports.mapTitleDetails = (data) => {
    const title = data.title || data.name,
        releaseDate = itm.release_date || itm.first_air_date;
    return new TitleFullDetails(data.id, data.media_type, title, data.poster_path, releaseDate, data.overview)
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
    constructor(tmdbId, mediaType, title, posterPath, releaseDate) {
        super(tmdbId, mediaType, title, posterPath, releaseDate);
        this.summary = summary;
    }
}

class PosterListItem extends BaseTitleDetails {
    constructor(tmdbId, mediaType, title, posterPath, releaseDate, avgRating) {
        super(tmdbId, mediaType, title, posterPath, releaseDate);
        this.avgRating = avgRating;
    }
}

class HighlightsItem extends BaseTitleDetails {
    constructor(tmdbId, mediaType, title, posterPath, releaseDate, backdropPath) {
        super(tmdbId, mediaType, title, posterPath, releaseDate);
        this.backdropSm = `https://image.tmdb.org/t/p/w780${backdropPath}`;
        this.backdropLg = `https://image.tmdb.org/t/p/w1280${backdropPath}`;
    }
}