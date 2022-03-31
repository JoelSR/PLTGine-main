import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [//acá se añade el botón
    //{ path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    //{ path: '/user-profile', title: 'Perfil de Usuario',  icon:'account_circle', class: '' },
    //{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/pruebas', title: 'Pruebas',  icon: 'Quiz', class: '' },
    { path: '/autorizados', title: 'Autorizados',  icon: 'groups', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
