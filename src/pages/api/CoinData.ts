// In coinData.ts
import { BitcoinData } from "../interface/Coindata";

export async function fetchBitcoinData(id:string): Promise<BitcoinData | null> {
   
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data: BitcoinData = await response.json();
        console.log("api response: " )
        console.log("id is clicked",id)
        return data;
    } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
        return null;
    }
}
