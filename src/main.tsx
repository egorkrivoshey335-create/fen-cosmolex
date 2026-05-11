import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SiteAccessGate from './SiteAccessGate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteAccessGate />
  </StrictMode>,
)
