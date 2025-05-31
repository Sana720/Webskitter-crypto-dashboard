'use client'

import { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import ThemeToggle from './ThemeToggle'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Crypto Dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <ThemeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
