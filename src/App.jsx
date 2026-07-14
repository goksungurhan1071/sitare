import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

const WhatWeDo = lazy(() => import('./pages/WhatWeDo'))
const Contact = lazy(() => import('./pages/Contact'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <CssBaseline />
      <ScrollToTop />
      <Header />
      <Box component="main">
        <Suspense fallback={<Box sx={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/neler-yapiyoruz" element={<WhatWeDo />} />
            <Route path="/iletisim" element={<Contact />} />
          </Routes>
        </Suspense>
      </Box>
      <Footer />
    </>
  )
}

export default App
