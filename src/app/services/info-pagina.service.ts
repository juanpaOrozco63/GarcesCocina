import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  pathData:string='assets/data/data-pagina.json';
  pathAbout:string='https://garces-d9c8f.firebaseio.com/about.json';
  cargada:boolean=false;
  info:infoPagina={};
  about:any[]=[];
  constructor( private http:HttpClient) {
   this.cargarInfo();
   this.cargarAbout();  
   
   }
   cargarInfo(){
    this.http.get(this.pathData)
    .subscribe((resp:infoPagina)=>{
      this.cargada=true
      this.info=resp
    })
   }
   cargarAbout(){
    this.http.get(this.pathAbout)
    .subscribe((resp:any)=>{
      this.cargada=true
      this.about=resp
    })
   }
}
