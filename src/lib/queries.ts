import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMarketCoins = async () => {
  const res = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
      sparkline: false,
    },
  })
  return res.data
}

export const fetchCoinDetails = async (id: string) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    return res.data
  }
  

  export const fetchCoinTickers = async (id: string) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/tickers`)
    return res.data.tickers
  }
  

  export const fetchCoinMarketChart = async (id: string) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: 7,
      },
    })
    return res.data.prices
  }
  

  export const fetchCoinOHLC = async (id: string) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc`, {
      params: {
        vs_currency: 'usd',
        days: 7,
      },
    })
    return res.data
  }
  