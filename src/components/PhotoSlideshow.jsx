import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'

export default function PhotoSlideshow({ images, alt, height, interval = 4500, bgcolor = '#0F1D2E' }) {
  const [index, setIndex] = useState(0)
  const slides = images.map((img) =>
    typeof img === 'string' ? { src: img, fit: 'cover', position: 'center' } : { fit: 'cover', position: 'center', ...img }
  )

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [slides.length, interval])

  return (
    <Box sx={{ position: 'relative', height, overflow: 'hidden', bgcolor }}>
      {slides.map((slide, i) => (
        <Box
          key={slide.src}
          component="img"
          src={slide.src}
          alt={alt}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: slide.fit,
            objectPosition: slide.position,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      ))}
    </Box>
  )
}
