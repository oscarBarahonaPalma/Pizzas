import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Estilos_Padres/MenuDerecho.css';

// Iconos minimalistas y profesionales (SVG, trazo actual)
const IconPizza = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.2 8.5C8.9 6 15.1 6 20.8 8.5L12 21 3.2 8.5Z"/>
    <path d="M5.1 9.3C9.5 7.6 14.5 7.6 18.9 9.3" opacity="0.5"/>
    <circle cx="9.2" cy="12.1" r="1.1"/>
    <circle cx="14.8" cy="13.2" r="1.1"/>
    <circle cx="12.1" cy="10.2" r="0.9"/>
  </svg>
);

const IconDrink = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16"/>
    <path d="M7 4l1.2 12.5a4 4 0 0 0 3.98 3.5h-0.36a4 4 0 0 0 3.98-3.5L17 4"/>
    <path d="M10 4l6-2"/>
    <path d="M8 8h8" opacity="0.6"/>
  </svg>
);

const IconTag = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12l7.5-7.5a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v7.1a2 2 0 0 1-.6 1.4L12 22 3 12Z"/>
    <circle cx="16.2" cy="7.8" r="1.4"/>
  </svg>
);

const IconOrders = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 7.5h15v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11Z"/>
    <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5"/>
    <path d="M8 12l2.2 2.2L16 8.5"/>
  </svg>
);

const MenuDerecho = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('pizzas');
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const sectionFromPath = location.pathname.split('/')[1] || 'pizzas';
    setActiveSection(sectionFromPath);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      id: 'pizzas',
      label: 'Pizzas',
      iconSvg: <IconPizza />,
      description: 'Nuestras especialidades',
      color: '#ff6b6b'
    },
    {
      id: 'bebidas',
      label: 'Bebidas',
      iconSvg: <IconDrink />,
      description: 'Refrescos y más',
      color: '#4ecdc4'
    },
    {
      id: 'postres',
      label: 'Promociones y paquetes',
      iconSvg: <IconTag />,
      description: 'Promos y combos',
      color: '#ffe66d'
    },
    {
      id: 'pedidos',
      label: 'Mis Pedidos',
      iconSvg: <IconOrders />,
      description: 'Historial y estado',
      color: '#a8e6cf'
    }
  ];

  return (
    <>
      {/* Botón hamburguesa mejorado */}
      <button 
        className={`hamburger-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="hamburger-inner">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </button>

      {/* Menú principal */}
      <div className={`menu-derecho ${isOpen ? 'open' : 'closed'}`}>
        {/* Header del menú */}
        <div className="menu-header">
          {isMobile && (
            <button className="close-btn" onClick={toggleMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        
        {/* Navegación principal */}
        <nav className="menu-nav">
          <div className="nav-section">
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <NavLink 
                    to={`/${item.id}`} 
                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      isMobile && setIsOpen(false);
                    }}
                    style={{ '--accent-color': item.color }}
                  >
                    <div className="menu-item-content">
                      <div className="menu-icon-wrapper" style={{ color: 'var(--accent-color)' }}>
                        {item.iconSvg}
                      </div>
                      <div className="menu-text-content">
                        <span className="menu-label">{item.label}</span>
                        <span className="menu-description">{item.description}</span>
                      </div>
                    </div>
                    <div className="menu-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  </NavLink>
                  {item.id === 'pedidos' && (
                    <div className="submenu open">
                      {/* QUITAMOS LOS BOTONES DUPLICADOS */}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        {/* Footer del menú */}
        <div className="menu-footer">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon" aria-hidden="true">
                {/* Reloj futurista y elegante */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffe66d' }}>
                  {/* Anillo exterior */}
                  <circle cx="12" cy="12" r="8.2" />
                  {/* Segmentos de anillo para look futurista */}
                  <path d="M5.3 12a6.7 6.7 0 0 1 3-5.6" opacity="0.55"/>
                  <path d="M18.7 12a6.7 6.7 0 0 1-3 5.6" opacity="0.55"/>
                  {/* Manecillas estilizadas */}
                  <path d="M12 12 L12 8.4"/>
                  <path d="M12 12 L15.8 11.2"/>
                  <circle cx="15.8" cy="11.2" r="0.8" />
                </svg>
              </div>
              <div className="info-text">
                <span className="info-label">Horario</span>
                <span className="info-value">12:00 - 23:00</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 4.2 2 2 0 0 1 4.11 2h2a2 2 0 0 1 2 1.72c.12.86.32 1.69.6 2.48a2 2 0 0 1-.45 2.11l-1 1a16 16 0 0 0 6 6l1-1a2 2 0 0 1 2.11-.45c.79.28 1.62.48 2.48.6A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="info-text">
                <span className="info-label">Contacto</span>
                <span className="info-value">(555) 123-4567</span>
              </div>
            </div>
          </div>
          
          <div className="social-links">
            <a href="https://wa.me/529984817174" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: '#25D366' }}>
                <path d="M12.04 2.01c-5.51 0-9.99 4.48-9.99 9.99 0 1.76.47 3.43 1.29 4.86L2 22l5.28-1.33c1.38.75 2.97 1.18 4.66 1.18 5.51 0 9.99-4.48 9.99-9.99s-4.48-9.99-9.99-9.99Zm0 2c4.41 0 7.99 3.58 7.99 7.99s-3.58 7.99-7.99 7.99c-1.5 0-2.9-.41-4.09-1.13l-.29-.17-3.12.79.82-3.04-.18-.31A7.95 7.95 0 0 1 4.05 12c0-4.41 3.58-7.99 7.99-7.99Zm4.39 11.15c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.95c-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.1-.49.1-.1.24-.26.36-.4.12-.14.16-.24.24-.41.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.38-.4-.54-.41l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.52.57.24 1.02.38 1.37.49.57.18 1.1.15 1.51.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Overlay para móviles */}
      {isMobile && isOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}
    </>
  );
};

export default MenuDerecho;
