const BASE_URL = 'http://10.42.124.57:5000';

export const MatchService = {
    getLiveMatches: async () => {
        try {
            const response = await fetch(`${BASE_URL}/matches`);
            const result = await response.json();
            return result.data || [];
        } catch (error) {
            console.error('Error fetching live matches:', error);
            return [];
        }
    },

    getMatchDetails: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/matchinfo/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching match info:', error);
            return null;
        }
    },

    getScorecard: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/scorecard/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching scorecard:', error);
            return null;
        }
    }
};
