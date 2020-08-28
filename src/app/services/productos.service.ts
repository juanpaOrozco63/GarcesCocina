import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private dbPathProductos: string = 'https://garces-d9c8f.firebaseio.com/productos_idx.json';
  cargando:boolean=true
  productos:Producto[]=[]
  productosFiltrados:Producto[]=[]
  constructor(private http: HttpClient) {
    this.cargarProductos();
  }
  cargarProductos() {
    return new Promise((resolve,reject)=>{
      
      this.http.get(this.dbPathProductos)
        .subscribe((resp: Producto[]) => {
          this.productos=resp
          this.cargando=false;
          resolve();
        });
    })
  }
  getProductos(id:string){
    return this.http.get(`https://garces-d9c8f.firebaseio.com/productos/${id}.json`);
    
  }
  buscarProducto(termino:string){
    if(this.productos.length===0){
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);   
      });
    }else{
      this.filtrarProductos(termino);
    }
     
    
  }
  filtrarProductos(termino:string){
    termino =termino.toLowerCase();
    this.productosFiltrados=[];
    this.productos.forEach(prod=>{
      const tituloLower = prod.titulo.toLowerCase();
      const categoriaLower = prod.categoria.toLowerCase();
      if(categoriaLower.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0){
        this.productosFiltrados.push(prod);
      }
    })

  }
}
