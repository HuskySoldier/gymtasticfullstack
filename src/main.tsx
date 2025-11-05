import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes/AppRoutes'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext' 

// 1. Importa el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; 
// 2. Importa nuestro CSS global (asegúrate que la ruta sea 'src/css/index.css')
import './css/index.css'; 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- 2. ENVUELVE */}
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider> {/* <-- 3. ENVUELVE */}
    </BrowserRouter>
  </StrictMode>,
)