import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PruebasService } from 'app/services/pruebas.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {

  pruebaCompleta : any[];
  preguntas: any[]

  fX = 0;
  fY = 0;
  sX = 0;
  sY = 0;

  distancia = 0;

  partes: any = [{
    id_parte: '',
    nombre: ''
  }];

  constructor(private pruebasService: PruebasService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.getPrueba(id);
    });
    this.getPartes();
  }

  getPrueba(id:number){
    this.pruebasService.getPruebaData(id).subscribe(
      res=>{
        console.log(res)
        this.pruebaCompleta = <any>res[0];
        this.preguntas = <any>res[1];
      },err=>console.log(err)
    )
  }

  //click position + pitagoras
  getPosition(e,pixel){
    let notify = new NotificationsComponent();
    if(this.fX == 0 && this.fY == 0){
      this.fX = e.layerX
      this.fY = e.layerY
      console.log("F",e)
    }
    else if(this.sX == 0 && this.sY == 0){
      this.sX = e.layerX
      this.sY = e.layerY
      let r = Math.sqrt((Math.pow((this.sX-this.fX),2))+(Math.pow((this.sY-this.fY),2)));
      console.log("S",e)
      this.distancia = parseFloat((r*pixel*0.1).toFixed(3));
      console.log(this.distancia)
      notify.showNotificationMessage('top', 'center', 'primary', 100, this.distancia);
      this.fX = 0
      this.fY = 0
      this.sX = 0
      this.sY = 0
    }
   }

   getPartes(){
    this.pruebasService.getPartes().subscribe(
      res=>{
        this.partes = <any>res
      },err=>console.log(err)
    )
  }
}
