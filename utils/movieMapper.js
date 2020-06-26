const { move } = require("../routes/movie.route");

const movieMapper = {
    mapMovieThumbnails: (list) => {
        return list.map((mov) => ({ title, release_date, id } = mov));
    }
};

module.exports = movieMapper;