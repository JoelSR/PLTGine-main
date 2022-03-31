import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import {PruebasService,Prueba} from '../../services/pruebas.service'
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
    prueba: Prueba={
    id_prueba: '',
    nombre: '',
    descripcion: ''
  };
  constructor(private pruebaService: PruebasService, private activateRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    const id_entrada = <string>this.activateRoute.snapshot.params.id;
    if(id_entrada){
      this.pruebaService.getPrueba(id_entrada).subscribe(
        res=>{
          this.prueba = res[0];
          console.log(this.prueba);
        },err=>{
          console.log(err)
        }
      );
    }
  }
  modificar(){
    let notify = new NotificationsComponent();
    this.pruebaService.editPrueba(this.prueba.id_prueba,this.prueba).subscribe(
      res=>{
        console.log(res);
        notify.showNotificationMessage('top', 'left', 'info', 1000, 'Se ha modificado la prueba.');
      },err=>{
        console.log(err);
        notify.showNotificationMessage('top', 'left', 'danger', 1000, 'Error en modificar la prueba.');
      }
    );
    this.router.navigate(['/pruebas/']);
  }
}
