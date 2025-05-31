'use client'

import { Card, CardContent, Typography, Avatar, Box } from '@mui/material'
import Link from 'next/link'

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
}

export default function CoinCard({ coin }: { coin: Coin }) {
  return (
    <Link href={`/coin/${coin.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          height: '100%',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: '0.3s',
          ':hover': { boxShadow: 6 },
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Avatar src={coin.image} alt={coin.name} sx={{ width: 24, height: 24 }} />
            <Typography variant="h6">{coin.name}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              ({coin.symbol.toUpperCase()})
            </Typography>
          </Box>
          <Typography variant="body2">Price: ${coin.current_price.toLocaleString()}</Typography>
          <Typography variant="body2">Market Cap: ${coin.market_cap.toLocaleString()}</Typography>
          <Typography
            variant="body2"
            color={coin.price_change_percentage_24h >= 0 ? 'success.main' : 'error'}
          >
            24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
