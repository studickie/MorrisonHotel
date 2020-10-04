const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


exports.getPopularMovies = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: process.env.TMDB_KEY3,
                region: 'US',
                language: 'en-US',
                pages: 1
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}

exports.getTrending = async (timeframe = 'day', mediaType = 'all') => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/${timeframe}`, {
            params: {
                api_key: process.env.TMDB_KEY3
            }
        });

        return response.data;
    } catch (err) {
        return err;
    }
}

exports.getNowPlayingMovies = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: {
                api_key: process.env.TMDB_KEY3,
                region: 'US',
                language: 'en-US',
                pages: 1
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}

exports.getUpcommingMovies = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
            params: {
                api_key: process.env.TMDB_KEY3,
                region: 'US',
                language: 'en-US',
                pages: 1
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}


exports.getTitleDetails = async (mediaType, titleId) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${titleId}`, {
            params: {
                api_key: process.env.TMDB_KEY3,
                language: 'en-US'
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}

exports.getTitleVideos = async (mediaType, titleId) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${titleId}/videos`, {
            params: {
                api_key: process.env.TMDB_KEY3,
                language: 'en-US'
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}

exports.getTitleCredits = async (titleId) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${titleId}/credits`, {
            params: {
                api_key: process.env.TMDB_KEY3
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}

exports.getSearchResults = async (query, mediaType = 'multi') => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
            params: {
                api_key: process.env.TMDB_KEY3,
                language: 'en-US',
                query: query,
                region: 'US',
                include_adult: false
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}

exports.getConfig = async function () {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/configuration', {
            params: {
                api_key: process.env.TMDB_KEY3
            }
        });

        return response.data;

    } catch (err) {
        return err;
    }
}