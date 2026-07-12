import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

const navItems = [
  { key: 'about', to: '/' },
  { key: 'products', to: '/urunler' },
  { key: 'whatWeDo', to: '/neler-yapiyoruz' },
  { key: 'contact', to: '/iletisim' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ bgcolor: '#070E17', borderTop: '1px solid rgba(255,255,255,0.08)', mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={3}
        >
          <Box sx={{ maxWidth: 420 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
              <Box
                component="img"
                src="/media/logo.jpeg"
                alt={t('brand.name')}
                sx={{ height: 32, width: 32, borderRadius: '50%', objectFit: 'cover' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 2 }}>
                {t('brand.name')}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {t('footer.description')}
            </Typography>
          </Box>

          <Stack direction="row" spacing={3} flexWrap="wrap">
            {navItems.map((item) => (
              <Typography
                key={item.key}
                component={NavLink}
                to={item.to}
                variant="body2"
                sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {t(`nav.${item.key}`)}
              </Typography>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="caption" color="text.secondary">
          © {year} {t('contact.companyName')}. {t('footer.rights')}
        </Typography>
      </Container>
    </Box>
  )
}
