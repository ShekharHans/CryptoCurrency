import React, { useEffect, useState } from 'react'
import styles from "../../styles/Dashboard.module.css"
import Image from 'next/image';
import { fetchBitcoinData } from '../api/CoinData';
import { BitcoinData } from '../interface/Coindata';
import CoinProps from '../interface/CoinProps';



const Dashboard: React.FC<CoinProps> = ({ selectedCurrencyId ='bitcoin'}) => {
    const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);

    let currencyId = selectedCurrencyId;
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await fetchBitcoinData(currencyId);
                setBitcoinData(data);
                console.log(data)
            }
            catch (error) {
                console.error('Error fetching Bitcoin data:', error);
            }
        }
        fetchData();

    }, [currencyId]);

    return (
        <>

            <div className={styles.container}>
                <div className={styles.coinName}>
                    {bitcoinData && (
                        <Image src={bitcoinData.image?.large} alt={bitcoinData.name || "Bitcoin"} width={50} height={50} />
                    )}
                    <h1 className=' text-2xl font-semibold'>{bitcoinData?.name} ({bitcoinData?.symbol})</h1>
                </div>
                <div className={styles.coinDetails}>
                    <div className="card">
                        <p className={styles.coinTitle}>Market Cap 24Hrs : <br />
                            <span className={styles.coinValue}>
                                {bitcoinData?.market_data?.market_cap_change_percentage_24h || ""}%
                            </span>
                        </p>
                    </div>
                    <div className="card">
                        <p className={styles.coinTitle}>All Time High : <br />
                            <span className={styles.coinValue}>
                                ${bitcoinData?.market_data?.ath.usd || ""}
                            </span>
                        </p>
                    </div>
                    <div className="card">
                        <p className={styles.coinTitle}>All Time Low : <br />
                            <span className={styles.coinValue}>
                                ${bitcoinData?.market_data?.atl.usd || ""}
                            </span>
                        </p>
                    </div>
                    <div className="card">
                        <p className={styles.coinTitle}>Positive Sentiments : <br />
                            <span className={styles.coinValue}>
                                ${bitcoinData?.sentiment_votes_up_percentage || ""}
                            </span>
                        </p>
                    </div>
                    <div className="card">
                        <p className={styles.coinTitle}> High 24Hrs : <br />
                            <span className={styles.coinValue}>
                                ${bitcoinData?.market_data?.high_24h.usd || ""}
                            </span>
                        </p>
                    </div>
                    <div className="card">
                        <p className={styles.coinTitle}> Low 24Hrs : <br />
                            <span className={styles.coinValue}>
                                ${bitcoinData?.market_data?.low_24h.usd || ""}
                            </span>
                        </p>
                    </div>
                </div>

            </div>


        </>

    )
}

export default Dashboard