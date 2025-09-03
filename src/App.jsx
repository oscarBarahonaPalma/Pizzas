import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react';
import { CartContext, CartProvider } from './context/CartContext';
import Header from './Contenedores_Padres/Header';
import MenuDerecho from './Contenedores_Padres/MenuDerecho';

const PIZZA_ICON = '/iconos/pizzas.png?v=4';
const DRINK_ICON = '/iconos/soda.png?v=4';
const DISCOUNT_ICON = '/iconos/descuento.png?v=4';
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

function PizzaCard({ product }) {
  const { addItem } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const [qtyError, setQtyError] = useState('');

  const handleAdd = (e) => {
    if (qty <= 0) {
      setQtyError('Favor de seleccionar una cantidad');
      return;
    }
    setQtyError('');
    addItem({ id: product.id, name: product.name, price: product.price }, qty);
    setQty(0);
    try {
      const sourceEl = e.currentTarget;
      window.dispatchEvent(new CustomEvent('fly-to-cart', { detail: { sourceEl } }));
    } catch {}
  };

  return (
    <div className="pizza-card">
      <div className="pizza-image">
        {product.imageSrc ? (
          <img
            src={product.imageSrc}
            alt={product.imageAlt || ''}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            style={product.id === 'pepperoni' ? { objectFit: 'contain', transform: 'scale(0.95)', transformOrigin: 'center center' } : undefined}
          />
        ) : null}
      </div>
      <div className="pizza-info">
        <h3>
          <img
            src={PIZZA_ICON}
            alt=""
            style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
          <span style={{ display: 'none', marginRight: 8 }}>🍕</span>
          {product.title}
        </h3>
        <p>{product.description}</p>
        <div className="pizza-details">
          <span className="size">{product.size}</span>
          <div className="price-badge">${product.price.toFixed(2)}</div>
        </div>
        <div className="action-row">
          <div className="qty-control">
            <button className="btn-qty minus" onClick={() => { const nv = Math.max(0, qty - 1); setQty(nv); if (nv > 0) setQtyError(''); }}>-</button>
            <span className="qty-value">{qty}</span>
            <button className="btn-qty plus" onClick={() => { const nv = qty + 1; setQty(nv); if (qtyError) setQtyError(''); }}>+</button>
          </div>
          {qtyError && <div className="form-error">{qtyError}</div>}
          <button className="btn-order inline" onClick={handleAdd}>Agregar</button>
        </div>
      </div>
    </div>
  );
}

