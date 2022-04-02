import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Autorizado,AutorizadosService } from 'app/services/autorizados.service';
declare var $: any;
@Component({
  selector: 'app-agregar-autorizado',
  templateUrl: './agregar-autorizado.component.html',
  styleUrls: ['./agregar-autorizado.component.css']
})
export class AgregarAutorizadoComponent implements OnInit {

  autorizado : Autorizado={
    rut_estudiante: '',
    nombre_usuario: '',
    apellido_pat  :  '',
    apellido_mat  : '',
    email         : '',
    password      : ''
  }

  constructor(private autorizadosService: AutorizadosService, private router: Router) { }

  ngOnInit(): void {
  
  }

  agregarEstudiante(){
    let notify = new NotificationsComponent();
    this.autorizadosService.addAutorizado(this.autorizado).subscribe(
      res=>{
        console.log(res);
        notify.showNotificationMessage('top', 'left', 'success', 1000, 'Se ha agregado a un empleado.');
        this.router.navigate(['/autorizados']);
      },err=>{
        console.log(err)
        notify.showNotificationMessage('top', 'left', 'danger', 1000, 'Error en agregar empleado.');
      }
    );
  }
  
}
