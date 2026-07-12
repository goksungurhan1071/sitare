import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <Box sx={{ textAlign: align, mb: { xs: 4, md: 6 } }}>
      {eyebrow && (
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', letterSpacing: 2, fontWeight: 700 }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' }, mt: 0.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1.5, maxWidth: 680, mx: align === 'center' ? 'auto' : 0 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
