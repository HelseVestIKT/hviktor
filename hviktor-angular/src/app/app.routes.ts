import { Routes } from '@angular/router';
import { DemoLayoutComponent } from './demo/layout/demo-layout';

export const routes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/pages/home/home').then((m) => m.HomeComponent),
      },
      {
        path: 'komponenter/alert',
        loadComponent: () =>
          import('./demo/pages/alert/alert-demo').then((m) => m.AlertDemoComponent),
      },
      {
        path: 'komponenter/avatar',
        loadComponent: () =>
          import('./demo/pages/avatar/avatar-demo').then((m) => m.AvatarDemoComponent),
      },
      {
        path: 'komponenter/badge',
        loadComponent: () =>
          import('./demo/pages/badge/badge-demo').then((m) => m.BadgeDemoComponent),
      },
      {
        path: 'komponenter/breadcrumbs',
        loadComponent: () =>
          import('./demo/pages/breadcrumbs/breadcrumbs-demo').then(
            (m) => m.BreadcrumbsDemoComponent,
          ),
      },
      {
        path: 'komponenter/button',
        loadComponent: () =>
          import('./demo/pages/button/button-demo').then((m) => m.ButtonDemoComponent),
      },
      {
        path: 'komponenter/card',
        loadComponent: () => import('./demo/pages/card/card-demo').then((m) => m.CardDemoComponent),
      },
      {
        path: 'komponenter/chip',
        loadComponent: () => import('./demo/pages/chip/chip-demo').then((m) => m.ChipDemoComponent),
      },
      {
        path: 'komponenter/details',
        loadComponent: () =>
          import('./demo/pages/details/details-demo').then((m) => m.DetailsDemoComponent),
      },
      {
        path: 'komponenter/dialog',
        loadComponent: () =>
          import('./demo/pages/dialog/dialog-demo').then((m) => m.DialogDemoComponent),
      },
      {
        path: 'komponenter/divider',
        loadComponent: () =>
          import('./demo/pages/divider/divider-demo').then((m) => m.DividerDemoComponent),
      },
      {
        path: 'komponenter/forms',
        loadComponent: () =>
          import('./demo/pages/forms/forms-demo').then((m) => m.FormsDemoComponent),
      },
      {
        path: 'komponenter/heading',
        loadComponent: () =>
          import('./demo/pages/heading/heading-demo').then((m) => m.HeadingDemoComponent),
      },
      {
        path: 'komponenter/icon',
        loadComponent: () => import('./demo/pages/icon/icon-demo').then((m) => m.IconDemoComponent),
      },
      {
        path: 'komponenter/label',
        loadComponent: () =>
          import('./demo/pages/label/label-demo').then((m) => m.LabelDemoComponent),
      },
      {
        path: 'komponenter/link',
        loadComponent: () => import('./demo/pages/link/link-demo').then((m) => m.LinkDemoComponent),
      },
      {
        path: 'komponenter/list',
        loadComponent: () => import('./demo/pages/list/list-demo').then((m) => m.ListDemoComponent),
      },
      {
        path: 'komponenter/paragraph',
        loadComponent: () =>
          import('./demo/pages/paragraph/paragraph-demo').then((m) => m.ParagraphDemoComponent),
      },
      {
        path: 'komponenter/popover',
        loadComponent: () =>
          import('./demo/pages/popover/popover-demo').then((m) => m.PopoverDemoComponent),
      },
      {
        path: 'komponenter/tag',
        loadComponent: () => import('./demo/pages/tag/tag-demo').then((m) => m.TagDemoComponent),
      },
    ],
  },
];
