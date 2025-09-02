import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import * as jwt_decode from 'jwt-decode';
import '../App.css';

// Usar imágenes desde la carpeta "ICONOS3" para los íconos que caen
const FALLING_ICONS = [
  '/ICONOS3/img1.png',
  '/ICONOS3/img2.png',
  '/ICONOS3/img3.png',
  '/ICONOS3/img4.png',
  '/ICONOS3/img5.png',
  '/ICONOS3/img6.png',
  '/ICONOS3/img7.png',
  '/ICONOS3/img8.png',
  '/ICONOS3/img9.png',
  '/ICONOS3/img10.png',
  '/ICONOS3/img11.png'
];

const LoadingScreen = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay datos de autenticación en localStorage al cargar
  React.useEffect(() => {
    const checkAuthStatus = () => {
      const googleUser = localStorage.getItem('googleUser');
      const googleToken = localStorage.getItem('googleAccessToken');
      
      if (googleUser && googleToken) {
        try {
          const userData = JSON.parse(googleUser);
          if (userData && userData.id) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error al parsear datos de usuario:', error);
          // Limpiar datos corruptos
          localStorage.removeItem('googleUser');
          localStorage.removeItem('googleAccessToken');
        }
      }
    };

    checkAuthStatus();
  }, []);

  const login = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (credentialResponse) => {
      try {
        // Google devuelve un access_token, no un credential JWT
        if (credentialResponse.access_token) {
          // Usar el access_token para obtener información del usuario desde la API de Google
          const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              'Authorization': `Bearer ${credentialResponse.access_token}`
            }
          });
          
          if (response.ok) {
            const userInfo = await response.json();
            
            // Guardar información completa del usuario
            localStorage.setItem('googleUser', JSON.stringify(userInfo));
            localStorage.setItem('googleAccessToken', credentialResponse.access_token);
            setIsAuthenticated(true);
          } else {
            throw new Error('Error al obtener información del usuario');
          }
        } else {
          throw new Error('No se recibió access_token de Google');
        }
      } catch (error) {
        console.error('Error al procesar la autenticación:', error);
        // Fallback: guardar respuesta básica si falla
        localStorage.setItem('googleUser', JSON.stringify(credentialResponse));
        setIsAuthenticated(true);
      }
    },
    onError: (error) => {
      console.error('Error en el login de Google:', error);
      // Mostrar mensaje de error más amigable
      alert('Error al iniciar sesión con Google. Por favor, intenta nuevamente.');
    },
    // Usar redirect para evitar problemas de COOP
    ux_mode: 'redirect',
    redirect_uri: window.location.origin
  });

  const handleGoogleLogin = () => {
    try {
      // Usar siempre redirect para evitar problemas de COOP
      login();
    } catch (error) {
      console.error('Error al iniciar el proceso de login:', error);
      alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('googleUser');
    localStorage.removeItem('googleAccessToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#212121',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Imágenes que caen de fondo */}
        <div className="falling-icons-overlay" aria-hidden="true">
          {Array.from({ length: 36 }).map((_, i) => {
            const left = Math.random() * 100; // 0-100%
            const delay = Math.random() * 8; // 0-8s
            const duration = 10 + Math.random() * 8; // 10-18s
            const drift = 20 + Math.random() * 40; // 20-60px
            return (
              <img
                key={i}
                className={`falling-icon`}
                style={{ left: `${left}%`, animationDelay: `${delay}s`, ['--duration']: `${duration}s`, ['--drift']: `${drift}px` }}
                src={FALLING_ICONS[i % FALLING_ICONS.length]}
                alt=""
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/iconos/img1.svg'; }}
              />
            );
          })}
        </div>
        {/* Card del Login */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Efecto de gotas de lluvia */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}></div>

          {/* Marca minimalista */}
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '16px',
            margin: '0 auto 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, #1c1c1c, #131313)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#E7E7E7" strokeWidth="1.6" opacity="0.9" />
              <path d="M7 16.5L12 5.5L17 16.5" stroke="#E7E7E7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="1.3" fill="#E7E7E7" />
            </svg>
          </div>

          {/* Título */}
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 10px 0',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Bienvenido a Pizzería
          </h1>

          {/* Subtítulo */}
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 0 30px 0',
            lineHeight: '1.5',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            Inicia sesión para disfrutar de las mejores pizzas
          </p>

          {/* Botón de Google */}
          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '14px 22px',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              color: '#111827',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.25s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F9FAFB';
              e.target.style.borderColor = '#D1D5DB';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 14px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.borderColor = '#E5E7EB';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          {/* Footer */}
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: '30px 0 0 0',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            Al continuar, aceptas nuestros términos y condiciones
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default LoadingScreen;
