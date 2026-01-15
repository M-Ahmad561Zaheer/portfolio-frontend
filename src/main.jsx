import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Ise import karein
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. App ko BrowserRouter ke andar wrap karein */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)