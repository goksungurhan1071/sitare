import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SendIcon from '@mui/icons-material/Send'
import SectionHeading from '../components/SectionHeading'

const CONTACT_EMAIL = 'bilgi@sitaresavunma.com'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(form.subject || `${t('brand.name')} - ${t('contact.title')}`)
    const body = encodeURIComponent(
      `${t('contact.name')}: ${form.name}\n${t('contact.email')}: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const infoItems = [
    { icon: EmailIcon, label: t('contact.emailLabel'), value: t('contact.emailValue'), href: `mailto:${t('contact.emailValue')}` },
    { icon: PhoneIcon, label: t('contact.phoneLabel'), value: t('contact.phoneValue'), href: null },
    { icon: LocationOnIcon, label: t('contact.addressLabel'), value: t('contact.addressValue'), href: null },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
      <SectionHeading eyebrow={t('nav.contact')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            {infoItems.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.label} sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Icon color="primary" fontSize="large" />
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        {item.label}
                      </Typography>
                      {item.href ? (
                        <Typography
                          variant="subtitle1"
                          component="a"
                          href={item.href}
                          sx={{ display: 'block', color: 'text.primary', textDecoration: 'none', fontWeight: 600 }}
                        >
                          {item.value}
                        </Typography>
                      ) : (
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.value}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Card>
              )
            })}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ p: { xs: 3, md: 4 } }} component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              {t('contact.formTitle')}
            </Typography>
            <Stack spacing={2.5}>
              <TextField
                label={t('contact.name')}
                value={form.name}
                onChange={handleChange('name')}
                required
                fullWidth
              />
              <TextField
                label={t('contact.email')}
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
                fullWidth
              />
              <TextField
                label={t('contact.subject')}
                value={form.subject}
                onChange={handleChange('subject')}
                fullWidth
              />
              <TextField
                label={t('contact.message')}
                value={form.message}
                onChange={handleChange('message')}
                required
                fullWidth
                multiline
                minRows={5}
              />
              <Button type="submit" variant="contained" size="large" endIcon={<SendIcon />} sx={{ alignSelf: 'flex-start' }}>
                {t('contact.send')}
              </Button>
              <Typography variant="caption" color="text.secondary">
                {t('contact.sendHint')}
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
