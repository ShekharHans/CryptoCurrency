// Currency.ts

interface Currency {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
    image: string;
    currencyId: string;
}

export default Currency;
