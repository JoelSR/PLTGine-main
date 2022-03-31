import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ListarAutorizadosComponent } from 'app/crud-autorizados/listar-autorizados/listar-autorizados.component';
import { AgregarAutorizadoComponent } from 'app/crud-autorizados/agregar-autorizados/agregar-autorizado.component';
import localeESCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import { ListarComponent } from 'app/crud-pruebas/listar/listar.component';
import { AgregarComponent } from 'app/crud-pruebas/agregar/agregar.component';
import { EditarComponent } from 'app/crud-pruebas/editar/editar.component';

registerLocaleData(localeESCL, 'es-CL')

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    NotificationsComponent,
    ListarAutorizadosComponent,
    AgregarAutorizadoComponent,
    ListarComponent,
    AgregarComponent,
    EditarComponent,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-CL'}
  ]
})

export class AdminLayoutModule {}
