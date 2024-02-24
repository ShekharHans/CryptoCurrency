import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchData } from '../api/MarketPriceData';
import styles from "../../styles/MarketPrice.module.css";
import CoinProps from '../interface/CoinProps';

// Load ApexCharts dynamically to avoid server-side rendering issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartComponent: React.FC<CoinProps> = ({ selectedCurrencyId = 'bitcoin' }) => {
  const [priceData, setPriceData] = useState<any>({});
  const [marketCapData, setMarketCapData] = useState<any>({});
  const [totalVolumeData, setTotalVolumeData] = useState<any>({});
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1year');

  let currencyId = selectedCurrencyId;
  useEffect(() => {
    fetchData(currencyId, 'Price', selectedPeriod, "#0487f2").then(data => setPriceData(data));
    fetchData(currencyId, 'Market_Cap', selectedPeriod, '#00ff00').then(data => setMarketCapData(data));
    fetchData(currencyId, 'Tot_Vol', selectedPeriod, '#ffff00').then(data => setTotalVolumeData(data));

  }, [selectedPeriod,currencyId]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartBtnSection}>
        <button className={styles.chartBtn} onClick={() => setSelectedPeriod('1week')}>1 Week</button>
        <button className={styles.chartBtn} onClick={() => setSelectedPeriod('1month')}>1 Month</button>
        <button className={styles.chartBtn} onClick={() => setSelectedPeriod('6months')}>6 Months</button>
        <button className={styles.chartBtn} onClick={() => setSelectedPeriod('1year')}>1 Year</button>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.section}>
          <div className={`${styles.chart} ${styles.leftSection}`}>
            {priceData.options && priceData.series && (
              <ReactApexChart options={priceData.options} series={priceData.series} type="area" height={400} />
            )}
          </div>
          <div className={styles.rightSection}>
            <div className={styles.chart}>
              {marketCapData.options && marketCapData.series && (
                <ReactApexChart options={marketCapData.options} series={marketCapData.series} type="area" height={400} />
              )}
            </div>
            <div className={styles.chart}>
              {totalVolumeData.options && totalVolumeData.series && (
                <ReactApexChart options={totalVolumeData.options} series={totalVolumeData.series} type="area" height={400} />
              )}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ChartComponent;
