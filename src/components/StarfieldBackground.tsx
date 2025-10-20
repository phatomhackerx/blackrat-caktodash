import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    
    // Create stars
    const starCount = 150
    const stars: Star[] = []
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3
      })
    }
    
    // Animation loop
    let animationFrameId: number
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        // Move star down
        star.y += star.speed
        
        // Reset star to top when it goes off screen
        if (star.y > canvas.height) {
          star.y = -10
          star.x = Math.random() * canvas.width
        }
        
        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
        
        // Add a subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.1})`
          ctx.fill()
        }
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Handle window resize
    window.addEventListener('resize', setCanvasSize)
    
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
