const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const tmdb = {
    getPopularMovies: async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular',{
                params: {
                    api_key: process.env.TMDB_KEY3,
                    region: 'US',
                    language: 'en-US',
                    pages: 1
                }
            });

            return response.data;
        } catch (e) {
            console.log('error', e);
            return e;
        }
    },
    getTrending: async (mediaType = 'all') => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week`, {
                params: {
                    api_key: process.env.TMDB_KEY3
                }
            });

            return response.data;
        } catch (e) {
            console.log('error', e);
            return e;
        }
    },
    getNowPlayingMovies: async () => {
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
        } catch (e) {
            console.log('error', e);
            return e;
        }
    }
};

module.exports = tmdb;