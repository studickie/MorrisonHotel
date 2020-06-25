const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const tmdb = {
    getDashboardMovies: async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular',{
                params: {
                    api_key: process.env.TMDB_KEY3,
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