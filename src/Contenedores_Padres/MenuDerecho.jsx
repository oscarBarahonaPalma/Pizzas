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
      {/* Botón hamburguesa (solo cuando el menú está cerrado) */}
      {(!isOpen) && (
        <button 
          className={`hamburger-btn`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="hamburger-inner">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
      )}

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
            <div className="social-links">
              <a href="https://web.whatsapp.com/send?phone=529984817174&text=Hola%2C%20me%20interesa%20hacer%20un%20pedido" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
                marginTop: '15px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
              </a>
            </div>
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
