import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { Autorizado, AutorizadosService } from 'app/services/autorizados.service';

@Component({
  selector: 'app-listar-autorizados',
  templateUrl: './listar-autorizados.component.html',
  styleUrls: ['./listar-autorizados.component.css']
})
export class ListarAutorizadosComponent implements OnInit {
  ListaAutorizados: Autorizado[];
  constructor(private autorizadosService: AutorizadosService, private router: Router ) { }

  ngOnInit(): void {
    this.listarAutorizados()   
  }

  listarAutorizados(){

    this.autorizadosService.getAutorizados().subscribe(
      res=>{
        this.ListaAutorizados=<any>res;
      },
      err=> console.log(err)

    );
  }

  retirarAcceso(rut_estudiante:string){
    let notify = new NotificationsComponent();
    this.autorizadosService.deleteAutorizado(rut_estudiante).subscribe(    
      res=>{
          console.log(res);
          notify.showNotificationMessage('top', 'left', 'warning', 1000, 'Se le ha quitado el acceso a un estudiante');
          this.listarAutorizados();
      },
      err=> {
        console.log(err);
        notify.showNotificationMessage('top', 'left', 'danger', 1000, 'Error al revocar acceso.');
      }
    );
  }
}
