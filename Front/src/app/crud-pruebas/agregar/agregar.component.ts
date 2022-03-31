import { Component, OnInit } from '@angular/core';
import { PruebasService,Prueba } from 'app/services/pruebas.service';

import { Router } from '@angular/router';
import { NotificationsComponent } from 'app/notifications/notifications.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  
  //PRUEBA
  prueba: Prueba={
    id_prueba: '',
    nombre: '',
    descripcion: ''
  };
  
  //PREGUNTAS
  public preguntas: any[] = [{
    id_pregunta: 1,
    pregunta: '',
    imagen: '',
    id_prueba:'',
    id_parte: ''
  }];

  imagenes: any[] = [{
    img: null,
    idi:''
  }];

  partes: any = [{
    id_parte: '',
    nombre: ''
  }];

  imagen: any;
  constructor(private pruebasService: PruebasService, private router: Router) { }

  ngOnInit(): void {
    this.getPartes()
  }

  agregarPrueba(){
    console.log(this.preguntas)
    this.pruebasService.addPrueba([this.prueba,this.preguntas]).subscribe(
      res=>{
        console.log("*********\n",res);
        this.agregarimg(res);
      },err=>{
        console.log("---------\n",err)
      }
    );
  }

  
  onFileSelected(event,i) {

    const file:File = event.target.files[0];
    
    this.preguntas[i].imagen = file.name;

    if (file) {

      const formData = new FormData();

        formData.append("file",file);
        this.imagen = formData;
        this.imagenes[i] = {
          img: this.imagen,
          idi: i
        };
        //console.log(this.imagenes)
    }
  }

  agregarimg(id_pregunta:any){
    let notify = new NotificationsComponent();
    const formData = new FormData();
    for(var img of this.imagenes){
      console.log(img)
      this.pruebasService.addImg(img.img,this.imagenes.length).subscribe(
        res=>{
          console.log(res);
          notify.showNotificationMessage('top', 'left', 'success', 1000, 'Se ha agregado correctamente.');
          this.router.navigate(['/pruebas']);
        },
        err=>{
          console.log(err);
          notify.showNotificationMessage('top', 'left', 'danger', 1000, 'Error en agregar.');
        }
      );
    }
  }

  //Añadir preguntas
  addPregunta() {
    this.preguntas.push({
      id_pregunta: this.preguntas.length + 1,
      pregunta: '',
      imagen: '',
      id_prueba:'',
      id_parte:''
    });
  }

  removePregunta(i: number) {
    this.preguntas.splice(i, 1);
  }

  logValue() {
    console.log(this.preguntas);
  }

  getPartes(){
    this.pruebasService.getPartes().subscribe(
      res=>{
        this.partes = <any>res
        console.log(this.partes)
        console.log(this.prueba)
      },err=>console.log(err)
    )
  }
}
