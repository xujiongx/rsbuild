import React from 'react';
import './index.less';

export default function About() {
  return (
    <div className='page about-page'>
      <h1>关于我们</h1>
      <p className='subtitle'>了解这个项目的背景和技术栈</p>

      <section className='about-section'>
        <h2>项目介绍</h2>
        <p>
          这是一个使用现代前端技术栈构建的个人网站项目。它展示了如何使用 Rsbuild
          和 TanStack Router 创建一个高性能、类型安全的 React 应用。
        </p>
        <p>
          本项目旨在展示现代前端开发的最佳实践，包括组件化设计、主题切换、响应式布局等特性。
        </p>
      </section>

      <section className='about-section'>
        <h2>技术栈</h2>
        <div className='tech-stack'>
          <div className='tech-item'>
            <h3>Rsbuild</h3>
            <p>基于 Rspack 的构建工具，提供极速的开发体验和构建性能</p>
          </div>
          <div className='tech-item'>
            <h3>React</h3>
            <p>使用最新的 React 19 版本，利用其强大的组件模型和 Hooks API</p>
          </div>
          <div className='tech-item'>
            <h3>TanStack Router</h3>
            <p>类型安全的现代 React 路由库，提供强大的路由功能</p>
          </div>
          <div className='tech-item'>
            <h3>TypeScript</h3>
            <p>为项目提供类型安全和更好的开发体验</p>
          </div>
          <div className='tech-item'>
            <h3>Less</h3>
            <p>强大的 CSS 预处理器，提供更灵活的样式管理</p>
          </div>
        </div>
      </section>

      <section className='about-section'>
        <h2>项目特性</h2>
        <ul className='feature-list'>
          <li>
            <span className='feature-highlight'>文件式路由</span> -
            基于文件系统的路由配置，简化路由管理
          </li>
          <li>
            <span className='feature-highlight'>主题切换</span> -
            支持亮色和暗色主题，提升用户体验
          </li>
          <li>
            <span className='feature-highlight'>组件化设计</span> -
            模块化的组件结构，提高代码可维护性
          </li>
          <li>
            <span className='feature-highlight'>响应式布局</span> -
            适配各种设备尺寸，提供一致的用户体验
          </li>
          <li>
            <span className='feature-highlight'>类型安全</span> - 全面的
            TypeScript 支持，减少运行时错误
          </li>
        </ul>
      </section>

      <section className='about-section contact'>
        <h2>联系我们</h2>
        <p>如果您对这个项目有任何问题或建议，请随时联系我们：</p>
        <div className='contact-info'>
          <div className='contact-item'>
            <span className='contact-label'>邮箱：</span>
            <span className='contact-value'>example@example.com</span>
          </div>
          <div className='contact-item'>
            <span className='contact-label'>GitHub：</span>
            <span className='contact-value'>github.com/example</span>
          </div>
        </div>
      </section>
    </div>
  );
}
