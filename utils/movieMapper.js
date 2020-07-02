const movieMapper = {
    mapMovieHighlights: (list) => {
        return list.reduce((acc, mov) => {
            if (!mov.poster_path || !mov.backdrop_path) return acc;

            acc.push({ 
                title: mov.title, 
                release_date: mov.release_date, 
                id: mov.id, 
                backdrop_path: `https://image.tmdb.org/t/p/w780${mov.backdrop_path}`, 
                poster_path: `https://image.tmdb.org/t/p/w342${mov.poster_path}` 
            });

            return acc;
        }, []);
    },
    mapTitleDetails: (obj, isWatchlisted) => {
        return  {
            id: obj.id,
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
            isWatchlisted: isWatchlisted ? true : false
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
}

module.exports = movieMapper;