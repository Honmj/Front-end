import React, { ReactNode } from 'react';

export interface IRouter {
  title: string;
  path: string;
  component: () => JSX.Element;
  icon?: ReactNode;
  children?: IRouter[];
}
