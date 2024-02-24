export interface BitcoinData {
    name: string;
    symbol: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_data: {
        market_cap_change_percentage_24h: number;
        ath: {
            usd: number;
        }
        atl: {
            usd: number;
        }
        low_24h: {
            usd: number;
        }
        high_24h: {
            usd: number;
        }
    };
    sentiment_votes_up_percentage: number;
}