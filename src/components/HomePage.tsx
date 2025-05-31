'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import {
  CircularProgress,
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material'
import Link from 'next/link'

export default function HomePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      router.push('/dashboard')
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!user) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Crypto Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Please sign in to access live cryptocurrency data and insights.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Link href="/sign-in"><Button variant="contained">Sign In</Button></Link>
          <Link href="/sign-up"><Button variant="outlined">Sign Up</Button></Link>
        </Box>
      </Container>
    )
  }

  return null
}
