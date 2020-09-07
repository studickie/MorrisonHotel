const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const tmdb = {
    //~ ---------------
    //*     Lists
    //~ ---------------
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
    getTrending: async (timeframe = 'day', mediaType = 'all') => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/${timeframe}`, {
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
    },
    getUpcommingMovies: async () => {
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
        } catch (e) {
            console.log('error', e);
            return e;
        }
    },
    //~ ---------------
    //*     Titles
    //~ ---------------
    fetchTitleDetails: async (mediaType, titleId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${titleId}`, {
                params: {
                    api_key: process.env.TMDB_KEY3,
                    language: 'en-US'
                }
            });

            return response.data;
        } catch (e) {
            console.log('error', e)
            return e;
        }
    },
    fetchTitleVideos: async (mediaType, titleId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${titleId}/videos`, {
                params: {
                    api_key: process.env.TMDB_KEY3,
                    language: 'en-US'
                }
            });

            return response.data;
        } catch (e) {
            console.log('error', e)
            return e;
        }
    },
    getTitleCredits: async (titleId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${titleId}/credits`, {
                params: { 
                    api_key: process.env.TMDB_KEY3 
                }
            });

            return response.data;
        } catch (e) {
            console.log('error', e)
            return e;
        }
    },
    //~ ---------------
    //*     Config
    //~ ---------------
    getConfig: async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/configuration', {
                params: {
                    api_key: process.env.TMDB_KEY3
                }
            });

            return response.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }
};

module.exports = tmdb;