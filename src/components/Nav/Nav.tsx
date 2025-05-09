import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Nav.less';

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  // 监听滚动事件，用于导航栏背景效果
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // 初始检查
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 移除 scrolled 依赖项，避免不必要的重新添加监听器

  // 关闭菜单的函数
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 切换菜单状态
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 导航链接数据
  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/about', label: '关于' },
    { path: '/profile', label: '个人介绍' },
    { path: '/document', label: '文档' },
  ];

  // 检查路径是否匹配当前路由
  const isPathActive = (path: string): boolean => {
    // 首页路径特殊处理，只有完全匹配才算激活
    if (path === '/') {
      return currentPath === '/';
    }

    // 其他路径，需要确保是精确匹配或者是子路径
    // 例如：/about 应该匹配 /about 和 /about/xxx，但不应该匹配 /about-us
    return (
      currentPath === path ||
      (currentPath.startsWith(path) && currentPath.charAt(path.length) === '/')
    );
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className='nav-container'>
        <div className='nav-logo'>
          <Link to='/'>
            <span className='logo-text'>Rsbuild</span>
            <span className='logo-accent'>Demo</span>
          </Link>
        </div>

        <div className='nav-content'>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  // className={isPathActive(link.path) ? 'active' : ''}
                  aria-current={isPathActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className='theme-toggle-container'>
            <ThemeToggle />
          </div>
        </div>

        <div
          className={`mobile-menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label='菜单'
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
