import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

 

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          USM
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/Archivos' className='nav-links' onClick={closeMobileMenu}>
              Archivos
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/Buscador' className='nav-links' onClick={closeMobileMenu}>
              Buscador
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/Coordenada' className='nav-links' onClick={closeMobileMenu}>
              Coordenadas
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
