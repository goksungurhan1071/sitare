import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'
import GppMaybeIcon from '@mui/icons-material/GppMaybe'
import FlightIcon from '@mui/icons-material/Flight'
import MemoryIcon from '@mui/icons-material/Memory'
import FlagIcon from '@mui/icons-material/Flag'
import VisibilityIcon from '@mui/icons-material/Visibility'
import HeroVideo from '../components/HeroVideo'
import SectionHeading from '../components/SectionHeading'

const capabilityIcons = {
  rf: SettingsInputAntennaIcon,
  antiDrone: GppMaybeIcon,
  targetAircraft: FlightIcon,
  control: MemoryIcon,
}

export default function Home() {
  const { t } = useTranslation()
  const sectionKeys = ['rf', 'antiDrone', 'targetAircraft', 'control']

  return (
    <Box>
      <HeroVideo />

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <SectionHeading eyebrow={t('nav.about')} title={t('home.aboutTitle')} />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {t('home.aboutBody')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('home.aboutBodySecondary')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <FlagIcon color="primary" fontSize="large" />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {t('home.missionTitle')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('home.missionBody')}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
              <Card sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <VisibilityIcon color="primary" fontSize="large" />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {t('home.visionTitle')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('home.visionBody')}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow={t('nav.whatWeDo')}
            title={t('home.capabilitiesTitle')}
            subtitle={t('home.capabilitiesSubtitle')}
          />
          <Grid container spacing={3}>
            {sectionKeys.map((key) => {
              const Icon = capabilityIcons[key]
              return (
                <Grid key={key} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card sx={{ height: '100%' }}>
                    <CardActionArea
                      component={NavLink}
                      to="/neler-yapiyoruz"
                      sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      <Icon color="primary" fontSize="large" sx={{ mb: 2 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                        {t(`whatWeDo.sections.${key}.title`)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(`whatWeDo.sections.${key}.summary`)}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Card
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(31,209,162,0.12), rgba(91,141,239,0.08))',
          }}
        >
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            {t('home.ctaTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 560, mx: 'auto' }}>
            {t('home.ctaBody')}
          </Typography>
          <Button component={NavLink} to="/iletisim" variant="contained" size="large">
            {t('common.contactUs')}
          </Button>
        </Card>
      </Container>
    </Box>
  )
}
