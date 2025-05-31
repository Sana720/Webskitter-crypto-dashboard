'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '@mui/material/styles'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function OhlcChart({ data }: { data: number[][] }) {
  const theme = useTheme()

  const labels = data.map(d => new Date(d[0]).toLocaleDateString())

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Open',
        data: data.map(d => d[1]),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
      {
        label: 'High',
        data: data.map(d => d[2]),
        backgroundColor: 'rgba(255,99,132,0.6)',
      },
      {
        label: 'Low',
        data: data.map(d => d[3]),
        backgroundColor: 'rgba(54,162,235,0.6)',
      },
      {
        label: 'Close',
        data: data.map(d => d[4]),
        backgroundColor: 'rgba(255,206,86,0.6)',
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

  return <Bar data={chartData} options={options} />
}
