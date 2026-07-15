import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'
import GppMaybeIcon from '@mui/icons-material/GppMaybe'
import FlightIcon from '@mui/icons-material/Flight'
import MemoryIcon from '@mui/icons-material/Memory'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import SectionHeading from '../components/SectionHeading'

const sections = [
  { key: 'rf', icon: SettingsInputAntennaIcon, image: '/media/antenna-design.jpeg' },
  { key: 'antiDrone', icon: GppMaybeIcon, image: '/media/humbara-studio-photo.png' },
  { key: 'targetAircraft', icon: FlightIcon },
  { key: 'control', icon: MemoryIcon },
]

const sectionExtras = {
  rf: {
    products: [{ productKey: 'rtkModule', images: ['/media/rtk-board.jpeg'] }],
  },
  antiDrone: {
    products: [
      { productKey: 'antiDrone', images: ['/media/anti-drone-interceptor.jpeg'], mediaHeight: 320 },
      {
        productKey: 'humbara',
        images: ['/media/humbara-ground-station.png'],
        specs: true,
        mediaHeight: 320,
      },
    ],
  },
  targetAircraft: {
    products: [
      { productKey: 'ck0', images: ['/media/ck0-render-iso.jpg', '/media/ck0-field-photo.jpg'], specs: true, material: true },
      { productKey: 'ck1', images: ['/media/ck1-render.jpg', '/media/ck1-studio-photo.jpg'], specs: true },
    ],
  },
  control: {
    gallery: [
      { src: '/media/control-guidance-nav-architecture.png', labelKey: 'architecture' },
      { src: '/media/gcs-interface-map.png', labelKey: 'interfaceMap' },
      { src: '/media/gcs-interface-mission.png', labelKey: 'interfaceMission' },
    ],
  },
}

function ZoomableImage({ src, alt, height, objectFit = 'contain', bgcolor = '#0F1D2E', onOpen, sx }) {
  return (
    <Box
      onClick={() => onOpen({ src, alt })}
      sx={{
        position: 'relative',
        height,
        overflow: 'hidden',
        cursor: 'zoom-in',
        bgcolor,
        '&:hover .zoomable-img': { transform: 'scale(1.08)' },
        '&:hover .zoomable-icon': { opacity: 1 },
        ...sx,
      }}
    >
      <Box
        component="img"
        className="zoomable-img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
          transition: 'transform 0.4s ease',
        }}
      />
      <Box
        className="zoomable-icon"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(10,20,32,0.3)',
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <ZoomInIcon fontSize="large" />
      </Box>
    </Box>
  )
}

function ProductMedia({ images, alt, onOpen, height = 240 }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, height }}>
      {images.map((src) => (
        <ZoomableImage key={src} src={src} alt={alt} height="100%" onOpen={onOpen} sx={{ flex: 1, width: 0 }} />
      ))}
    </Box>
  )
}

function SpecGrid({ specs }) {
  return (
    <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
      {specs.map((spec) => (
        <Grid key={spec.label} size={{ xs: 6, sm: 4 }}>
          <Box sx={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, p: 1.5, height: '100%' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.3 }}>
              {spec.label}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {spec.value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

function ProductCard({ productKey, images, specs, material, onOpen, mediaHeight }) {
  const { t } = useTranslation()
  const specList = specs ? t(`products.${productKey}.specs`, { returnObjects: true, defaultValue: [] }) : []
  const materialValue = material ? t(`products.${productKey}.material`, { defaultValue: '' }) : ''
  const version = t(`products.${productKey}.version`, { defaultValue: '' })
  const name = t(`products.${productKey}.name`)

  return (
    <Card sx={{ height: '100%' }}>
      <ProductMedia images={images} alt={name} onOpen={onOpen} height={mediaHeight} />
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          {version && <Chip label={version} size="small" color="primary" variant="outlined" />}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {t(`products.${productKey}.description`)}
        </Typography>

        {specList.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="overline" color="text.secondary">
              {t('common.technicalSpecs')}
            </Typography>
            <SpecGrid specs={specList} />
          </>
        )}

        {materialValue && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>{t('common.material')}:</strong> {materialValue}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default function WhatWeDo() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState(() => {
    const idx = sections.findIndex((s) => s.key === searchParams.get('section'))
    return idx === -1 ? 0 : idx
  })
  const active = sections[tab]
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const idx = sections.findIndex((s) => s.key === searchParams.get('section'))
    if (idx !== -1) setTab(idx)
  }, [searchParams])

  const Icon = active.icon
  const bullets = t(`whatWeDo.sections.${active.key}.bullets`, { returnObjects: true, defaultValue: [] })
  const extras = sectionExtras[active.key]

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

      <Grid container spacing={5} alignItems="center" sx={{ mb: extras ? 6 : 0 }}>
        <Grid size={{ xs: 12, md: active.image ? 6 : 12 }}>
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
        </Grid>

        {active.image && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <ZoomableImage
                src={active.image}
                alt={t(`whatWeDo.sections.${active.key}.title`)}
                height={{ xs: 260, md: 380 }}
                onOpen={setLightbox}
              />
            </Card>
          </Grid>
        )}
      </Grid>

      {extras?.gallery && (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {extras.gallery.map((item) => (
            <Grid key={item.src} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <ZoomableImage
                  src={item.src}
                  alt={t(`whatWeDo.sections.control.gallery.${item.labelKey}`)}
                  height={260}
                  objectFit="contain"
                  bgcolor="#fff"
                  onOpen={setLightbox}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {t(`whatWeDo.sections.control.gallery.${item.labelKey}`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {extras?.products && (
        <Grid container spacing={4}>
          {extras.products.map((product) => (
            <Grid key={product.productKey} size={{ xs: 12, md: 6 }}>
              <ProductCard {...product} onOpen={setLightbox} />
            </Grid>
          ))}
        </Grid>
      )}

      {extras?.products && (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button href="mailto:bilgi@sitaresavunma.com" variant="contained" size="large">
            {t('products.requestQuote')}
          </Button>
        </Box>
      )}

      <Dialog
        open={Boolean(lightbox)}
        onClose={() => setLightbox(null)}
        maxWidth="lg"
        fullWidth
        slotProps={{ paper: { sx: { bgcolor: '#0A1420', boxShadow: 'none', overflow: 'visible' } } }}
      >
        <IconButton
          onClick={() => setLightbox(null)}
          aria-label={t('common.close')}
          sx={{
            position: 'absolute',
            top: -18,
            right: -18,
            bgcolor: 'primary.main',
            color: '#06110D',
            '&:hover': { bgcolor: 'primary.main', opacity: 0.9 },
          }}
        >
          <CloseIcon />
        </IconButton>
        {lightbox && (
          <Box
            component="img"
            src={lightbox.src}
            alt={lightbox.alt}
            sx={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block', bgcolor: '#fff' }}
          />
        )}
      </Dialog>
    </Container>
  )
}
