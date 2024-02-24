import React, { useState, useEffect } from 'react';
import { fetchCurrencyData } from './api/Currency';

import styles from '../styles/CurrencyList.module.css';
import Currency from './interface/Currency';
import Dashboard from './components/Dashboard';
import { filterCurrencies, paginateCurrencies } from './utils/CurrencyUtils';
import ChartComponent from './components/Chart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';

const CurrencyList: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currenciesPerPage] = useState(10);
  const [clickedCurrencyId, setClickedCurrencyId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data only once on initial render
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchCurrencyData();
      setCurrencies(data);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  const handleCurrencyClick = (currency: Currency) => {
    console.log('Currency clicked:', currency);
    const id = currency.id ?? getCurrencyIdFromJson(currency);
    setClickedCurrencyId(id);

    // You can choose to fetch data here if needed
    // fetchDataOnClick(); 
    localStorage.setItem('clickedCurrencyId', id);
  };

  const getCurrencyIdFromJson = (currency: Currency) => {
    try {
      const jsonCurrencyData = require('../../public/currency.json');
      const matchingCurrency = jsonCurrencyData.find((jsonCurrency: any) => jsonCurrency.symbol === currency.symbol);
      return matchingCurrency ? matchingCurrency.id : null;
    } catch (error) {
      console.error('Error fetching data from currency.json:', error);
      return null;
    }
  };

  const fetchDataOnClick = async () => {
    try {
      const data = await fetchCurrencyData();
      setCurrencies(data);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  const filteredCurrencies = filterCurrencies(currencies, searchTerm);
  const currentCurrencies = paginateCurrencies(filteredCurrencies, currentPage, currenciesPerPage);

  return (
    <div className='flex flex-col ml-[250px] w-full'>
      <div className={styles.currencyList}>
        <input
          type="text"
          placeholder="Search currency..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Change (24h)</th>
              <th>Volume</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {/* Currency rows */}
            {currentCurrencies.map(currency => (
              <tr
                key={currency.id}
                className={styles.currencyRow}
                onClick={() => handleCurrencyClick(currency)}
              >
                <td><Image src={currency.image} alt={currency.name} className={styles.currencyIcon} width={24} height={24}/></td>
                <td>{currency.name}</td>
                <td>{currency.symbol}</td>
                <td>${currency.current_price}</td>
                <td className={currency.price_change_percentage_24h > 0 ? styles.positiveChange : styles.negativeChange}>
                  {currency.price_change_percentage_24h}%
                </td>
                <td>${currency.total_volume}</td>
                <td>${currency.market_cap}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className={styles.pagination}>
          <button onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
            <ChevronLeftIcon />
          </button>
          <button onClick={() => currentPage < Math.ceil(filteredCurrencies.length / currenciesPerPage) && setCurrentPage(currentPage + 1)}>
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      {clickedCurrencyId !== null && <Dashboard selectedCurrencyId={clickedCurrencyId} />}
      {clickedCurrencyId !== null && <ChartComponent selectedCurrencyId={clickedCurrencyId} />}
    </div>
  );
};

export default CurrencyList;
