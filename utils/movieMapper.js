const movieMapper = {
    mapHomepageHighlights: (list) => {
        return list.reduce((acc, ttl) => {
            if (!ttl.poster_path || !ttl.backdrop_path) return acc;
    
            acc.push({ 
                title: ttl.title || ttl.name, 
                release_date: ttl.release_date || ttl.first_air_date, 
                tmdbid: ttl.id, 
                backdrop_path: `https://image.tmdb.org/t/p/w780${ttl.backdrop_path}`, 
                poster_path: `https://image.tmdb.org/t/p/w342${ttl.poster_path}` 
            });
    
            return acc;
        }, []);
    },
    mapPosterLinkList: (list, max = null) => {
        max = max || list.length;
        let counter = 0, listToReturn = [];
        
        while(listToReturn.length < max) {
            if (list[counter].poster_path) {
                listToReturn.push({
                    poster_path: `https://image.tmdb.org/t/p/w342${list[counter].poster_path}`,
                    tmdbid: list[counter].id,
                });
            }

            counter++;
        };

        return listToReturn;
    },
    mapTitleDetails: (isSignedin, obj, isWatchlisted = false, rating = 0) => {
        return  {
            tmdbid: obj.id,
            title: obj.title,
            release_date: obj.release_date,
            release_year: mapYear(obj.release_date),
            tagline: obj.tagline,
            overview: obj.overview,
            vote_average: obj.vote_average,
            backdrop_path: `https://image.tmdb.org/t/p/w780${obj.backdrop_path}`, 
            poster_path: `https://image.tmdb.org/t/p/w342${obj.poster_path}`,
            cast: obj.cast.map(cst => ({ id, name, character, order } = cst)),
            crew: obj.crew.map(crw => ({ id, name, job } = crw)),
            isSignedin: isSignedin,
            isWatchlisted: isWatchlisted,
            user_rating: rating
        };
    },
    mapWatchlist: (list) => {
        return list.map(itm => {
            return {
                id: itm.id,
                title: itm.title,
                release_year: mapYear(itm.release_date),
                poster_path: `https://image.tmdb.org/t/p/w342${itm.poster_path}`
            }
        })
    }
};

//- returns 'yyyy' from given string formated as ex: 'yyyy-mm-dd'
const mapYear = (string) => {
    const regexp = new RegExp('\\d{4}');
    return string.match(regexp)[0] || '';
};

module.exports = movieMapper;