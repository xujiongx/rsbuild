import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.less';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className={`theme-toggle ${theme}`}
      aria-label="切换主题"
      title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
    >
      <div className="toggle-icon">
        <div className="sun-moon">
          <div className="sun-beams"></div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;