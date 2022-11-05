import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../models/products';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productos: Products[];
  constructor(
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.productos = this.productoService.getProductos();
  }

  public abrirDetalle(clave: string): void {
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

  eliminar(producto: Products) {
    this.productos = this.productoService.removeProduct(producto);
  }
}
