import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes/AppRoutes'
import { CartProvider } from './context/CartContext'

// --- ¡ESTAS LÍNEAS SON LA CLAVE! ---
// 1. Importa el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; 
// 2. Importa nuestro CSS global (asegúrate que la ruta sea 'src/css/index.css')
import './css/index.css'; 
// --- FIN DE LA SECCIÓN CLAVE ---

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)