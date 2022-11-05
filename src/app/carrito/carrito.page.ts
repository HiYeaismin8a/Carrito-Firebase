import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})

export class CarritoPage implements OnInit {
  productos: Products[]; // Productos que contiene el carrito Carrito
  total: string ="0"
  constructor(
    private router: Router,
    private productoService: ProductoService,
    private alertController: AlertController
  ) {
    this.router.events.subscribe((observer) => {
      if (observer instanceof NavigationEnd) {
        if (observer.url === '/carrito') {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.productos = this.productoService.getProductos();
    this.calcularTotal()
  }

  public abrirDetalle(clave: string): void {
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

    calcularTotal() {
    // Arreglo del carrito
    this.total = this.productos.reduce<number>((total, item) => {
        // Los sumamos al total
        return total + item.precio*item.cantidad;
    }, 0).toFixed(2);
}

 /* eliminar(producto: Products) {
    this.productos = this.productoService.removeProduct(producto);
  }*/

  agregarMasArticulos(producto: Products){
    producto.cantidad++
    this.calcularTotal()
  }
  quitarArticulos(producto: Products){
    producto.cantidad--
    this.calcularTotal()
  }

  public async eliminar(producto: Products) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=> {
          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: ()=> {
            this.productos = this.productoService.removeProduct(producto);
            this.calcularTotal()
          }
        }
      ]
    });
    await alert.present();
  }

}
