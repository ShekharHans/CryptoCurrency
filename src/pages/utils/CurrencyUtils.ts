import Currency from '../interface/Currency';

export const filterCurrencies = (currencies: Currency[], searchTerm: string): Currency[] => {
    return currencies.filter(currency =>
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const paginateCurrencies = (currencies: Currency[], currentPage: number, currenciesPerPage: number): Currency[] => {
    const indexOfLastCurrency = currentPage * currenciesPerPage;
    const indexOfFirstCurrency = indexOfLastCurrency - currenciesPerPage;
    return currencies.slice(indexOfFirstCurrency, indexOfLastCurrency);
};

export const handleCurrencyClick = (currencyId: string) => {
    const storedCurrenciesString = localStorage.getItem('selectedCurrencies');
    const storedCurrencies: string[] = storedCurrenciesString ? JSON.parse(storedCurrenciesString) : [];

    const index = storedCurrencies.indexOf(currencyId);

    if (index === -1) {
        // If the clicked currency is not already selected, remove previous IDs and add the new one
        localStorage.setItem('selectedCurrencies', JSON.stringify([currencyId]));
    } else if (index > -1 && storedCurrencies.length > 1) {
        // If the clicked currency is already selected and there are more than one selected currencies, remove previous IDs and add the new one
        storedCurrencies.splice(index, 1);
        localStorage.setItem('selectedCurrencies', JSON.stringify([currencyId]));
    }
};
