'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { useTheme } from '@mui/material/styles'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function PriceChart({ data }: { data: number[][] }) {
  const theme = useTheme()

  const chartData = {
    labels: data.map(d => new Date(d[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.map(d => d[1]),
        borderColor: theme.palette.primary.main,
        backgroundColor: 'transparent',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary, 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  }

  return <Line data={chartData} options={options} />
}
