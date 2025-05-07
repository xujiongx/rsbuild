import { Router, RouterProvider } from '@tanstack/react-router';
import { rootRoute } from './router/rootRoute';
import { generateFileRoutes } from './router/fileRoutes';

// 生成文件路由
const fileRoutes = generateFileRoutes();

// 注册路由
const routeTree = rootRoute.addChildren(fileRoutes);

// 创建路由器实例
const router = new Router({ routeTree });

// 声明路由类型（TypeScript支持）
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// 导出路由提供者组件
export function AppRouter() {
  return <RouterProvider router={router} />;
}
