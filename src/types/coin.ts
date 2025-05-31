// Coin used in /dashboard (coin list)
export interface MarketCoin {
    id: string
    name: string
    symbol: string
    image: string
    current_price: number
    market_cap: number
    price_change_percentage_24h: number
    circulating_supply: number
  }
  
  // Coin used in /coin/[id] (coin detail)
  export interface CoinDetail {
    id: string
    name: string
    symbol: string
    image: {
      thumb: string
      small: string
      large: string
    }
    description: {
      en: string
    }
    market_data: {
      current_price: {
        usd: number
      }
      market_cap: {
        usd: number
      }
      circulating_supply: number
    }
  }
  