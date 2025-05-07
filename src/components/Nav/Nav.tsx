import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.less';

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">Rsbuild Demo</Link>
        </div>
        
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>首页</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>关于</Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>个人介绍</Link>
          </li>
          <li>
            <Link to="/document" onClick={() => setMenuOpen(false)}>文档</Link>
          </li>
        </ul>
        
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;