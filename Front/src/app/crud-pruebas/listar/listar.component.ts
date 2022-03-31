import { Component, OnInit } from '@angular/core';
import { Prueba, PruebasService} from '../../services/pruebas.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  ListarPrueba: Prueba[];
  id_tienda: string;
  constructor(private pruebasService: PruebasService, private router: Router ) { }

  ngOnInit(): void {
    this.listarPruebas()
    
  }
  listarPruebas(){
     this.pruebasService.getPruebas().subscribe(
      res=>{
        console.log(res);
        this.ListarPrueba=<any>res;
      },
      err=> console.log(err)

    );
  }
  eliminarPrueba(id:string){
    let notify = new NotificationsComponent();
    this.pruebasService.deletePrueba(id).subscribe(
      res=>{
          console.log("se borro la prueba");
          notify.showNotificationMessage('top', 'left', 'warning', 1000, 'Se ha eliminado la prueba.');
          this.listarPruebas();
      },err=>{
        console.log(err);
        notify.showNotificationMessage('top', 'left', 'danger', 1000, 'Error en eliminar la prueba.');
      }
    );


  }
  modificarPrueba(id: string){
    this.router.navigate(['/pruebas/edit/'+id]);
  }
}
