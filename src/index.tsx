import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router';

// 导入样式
import './styles/global.less';
import './styles/themes.less';
import './pages/pages.less';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}
