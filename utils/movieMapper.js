const { move } = require("../routes/movie.route");

const movieMapper = {
    mapMovieHighlights: (list) => {
        return list.map((mov) => {
            return { 
                title: mov.title, 
                release_date: mov.release_date, 
                id: mov.id, 
                backdrop_path: `https://image.tmdb.org/t/p/w780${mov.backdrop_path}`, 
                poster_path: `https://image.tmdb.org/t/p/w342${mov.poster_path}` 
            };
        });
    }
};

module.exports = movieMapper;