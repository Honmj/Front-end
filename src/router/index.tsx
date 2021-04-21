import React from 'react';
import { IRouter } from '@/types';
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import TodoList from '../pages/hoxTest';
import About from '../pages/about';
import Index from '../pages/index';

const routes: IRouter[] = [
  {
    title: '首页',
    icon: <AppstoreOutlined />,
    path: '/',
    component: Index,
  },
  {
    title: '关于',
    icon: <PieChartOutlined />,
    path: '/about',
    component: About,
    children: [
      {
        title: '关于的子页面',
        icon: <DesktopOutlined />,
        path: '/about/todo',
        component: About,
      },
    ],
  },
  {
    title: '待办',
    icon: <ContainerOutlined />,
    path: '/todoList',
    component: TodoList,
  },
];

export default routes;
