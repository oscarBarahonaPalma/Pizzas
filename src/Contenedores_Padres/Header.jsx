import './Estilos_Padres/Header.css'
import { useLocation, NavLink } from 'react-router-dom'
import UserMenu from '../components/UserMenu'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/CartContext'

function Header() {
  const location = useLocation()
  const isPizzas = location.pathname === '/pizzas'
  const isBebidas = location.pathname === '/bebidas'
  const isPostres = location.pathname === '/postres'
  const isPedidos = location.pathname.startsWith('/pedidos')

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { getItemCount } = useContext(CartContext)

  useEffect(() => {
    const userData = localStorage.getItem('googleUser')
    const authenticated = !!userData
    setIsAuthenticated(authenticated)
  }, [])

  const cartItemCount = getItemCount()

  return (
    <div className='Header'>

      
      {/* Títulos eliminados por solicitud: se remueve el bloque central */}
      
      <div className="header-right">
        <div className="header-actions">
          {/* Botón de Contacto */}
          <NavLink to="/contacto" className="contact-button">
            📞 Contacto
          </NavLink>
          
          {/* Carrito con contador por fuera */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <NavLink to="/carrito" className="cart-button" id="cart-target">
              🛒 Carrito
            </NavLink>
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff4444 50%, #ff3333 100%)',
                color: '#ffffff',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '800',
                boxShadow: '0 4px 15px rgba(255,68,68,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                zIndex: 1000,
                border: '2px solid #ffffff',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                animation: 'pulse-glow 2s ease-in-out infinite',
                transform: 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {cartItemCount}
              </span>
            )}
          </div>
          
          {/* Menú de usuario (solo cuando esté autenticado) */}
          {isAuthenticated && <UserMenu />}
        </div>
      </div>
    </div>
  )
}

export default Header
