import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'

export default function PhotoSlideshow({ images, alt, height, interval = 4500 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    <Box sx={{ position: 'relative', height, overflow: 'hidden' }}>
      {images.map((src, i) => (
        <Box
          key={src}
          component="img"
          src={src}
          alt={alt}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      ))}
    </Box>
  )
}
