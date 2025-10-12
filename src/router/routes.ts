import { RouteDefinition } from '@open-cells/core/types'; 

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'translator',
    component: 'translator-page',
    action: async () => {
      await import('../pages/translator/translator-page.js');
    },
  },
  {
    path: '/no-soportado',
    name: 'not-supported',
    component: 'not-supported-page',
    action: async () => {
      await import('../pages/not-supported/not-supported-page.js');
    },
  },
  {
    path: '/no-encontrado',
    name: 'not-found',
    notFound: false,
    component: 'not-found-page',
    action: async () => {
      await import('../pages/not-found/not-found-page.js');
    },
  },
];
