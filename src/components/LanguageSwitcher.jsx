import { useTranslation } from 'react-i18next'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

export default function LanguageSwitcher({ size = 'small' }) {
  const { i18n } = useTranslation()

  const handleChange = (_event, value) => {
    if (value) i18n.changeLanguage(value)
  }

  return (
    <ToggleButtonGroup
      value={i18n.resolvedLanguage}
      exclusive
      onChange={handleChange}
      size={size}
      aria-label="dil seçimi"
      color="primary"
    >
      <ToggleButton value="tr" aria-label="Türkçe" sx={{ px: 1.5, fontWeight: 700 }}>
        TR
      </ToggleButton>
      <ToggleButton value="en" aria-label="English" sx={{ px: 1.5, fontWeight: 700 }}>
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
