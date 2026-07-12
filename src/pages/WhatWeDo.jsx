import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'
import GppMaybeIcon from '@mui/icons-material/GppMaybe'
import FlightIcon from '@mui/icons-material/Flight'
import MemoryIcon from '@mui/icons-material/Memory'
import SectionHeading from '../components/SectionHeading'

const sections = [
  { key: 'rf', icon: SettingsInputAntennaIcon, image: '/media/antenna-design.jpeg' },
  { key: 'antiDrone', icon: GppMaybeIcon, image: '/media/anti-drone-interceptor.jpeg' },
  { key: 'targetAircraft', icon: FlightIcon, image: '/media/target-aircraft-field-test.jpeg' },
  { key: 'control', icon: MemoryIcon, image: '/media/rtk-board.jpeg' },
]

export default function WhatWeDo() {
  const { t } = useTranslation()
  const [tab, setTab] = useState(0)
  const active = sections[tab]
  const Icon = active.icon
  const bullets = t(`whatWeDo.sections.${active.key}.bullets`, { returnObjects: true, defaultValue: [] })

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
      <SectionHeading eyebrow={t('nav.whatWeDo')} title={t('whatWeDo.title')} subtitle={t('whatWeDo.subtitle')} />

      <Tabs
        value={tab}
        onChange={(_e, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {sections.map((section) => (
          <Tab key={section.key} label={t(`whatWeDo.sections.${section.key}.title`)} />
        ))}
      </Tabs>

      <Grid container spacing={5} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Icon color="primary" fontSize="large" />
            <Typography variant="h4">{t(`whatWeDo.sections.${active.key}.title`)}</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t(`whatWeDo.sections.${active.key}.body`)}
          </Typography>

          {bullets.length > 0 && (
            <List dense>
              {bullets.map((item) => (
                <ListItem key={item} disableGutters>
                  <ListItemIcon sx={{ minWidth: 34 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}

          {(active.key === 'targetAircraft' || active.key === 'antiDrone') && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t(`whatWeDo.sections.${active.key}.viewProducts`)}
              </Typography>
              <Button component={NavLink} to="/urunler" variant="contained">
                {t('nav.products')}
              </Button>
            </Box>
          )}
        </Grid>

        {active.image && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardMedia
                component="img"
                image={active.image}
                alt={t(`whatWeDo.sections.${active.key}.title`)}
                sx={{ height: { xs: 260, md: 380 }, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
