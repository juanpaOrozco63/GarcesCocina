import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto:ProductoDescripcion;
  productoID:string;
  constructor(private route:ActivatedRoute,
    public _serviceProducto:ProductosService) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(resp=>{
      this._serviceProducto.getProductos(resp['id'])
      .subscribe((productoR:ProductoDescripcion)=>{
        this.productoID= resp['id'];
        this.producto=productoR
      })
    })
  }

}