// Última actualización: Pizza De Peperoni agregada al menú
function Pizzas() {
  const products = [
    { id: 'pepperoni', name: 'Pizza Pepperoni', title: '🍕 Pizza Pepperoni', description: 'La clásica pizza con pepperoni picante y queso mozzarella derretido', price: 150, size: 'Grande', imageSrc: '/img/Pizza_peperoni.png', imageAlt: 'Pizza Pepperoni' },
    { id: 'hawaiana', name: 'Pizza Hawaiana', title: '🍍 Pizza Hawaiana', description: 'Jamón y piña, una combinación perfecta que te sorprenderá', price: 150, size: 'Grande', imageSrc: '/img/Pizza_Hallayana.png', imageAlt: 'Pizza Hawaiana' },
    { id: 'especial', name: 'Pizza Especial', title: '⭐ Pizza Especial', description: 'Nuestra pizza especial con ingredientes premium seleccionados', price: 150, size: 'Grande', imageSrc: '/img/img3.png', imageAlt: 'Pizza Especial' },
    { id: 'camaron', name: 'Pizza de Camarón', title: '🦐 Pizza de Camarón', description: 'Camarones frescos con ajo, perejil y queso mozzarella', price: 200, size: 'Mediana', imageSrc: '/img/pizza_camaron.png', imageAlt: 'Pizza de Camarón' },
    { id: 'vegetariana', name: 'Pizza Vegetariana', title: '🥬 Pizza Vegetariana', description: 'Verduras frescas seleccionadas sobre una base suave', price: 150, size: 'Mediana', imageSrc: '/img/vegetariana.png', imageAlt: 'Pizza Vegetariana' },
    { id: 'suprema', name: 'Pizza Suprema', title: '🍕 Pizza Suprema', description: 'Una combinación completa para los más exigentes', price: 150, size: 'Grande' }
  ];
  return (
    <div className="page-content">
      <div className="pizzas-grid">
        {products.map((p) => (
          <PizzaCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function DrinkItem({ product }) {
  const { addItem } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const [qtyError, setQtyError] = useState('');
  const [showVideo, setShowVideo] = useState(!!product.videoSrc);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    try {
      videoEl.muted = true;
      const p1 = videoEl.play();
      p1 && p1.catch(() => {});
    } catch {}

    const onTouchStart = () => {
      try {
        videoEl.muted = true;
        const p = videoEl.play();
        p && p.catch(() => {});
      } catch {}
    };
    const onVisibility = () => {
      if (!document.hidden) {
        try {
          videoEl.muted = true;
          const p = videoEl.play();
          p && p.catch(() => {});
        } catch {}
      }
    };
    document.addEventListener('touchstart', onTouchStart, { once: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [showVideo]);

  // Observe visibility of the card to play/pause and reduce bandwidth when out of view
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
    }, { threshold: [0, 0.5, 1] });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!showVideo) return;
    if (isInView) {
      try { el.muted = true; const p = el.play(); p && p.catch(() => {}); } catch {}
    } else {
      try { el.pause(); } catch {}
    }
  }, [isInView, showVideo]);

  // Ensure only one video plays at a time across the page
  useEffect(() => {
    const handler = (ev) => {
      try {
        const current = videoRef.current;
        if (!current) return;
        if (ev.detail && ev.detail.el !== current) {
          current.pause();
        }
      } catch {}
    };
    window.addEventListener('exclusive-video-play', handler);
    return () => window.removeEventListener('exclusive-video-play', handler);
  }, []);

  const handleAdd = (e) => {
    if (qty <= 0) {
      setQtyError('Favor de seleccionar una cantidad');
      return;
    }
    setQtyError('');
    addItem({ id: product.id, name: product.name, price: product.price }, qty);
    setQty(0);
    try {
      const sourceEl = e.currentTarget;
      window.dispatchEvent(new CustomEvent('fly-to-cart', { detail: { sourceEl } }));
    } catch {}
  };

  return (
    <div className="drink-item" ref={containerRef}>
      <div className="drink-image">
        {product.imageSrc ? (
          <img
            src={product.imageSrc}
            alt={product.imageAlt || ''}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/img-Bebidas/logo.png'; }}
          />
        ) : null}
        <div className="price-badge">${product.price.toFixed(2)}</div>
      </div>
      <h3>
        <img 
          src={DRINK_ICON} 
          alt="" 
          style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }} 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'inline';
          }}
        />
        <span style={{ display: 'none', marginRight: 8 }}>🥤</span>
        {product.title}
      </h3>
      <p>{product.description}</p>
      <div className="action-row" style={{ marginTop: 8 }}>
        <div className="qty-control">
          <button className="btn-qty minus" onClick={() => { const nv = Math.max(0, qty - 1); setQty(nv); if (nv > 0) setQtyError(''); }}>-</button>
          <span className="qty-value">{qty}</span>
          <button className="btn-qty plus" onClick={() => { const nv = qty + 1; setQty(nv); if (qtyError) setQtyError(''); }}>+</button>
        </div>
        {qtyError && <div className="form-error">{qtyError}</div>}
        <button className="btn-order inline" onClick={handleAdd}>Agregar</button>
      </div>
    </div>
  );
}

function Bebidas() {
  // Lista de bebidas disponibles
  const drinks = [
    { id: 'fanta', name: 'Fanta', title: 'Fanta', description: 'Refresco de naranja bien frío', price: 2.5, imageSrc: '/img-Bebidas/fanta.png', imageAlt: 'Fanta' },
    { id: 'manzanita', name: 'Manzanita', title: 'Manzanita', description: 'Sabor manzana para todo momento', price: 2.5, imageSrc: '/img-Bebidas/manzanita.png', imageAlt: 'Manzanita' },
    { id: 'cola', name: 'Cola', title: 'Cola', description: 'Clásica y refrescante', price: 2.5, imageSrc: '/img-Bebidas/img1.png', imageAlt: 'Bebida cola' },
    { id: 'agua', name: 'Agua', title: 'Agua', description: 'Agua purificada sin gas', price: 1.5, imageSrc: '/img-Bebidas/agua.png', imageAlt: 'Agua' },
    { id: 'te_verde', name: 'Té Verde', title: 'Té Verde', description: 'Té verde natural y refrescante', price: 2.0, imageSrc: '/img-Bebidas/te_verde.png', imageAlt: 'Té Verde' },
    { id: 'especial', name: 'Bebida de la casa', title: 'Especial de la casa', description: 'Sabor exclusivo de la casa', price: 2.8, imageSrc: '/img-Bebidas/img1.png', imageAlt: 'Especial de la casa' }
  ];
  return (
    <div className="page-content">
      <div className="drinks-grid">
        {drinks.map((d) => (
          <DrinkItem key={d.id} product={d} />
        ))}
      </div>
    </div>
  );
}

