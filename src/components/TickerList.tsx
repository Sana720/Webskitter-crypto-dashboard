'use client'

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TableContainer,
} from '@mui/material'

export default function TickerList({ tickers }: { tickers: any[] }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Top Exchanges & Pairs
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Exchange</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickers.slice(0, 10).map((ticker, index) => (
            <TableRow key={index}>
              <TableCell>{ticker.market.name}</TableCell>
              <TableCell>{ticker.base}/{ticker.target}</TableCell>
              <TableCell>${ticker.last.toFixed(2)}</TableCell>
              <TableCell>${ticker.volume.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
