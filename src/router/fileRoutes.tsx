import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import About from '../pages/About';
import Profile from '../pages/Profile/Profile';
import Document from '../pages/Document';

// 文件路由映射
const fileRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/document',
    component: Document,
  },
  {
    path: '*',
    component: NotFound,
  },
];

// 生成路由配置
export const generateFileRoutes = () => {
  return fileRoutes.map(({ path, component }) => {
    return createRoute({
      getParentRoute: () => rootRoute,
      path,
      component,
    });
  });
};
