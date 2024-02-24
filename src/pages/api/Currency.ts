// api.ts

import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCurrencyData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
                locale: 'en'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching currency data from API:', error);
        console.log('Attempting to fetch data from currency.json...');
        try {
            const localData = require('../../../public/currency.json');
            console.log('Data fetched from currency.json successfully:', localData);
            return localData;
        } catch (err) {
            console.error('Error fetching data from currency.json:', err);
            throw new Error('Failed to fetch currency data from both API and local file.');
        }
    }
};
