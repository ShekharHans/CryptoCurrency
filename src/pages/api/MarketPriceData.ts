import axios from 'axios';

interface ChartData {
    options: any;
    series: any;
}

export const fetchData = async (id: string, dataType: string, period: string, color: string): Promise<ChartData> => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${getDays(period)}`);
        const { prices, market_caps, total_volumes } = response.data;

        let titleText, data;
        switch (dataType) {
            case 'Price':
                titleText = 'Market Price (USD)';
                data = prices;
                break;
            case 'Market_Cap':
                titleText = 'Market Cap (USD)';
                data = market_caps;
                break;
            case 'Tot_Vol':
                titleText = 'Market Volume';
                data = total_volumes;
                break;
            default:
                titleText = '';
                data = [];
                break;
        }

        const chartData: ChartData = {
            options: {
                chart: {
                    id: 'area-datetime',
                },
                grid: {
                    show: false,
                },
                title: {
                    text: titleText,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: color,
                    },
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    type: 'datetime',
                },
                fill: {
                    gradient: {
                        enabled: true,
                        opacityFrom: 0.55,
                        opacityTo: 0,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                yaxis: {
                    show: false,
                },
                colors: [color],
                tooltip: {
                    y: {
                        formatter: (value: number) => value.toFixed(2),
                    },
                    theme: 'dark',
                },
                selection: getDays(period),
            },
            series: [
                {
                    name: titleText,
                    data: data.map((item: any) => [item[0], item[1]]), // Format the data to match the expected format
                },
            ],
        };
        return chartData;
    } catch (error) {
        console.error(`Error fetching ${dataType} data:`, error);
        return {
            options: {},
            series: [],
        };
    }
};


const getDays = (period: string) => {
    switch (period) {
        case '1week':
            return 7;
        case '1month':
            return 30;
        case '6months':
            return 180;
        case '1year':
            return 365;
        default:
            return 365; // Default to 1 year
    }
};
