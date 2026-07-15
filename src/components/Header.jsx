import { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
import Popper from '@mui/material/Popper'
import Paper from '@mui/material/Paper'
import Grow from '@mui/material/Grow'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageSwitcher from './LanguageSwitcher'

const navItems = [
  { key: 'about', to: '/' },
  { key: 'whatWeDo', to: '/neler-yapiyoruz' },
  { key: 'contact', to: '/iletisim' },
]

const whatWeDoSections = ['rf', 'antiDrone', 'targetAircraft', 'control']

export default function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false)
  const whatWeDoRef = useRef(null)

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#1FD1A2' : '#EAF2F5',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '0.95rem',
    letterSpacing: 0.3,
  })

  const goToWhatWeDoSection = (key) => {
    setWhatWeDoOpen(false)
    navigate(`/neler-yapiyoruz?section=${key}`)
  }

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
          <Typography
            sx={{
              color: '#EAF2F5',
              fontWeight: 800,
              letterSpacing: 0.4,
              lineHeight: 1.15,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              maxWidth: { xs: 170, sm: 'none' },
            }}
          >
            {t('brand.name')}
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          {navItems.map((item) =>
            item.key === 'whatWeDo' ? (
              <Box
                key={item.key}
                ref={whatWeDoRef}
                sx={{ position: 'relative' }}
                onMouseEnter={() => setWhatWeDoOpen(true)}
                onMouseLeave={() => setWhatWeDoOpen(false)}
              >
                <Box component={NavLink} to={item.to} style={linkStyle}>
                  {t(`nav.${item.key}`)}
                </Box>
                <Popper
                  open={whatWeDoOpen}
                  anchorEl={whatWeDoRef.current}
                  disablePortal
                  placement="bottom-start"
                  transition
                  sx={{ zIndex: 1301 }}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps} timeout={150}>
                      <Paper
                        sx={{
                          mt: 1,
                          minWidth: 220,
                          bgcolor: '#0F1E2E',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <MenuList dense>
                          {whatWeDoSections.map((key) => (
                            <MenuItem key={key} onClick={() => goToWhatWeDoSection(key)}>
                              {t(`whatWeDo.sections.${key}.title`)}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            ) : (
              <Box key={item.key} component={NavLink} to={item.to} style={linkStyle} end={item.to === '/'}>
                {t(`nav.${item.key}`)}
              </Box>
            )
          )}
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
            <Typography sx={{ fontWeight: 800, letterSpacing: 0.4, fontSize: '0.9rem', lineHeight: 1.2 }}>
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
