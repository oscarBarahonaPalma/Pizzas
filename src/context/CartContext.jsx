import React, { createContext, useMemo, useState } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
  getItemCount: () => 0,
  getTotal: () => 0,
  orders: [],
  addOrder: () => {},
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addItem = (product, qty = 1) => {
    if (!product || !product.id) return;
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeItem = (productId, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((it) => it.id === productId);
      if (!found) return prev;
      const nextQty = found.qty - qty;
      if (nextQty <= 0) {
        return prev.filter((it) => it.id !== productId);
      }
      return prev.map((it) => (it.id === productId ? { ...it, qty: nextQty } : it));
    });
  };

  const clear = () => setItems([]);
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const getItemCount = () => items.reduce((sum, it) => sum + it.qty, 0);
  const getTotal = () => items.reduce((sum, it) => sum + it.price * it.qty, 0);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear, getItemCount, getTotal, orders, addOrder }),
    [items, orders]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


