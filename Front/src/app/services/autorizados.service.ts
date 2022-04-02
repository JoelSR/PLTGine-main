import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizadosService {
  url = '/api/autorizados/';
  constructor(private http: HttpClient) { }
  
  getAutorizados(){
    return this.http.get(this.url);
  }

  addAutorizado(autorizado:any){
    return this.http.post(this.url+'add',autorizado);
  }

  deleteAutorizado(rut_estudiante:string){
    return this.http.delete(this.url+'delete/' + rut_estudiante);
  }

}

export interface Autorizado{
    rut_estudiante?: string;
    nombre_usuario?: string;
    apellido_pat?: string;
    apellido_mat?: string;
    email?: string;
    password?: string;
}