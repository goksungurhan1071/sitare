import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HeroVideo() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '80vh', md: '92vh' },
        minHeight: 480,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.5) saturate(1.05)',
        }}
      >
        <source src="/media/hero-video.mp4" type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,20,32,0.35) 0%, rgba(10,20,32,0.55) 55%, #0A1420 100%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={3} sx={{ maxWidth: 780 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.4rem' },
              lineHeight: 1.15,
              color: '#fff',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
            }}
          >
            {t('home.heroTitle')}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, maxWidth: 620 }}
          >
            {t('home.heroSubtitle')}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button component={NavLink} to="/urunler" variant="contained" size="large" color="primary">
              {t('common.exploreProducts')}
            </Button>
            <Button
              component={NavLink}
              to="/iletisim"
              variant="outlined"
              size="large"
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: '#fff' } }}
            >
              {t('common.contactUs')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
