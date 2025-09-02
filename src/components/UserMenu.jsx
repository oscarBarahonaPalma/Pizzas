import React, { useState, useEffect } from 'react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('googleUser');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserInfo(parsed);
      } catch (error) {
        console.error('Error al parsear información del usuario:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('googleUser');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!userInfo) return null;

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={toggleMenu} 
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          padding: '0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
        }}
      >
        {userInfo.picture ? (
          <img 
            src={userInfo.picture} 
            alt="Foto de perfil" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#4a90e2',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </button>

      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '60px',
            right: '10px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            padding: '16px',
            minWidth: '200px',
            maxWidth: 'calc(100vw - 20px)',
            zIndex: 9999,
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '12px',
            borderBottom: '1px solid #eee',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#4a90e2',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              overflow: 'hidden',
              border: '2px solid #e0e0e0'
            }}>
              {userInfo.picture ? (
                <img 
                  src={userInfo.picture} 
                  alt="Foto de perfil" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'
              )}
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#333' }}>
                {userInfo.name || userInfo.given_name || 'Usuario'}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                {userInfo.email || 'usuario@gmail.com'}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2z"/>
              </svg>
              Cerrar sesión
            </span>
          </button>
        </div>
      )}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999
        }} onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default UserMenu;