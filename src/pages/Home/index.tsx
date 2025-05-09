import React from 'react';
import { Link } from '@tanstack/react-router';
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground';
import './index.less';

export default function Home() {
  return (
    <div className="page home-page">
      <ParticleBackground />
      
      <h1>欢迎来到我的个人网站</h1>
      <p className="subtitle">基于 Rsbuild 和 TanStack Router 构建的现代化 React 应用</p>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>高性能</h3>
          <p>采用最新的 React 技术栈，确保应用运行流畅</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>美观设计</h3>
          <p>精心设计的用户界面，支持亮色和暗色主题</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>响应式布局</h3>
          <p>完美适配各种设备，从手机到桌面显示器</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>现代路由</h3>
          <p>使用 TanStack Router 实现的高效路由系统</p>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>开始探索</h2>
        <p>了解更多关于这个项目的信息和我的个人介绍</p>
        <div className="cta-buttons">
          <Link to="/about" className="cta-button primary">关于我们</Link>
          <Link to="/profile" className="cta-button secondary">个人介绍</Link>
        </div>
      </div>
    </div>
  );
}