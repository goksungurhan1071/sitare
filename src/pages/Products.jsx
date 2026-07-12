import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FlightIcon from '@mui/icons-material/Flight'
import SectionHeading from '../components/SectionHeading'

function SpecGrid({ specs }) {
  return (
    <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
      {specs.map((spec) => (
        <Grid key={spec.label} size={{ xs: 6, sm: 4 }}>
          <Box
            sx={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
              p: 1.5,
              height: '100%',
            }}
          >
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

function AircraftCard({ productKey }) {
  const { t } = useTranslation()
  const specs = t(`products.${productKey}.specs`, { returnObjects: true })
  const material = t(`products.${productKey}.material`, { defaultValue: '' })

  return (
    <Card sx={{ height: '100%' }}>
      <Box
        sx={{
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(31,209,162,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <FlightIcon sx={{ fontSize: 72, color: 'primary.main', transform: 'rotate(45deg)' }} />
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {t(`products.${productKey}.name`)}
          </Typography>
          <Chip label={t(`products.${productKey}.version`)} size="small" color="primary" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {t(`products.${productKey}.description`)}
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="overline" color="text.secondary">
          {t('common.technicalSpecs')}
        </Typography>
        <SpecGrid specs={specs} />

        {material && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>{t('common.material')}:</strong> {material}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

function ImageProductCard({ productKey, image, alt }) {
  const { t } = useTranslation()
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" image={image} alt={alt} sx={{ height: 220, objectFit: 'cover' }} />
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          {t(`products.${productKey}.name`)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(`products.${productKey}.description`)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function Products() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
      <SectionHeading eyebrow={t('nav.products')} title={t('products.title')} subtitle={t('products.subtitle')} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <AircraftCard productKey="ck0" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <AircraftCard productKey="ck1" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ImageProductCard
            productKey="antiDrone"
            image="/media/anti-drone-interceptor.jpeg"
            alt="Anti-Drone Interceptor Platformu"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ImageProductCard productKey="rfModule" image="/media/rf-board.jpeg" alt="RF Haberleşme Kartı" />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Button href="mailto:info@sitare.com.tr" variant="contained" size="large">
          {t('products.requestQuote')}
        </Button>
      </Box>
    </Container>
  )
}
