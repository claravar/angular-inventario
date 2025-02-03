import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  standalone: false,
  
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent {
  productos: Producto[];

  constructor(private productoServicio: ProductoService, 
    private enrutador: Router
  ){}

  ngOnInit(){
    //Cargamos todos los productos
    this.ObtenerProductos();
  }

  private ObtenerProductos(){
    //Consumir los datos del observable (suscribirnos)
    this.productoServicio.obtenerProductoLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    );
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id]);
  }

  eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe(
      {
        next: (datos) => this.ObtenerProductos(),
        error: (errores) => console.log(errores)
      }
    );
  }

}
