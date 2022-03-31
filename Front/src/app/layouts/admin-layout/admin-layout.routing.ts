import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ListarComponent } from 'app/crud-pruebas/listar/listar.component';
import { AgregarComponent } from 'app/crud-pruebas/agregar/agregar.component';
import { EditarComponent } from 'app/crud-pruebas/editar/editar.component';
import { ListarAutorizadosComponent } from 'app/crud-autorizados/listar-autorizados/listar-autorizados.component';
import { MostrarComponent } from 'app/crud-pruebas/mostrar/mostrar.component';
import { AgregarAutorizadoComponent } from 'app/crud-autorizados/agregar-autorizados/agregar-autorizado.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },//acá las rutas
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'pruebas',      component: ListarComponent },
    { path: 'pruebas/add',  component: AgregarComponent },
    { path: 'pruebas/mostrar/:id',  component: MostrarComponent },
    { path: 'pruebas/edit/:id',  component: EditarComponent },
    { path: 'autorizados',      component: ListarAutorizadosComponent },
    { path: 'autorizados/add',      component: AgregarAutorizadoComponent },
];
