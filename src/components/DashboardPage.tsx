'use client'

import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { fetchMarketCoins } from '@/lib/queries'
import CoinCard from './CoinCard'
import { MarketCoin } from '@/types/coin'

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('market_cap')

  const { data, isLoading, error } = useQuery<MarketCoin[]>({
    queryKey: ['coins'],
    queryFn: fetchMarketCoins,
    enabled: isLoaded && isSignedIn,
    refetchOnWindowFocus: false,
  })

  if (!isLoaded) {
    return (
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!isSignedIn) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please log in to view your dashboard.
        </Typography>
        <Button variant="contained" href="/sign-in">
          Sign In
        </Button>
      </Container>
    )
  }

  const filteredCoins = data?.filter((coin: MarketCoin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const sortedCoins = filteredCoins?.slice().sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.current_price - a.current_price
      case 'change':
        return b.price_change_percentage_24h - a.price_change_percentage_24h
      default:
        return b.market_cap - a.market_cap
    }
  })

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crypto Dashboard
      </Typography>

      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2} mb={4}>
        <TextField
          label="Search Coins"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="market_cap">Market Cap</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="change">24h % Change</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error loading coins.</Typography>
      ) : (
        <Grid container spacing={3}>
          {sortedCoins?.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </Grid>
      )}
    </Container>
  )
}
