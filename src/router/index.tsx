
import React from 'react';
import TodoList from '../pages/hoxTest';
import About from '../pages/about';
import Index from '../pages/index';
import  { IRouter }  from '@/types';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';


const routes:IRouter[] = [
  {
    title: '首页',
    icon: <AppstoreOutlined />,
    path: "/",
    component: Index,
    
  },
  {
    title: '关于',
    icon: <MenuUnfoldOutlined />,
    path: "/about",
    component: About,
    children:[
      {
        title: '关于的子页面',
        icon: <MailOutlined />,
        path: "/todoList",
        component: TodoList,
      },
    ]
  },
  {
    title: '待办',
    icon: <MenuFoldOutlined />,
    path: "/todoList",
    component: TodoList
  }
];

export default routes
