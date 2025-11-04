import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { CartProvider } from './context/CartContext' // 1. Importamos el Provider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Envolvemos la App con el CartProvider */}
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
