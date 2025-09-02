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
              <div className="info-icon">🕒</div>
              <div className="info-text">
                <span className="info-label">Horario</span>
                <span className="info-value">12:00 - 23:00</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-text">
                <span className="info-label">Contacto</span>
                <span className="info-value">(555) 123-4567</span>
              </div>
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
