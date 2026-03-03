import axios from 'axios';
import matchesMock from '../mockData/matches.json';
import seriesMock from '../mockData/series.json';
import newsMock from '../mockData/news.json';

// Use a baseURL that can be easily updated
const API_URL = 'https://api.cricores.com/v1'; // Placeholder URL

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Flag to toggle between mock and real API
const USE_MOCK = true;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getMatches = async () => {
    if (USE_MOCK) {
        await delay(1000); // Simulate network lag
        return matchesMock;
    }
    const response = await api.get('/matches');
    return response.data;
};

export const getSeries = async () => {
    if (USE_MOCK) {
        await delay(1000);
        return seriesMock;
    }
    const response = await api.get('/series');
    return response.data;
};

export const getNews = async () => {
    if (USE_MOCK) {
        await delay(1000);
        return newsMock;
    }
    const response = await api.get('/news');
    return response.data;
};

export default api;
