import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  url = '/api/pruebas';
  constructor(private http: HttpClient) { }
  getPruebas(){
    return this.http.get(this.url);
  }

  getPrueba(id:string){
    return this.http.get(this.url+'/'+id);
  }

  getPartes(){
    return this.http.get(this.url+'/partes/');
  }

  getPruebaData(id:number){
    return this.http.get(this.url+'/data/'+id);
  }

  addPrueba(prueba:any){
    return this.http.post(this.url,prueba);
  }

  deletePrueba(id:string){
    return this.http.delete(this.url+'/'+id);
  }
  editPrueba(id:string, prueba:any){
      return this.http.put(this.url+'/'+id, prueba);
  }
  addImg(img:any,length:any){
    console.log("TAMAÑO",img)
    return this.http.post('/api/file/uploadfile',img);
  }

  getImages(){
    return this.http.get('/api/file');
  }
}

export interface Prueba{
    id_prueba?: string;
    nombre?: string;
    descripcion?: string;
}
