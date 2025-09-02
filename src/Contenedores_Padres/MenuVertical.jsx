import React from 'react';
import { NavLink } from 'react-router-dom';
import './Estilos_Padres/MenuVertical.css';

const MenuVertical = () => {
  return (
    <nav className="menu-vertical">
      <ul>
        <li><NavLink to="/opcion1" activeClassName="activo">Opción 1</NavLink></li>
        <li><NavLink to="/opcion2" activeClassName="activo">Opción 2</NavLink></li>
        <li><NavLink to="/opcion3" activeClassName="activo">Opción 3</NavLink></li>
        <li><NavLink to="/prueba" activeClassName="activo">Prueba</NavLink></li>
      </ul>
    </nav>
  );
};

export default MenuVertical;
