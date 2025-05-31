'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchCoinDetails,
  fetchCoinMarketChart,
  fetchCoinOHLC,
  fetchCoinTickers,
} from '@/lib/queries'
import { useParams, useRouter } from 'next/navigation'
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material'
import TickerList from '@/components/TickerList'
import PriceChart from '@/components/PriceChart'
import OhlcChart from '@/components/OhlcChart'

export default function CoinDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const coinId = id as string

  const { data, isLoading, error } = useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoinDetails(id as string),
    enabled: !!id,
   
  })

  const { data: tickers, isLoading: loadingTickers } = useQuery({
    queryKey: ['tickers', id],
    queryFn: () => fetchCoinTickers(id as string),
    enabled: !!id,
   
  })

  const { data: chartData, isLoading: loadingChart } = useQuery({
    queryKey: ['coinChart', id],
    queryFn: () => fetchCoinMarketChart(id as string),
    enabled: !!id,
  
  })

  const { data: ohlcData, isLoading: loadingOhlc } = useQuery({
    queryKey: ['ohlc', id],
    queryFn: () => fetchCoinOHLC(id as string),
    enabled: !!id,
    
  })

  if (!coinId || isLoading || loadingChart || loadingOhlc || loadingTickers) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error || !data) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">Error loading coin data.</Typography>
        <Button variant="outlined" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => router.push('/dashboard')} sx={{ mb: 3 }}>
        ← Back to Dashboard
      </Button>

      <Typography variant="h4" gutterBottom>
        {data.name} ({data.symbol.toUpperCase()})
      </Typography>

      <img src={data.image.large} alt={data.name} width={64} height={64} />

      <Typography sx={{ mt: 2 }}>
        {data.description.en?.split('. ')[0] || 'No description available.'}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Current Price: ${data.market_data.current_price.usd}
      </Typography>
      <Typography>
        Market Cap: ${data.market_data.market_cap.usd.toLocaleString()}
      </Typography>
      <Typography>
        Circulating Supply: {data.market_data.circulating_supply.toLocaleString()}
      </Typography>

      {!loadingChart && chartData && (
        <Box mt={5}>
          <Typography variant="h6" gutterBottom>7-Day Price History</Typography>
          <PriceChart data={chartData} />
        </Box>
      )}

      {!loadingOhlc && ohlcData && (
        <Box mt={5}>
          <Typography variant="h6" gutterBottom>OHLC Chart (7 Days)</Typography>
          <OhlcChart data={ohlcData} />
        </Box>
      )}

      {!loadingTickers && tickers && (
        <Box mt={5}>
          <TickerList tickers={tickers} />
        </Box>
      )}
    </Container>
  )
}
