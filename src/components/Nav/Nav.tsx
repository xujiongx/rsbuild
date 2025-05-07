import React from 'react';
import { Link } from '@tanstack/react-router';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.less';

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="nav-container">
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/about">关于</Link>
          </li>
          <li>
            <Link to="/profile">个人介绍</Link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Nav;