function Postres() {
  const products = [
    { id: 'promo_2x1', name: '2x1 Pizza Grande', title: '2x1 Pizza Grande', description: 'Llévate 2 pizzas grandes por el precio de 1. Válido de lunes a jueves.', price: 19.99, size: 'Promo', imageSrc: '/img/promo1.png', imageAlt: 'Promo 2x1 Pizza Grande' },
    { id: 'combo_familiar', name: 'Combo Familiar', title: 'Combo Familiar', description: '2 pizzas medianas + 2 bebidas + 1 postre para compartir.', price: 29.99, size: 'Paquete', imageSrc: '/img/promo2.png', imageAlt: 'Combo Familiar' },
    { id: 'lunch_express', name: 'Lunch Express', title: 'Lunch Express', description: 'Pizza personal + bebida a un precio especial por tiempo limitado.', price: 8.99, size: 'Paquete', imageSrc: '/img/promo3.png', imageAlt: 'Lunch Express' },
    { id: 'pizza_bebida', name: 'Pizza + Bebida', title: 'Pizza + Bebida', description: 'Pizza mediana a elección + bebida de 500ml.', price: 11.99, size: 'Paquete' },
    { id: 'combo_pareja', name: 'Combo Pareja', title: 'Combo Pareja', description: '2 pizzas personales + 2 bebidas. Ideal para compartir.', price: 17.99, size: 'Paquete' },
    { id: 'mega_fiesta', name: 'Mega Fiesta', title: 'Mega Fiesta', description: '2 pizzas grandes + 4 bebidas + 1 postre grande.', price: 39.99, size: 'Paquete' }
  ];
  return (
    <div className="page-content">
      <div className="pizzas-grid">
        {products.map((p) => (
          <PizzaCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function Pedidos() {
  const { orders } = useContext(CartContext);
  return (
    <div className="page-content">
      <h1>Mis Pedidos</h1>
      <div className="orders-panel">
        {orders.length === 0 ? (
          <p>No tienes pedidos aún.</p>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="order-row">
              <div className="order-id">{o.id}</div>
              <div className="order-status">{o.status}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Contacto() {
  return (
    <div className="page-content">
    </div>
  );
}

function Carrito() {
  const { items, getTotal, removeItem, clear } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className="page-content">
      <div className="page-title pro">
        <div className="page-title-left">
          <span className="page-title-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.6" />
              <circle cx="17" cy="20" r="1.6" />
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.96-1.6L20 8H7" />
            </svg>
          </span>
          <h1 className="page-title-text">Carrito</h1>
        </div>
        <div className="page-title-accent" />
      </div>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-panel">
          {items.map((it) => (
            <div key={it.id} className="cart-row">
              <span className="cart-item-name">{it.name} x {it.qty}</span>
              <span className="cart-item-price">${(it.price * it.qty).toFixed(2)}</span>
              <button className="btn-qty minus" onClick={() => removeItem(it.id)}>-</button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total</strong>
            <strong>${getTotal().toFixed(2)}</strong>
          </div>
          <div className="cart-actions">
            <button className="btn-order" onClick={clear}>Vaciar carrito</button>
            <button className="btn-order" onClick={() => navigate('/checkout')}>Pagar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clear, addOrder } = useContext(CartContext);
  const [method, setMethod] = useState('');
  const [paid, setPaid] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [formError, setFormError] = useState('');

  const methods = [
    { id: 'card', label: 'Tarjeta de crédito / débito', iconSrc: '/iconos/img3.svg', desc: 'Visa, MasterCard, Amex' },
    { id: 'paypal', label: 'PayPal', iconSrc: '/iconos/img2.svg', desc: 'Paga con tu cuenta' },
    { id: 'cash', label: 'Efectivo', iconSrc: '/iconos/img1.svg', desc: 'Pagar al recibir' },
    { id: 'transfer', label: 'Transferencia', iconSrc: '/iconos/img1.svg', desc: 'SPEI / Bancaria' },
  ];

  const handleConfirm = () => {
    if (!method || items.length === 0) return;
    if (method === 'card') {
      // Validaciones simples
      const digits = cardNumber.replace(/\D/g, '');
      const mm = parseInt(expMonth, 10);
      const yy = expYear.length === 4 ? parseInt(expYear.slice(-2), 10) : parseInt(expYear, 10);
      const now = new Date();
      const currentYY = parseInt(now.getFullYear().toString().slice(-2), 10);
      const currentMM = now.getMonth() + 1;
      if (digits.length < 13 || digits.length > 19) {
        setFormError('Número de tarjeta inválido');
        return;
      }
      if (!(mm >= 1 && mm <= 12)) {
        setFormError('Mes de vencimiento inválido');
        return;
      }
      if (!(yy >= currentYY && yy <= currentYY + 20)) {
        setFormError('Año de vencimiento inválido');
        return;
      }
      if (yy === currentYY && mm < currentMM) {
        setFormError('La tarjeta está vencida');
        return;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        setFormError('CVV inválido');
        return;
      }
      setFormError('');
    }
    clear();
    setPaid(true);
    const suffix = Math.floor(100000 + Math.random() * 900000).toString().slice(-6);
    const id = `PX-${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth()+1).toString().padStart(2,'0')}-${suffix}`;
    setOrderId(id);
    addOrder({ id, status: 'En preparación', createdAt: new Date().toISOString() });
  };

  return (
    <div className="page-content">
      <h1>Checkout</h1>
      <div className="checkout-panel">
        <div className="checkout-summary">
          <span>Total a pagar</span>
          <strong>${getTotal().toFixed(2)}</strong>
        </div>
        <div className="payment-grid">
          {methods.map(m => (
            <button
              key={m.id}
              className={`payment-card ${method === m.id ? 'selected' : ''}`}
              onClick={() => setMethod(m.id)}
            >
              <img className="payment-icon" src={m.iconSrc} alt={m.label} />
              <div className="payment-text">
                <div className="payment-title">{m.label}</div>
                <div className="payment-sub">{m.desc}</div>
              </div>
            </button>
          ))}
        </div>
        {method === 'card' && (
          <div className="card-form">
            <div className="form-row">
              <label>Número de tarjeta</label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="form-row form-row-split">
              <div>
                <label>Mes</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="MM"
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div>
                <label>Año</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="YY"
                  maxLength={4}
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="123"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
            {formError && <div className="form-error">{formError}</div>}
          </div>
        )}
        <div className="checkout-actions">
          <button className="btn-order" disabled={!method || items.length === 0} onClick={handleConfirm}>Confirmar pago</button>
        </div>
      </div>

      {paid && (
        <div className="checkout-modal-overlay" onClick={() => navigate('/pizzas')}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h2>Pago realizado con éxito</h2>
            <p>Gracias por tu compra. ¡Tu pedido está en preparación!</p>
            <p style={{ marginTop: 6, opacity: 0.9 }}>Número de pedido: <strong>{orderId}</strong></p>
            <div className="checkout-actions" style={{ justifyContent: 'center' }}>
              <button className="btn-order" onClick={() => navigate('/pizzas')}>Seguir comprando</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  // Event listener para la animación de bolita al carrito
  React.useEffect(() => {
    const handleFlyToCart = (event) => {
      try {
        const cartEl = document.getElementById('cart-target');
        if (!cartEl) return;
        
        const sourceEl = event.detail?.sourceEl;
        if (!sourceEl) return;
        
        const sourceRect = sourceEl.getBoundingClientRect();
        const targetRect = cartEl.getBoundingClientRect();
        
        // Crear la bolita
        const ball = document.createElement('div');
        ball.style.cssText = `
          position: fixed;
          left: ${sourceRect.left + sourceRect.width / 2 - 15}px;
          top: ${sourceRect.top + sourceRect.height / 2 - 15}px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff4444 0%, #ff6666 100%);
          box-shadow: 0 0 0 4px rgba(255,68,68,0.6), 0 8px 25px rgba(255,68,68,0.4);
          border: 3px solid #ffffff;
          pointer-events: none;
          z-index: 999999;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        document.body.appendChild(ball);
        
        // Animación hacia el carrito
        setTimeout(() => {
          ball.style.left = `${targetRect.left + targetRect.width / 2 - 15}px`;
          ball.style.top = `${targetRect.top + targetRect.height / 2 - 15}px`;
          ball.style.transform = 'scale(0.5)';
        }, 100);
        
        // Desaparecer al llegar al carrito
        setTimeout(() => {
          ball.style.opacity = '0';
          ball.style.transform = 'scale(0.1)';
        }, 900);
        
        // Limpiar elemento
        setTimeout(() => {
          if (ball.parentNode) {
            ball.parentNode.removeChild(ball);
          }
        }, 1000);
        
      } catch (error) {
        console.error('Error en animación de bolita:', error);
      }
    };
    
    window.addEventListener('fly-to-cart', handleFlyToCart);
    
    return () => {
      window.removeEventListener('fly-to-cart', handleFlyToCart);
    };
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <div style={{ minHeight: '70vh' }}>
          <MenuDerecho />
          <div className="contenido-principal">
            <Routes>
              <Route path="/" element={<Pizzas />} />
              <Route path="/pizzas" element={<Pizzas />} />
              <Route path="/bebidas" element={<Bebidas />} />
              <Route path="/postres" element={<Postres />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<Pizzas />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

