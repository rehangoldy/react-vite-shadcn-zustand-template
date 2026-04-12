import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import DynamicRoute from './routes/route'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "undefined" ? import.meta.env.BASE_URL : "/"}>
      <DynamicRoute />
    </BrowserRouter>
  </StrictMode>
)
