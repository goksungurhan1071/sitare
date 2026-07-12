import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageSwitcher from './LanguageSwitcher'

const navItems = [
  { key: 'about', to: '/' },
  { key: 'products', to: '/urunler' },
  { key: 'whatWeDo', to: '/neler-yapiyoruz' },
  { key: 'contact', to: '/iletisim' },
]

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#1FD1A2' : '#EAF2F5',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '0.95rem',
    letterSpacing: 0.3,
  })

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(10,20,32,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Box component={NavLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', flexGrow: 1 }}>
          <Box
            component="img"
            src="/media/logo.jpeg"
            alt={t('brand.name')}
            sx={{ height: 40, width: 40, borderRadius: '50%', objectFit: 'cover' }}
          />
          <Box>
            <Typography variant="h6" sx={{ color: '#EAF2F5', fontWeight: 800, letterSpacing: 2, lineHeight: 1.1 }}>
              {t('brand.name')}
            </Typography>
            <Typography variant="caption" sx={{ color: '#9FB3C0', display: { xs: 'none', sm: 'block' }, lineHeight: 1 }}>
              {t('brand.tagline')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          {navItems.map((item) => (
            <Box key={item.key} component={NavLink} to={item.to} style={linkStyle} end={item.to === '/'}>
              {t(`nav.${item.key}`)}
            </Box>
          ))}
          <LanguageSwitcher />
        </Box>

        <IconButton
          color="inherit"
          edge="end"
          onClick={() => setOpen(true)}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, height: '100%', bgcolor: 'background.default', py: 2 }} role="presentation">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pb: 1 }}>
            <Box
              component="img"
              src="/media/logo.jpeg"
              alt={t('brand.name')}
              sx={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'cover' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 2 }}>
              {t('brand.name')}
            </Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.key}
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={t(`nav.${item.key}`)} />
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ px: 2, pt: 2 }}>
            <LanguageSwitcher />
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  )
}
