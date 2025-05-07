import { RootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '../context/ThemeContext';
import Nav from '../components/Nav/Nav';

// 创建根路由
export const rootRoute = new RootRoute({
  component: () => (
    <ThemeProvider>
      <div>
        <Nav />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  ),
});