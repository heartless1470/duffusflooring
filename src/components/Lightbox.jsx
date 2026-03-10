import { useEffect, useState } from 'react'

export default function Lightbox() {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState('')

  useEffect(() => {
    function onOpen(e) {
      const s = e.detail && e.detail.src
      if (s) {
        setSrc(s)
        setOpen(true)
      }
    }
    window.addEventListener('open-lightbox', onOpen)
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-lightbox', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  if (!open) return null

  return (
    <div onClick={() => setOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000}}>
      <img src={src} alt="preview" onClick={e => e.stopPropagation()} style={{maxWidth:'95%', maxHeight:'95%', borderRadius:8, boxShadow:'0 10px 40px rgba(0,0,0,0.6)'}} />
    </div>
  )
}
