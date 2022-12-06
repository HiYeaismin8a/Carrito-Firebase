import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { Products } from '../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productos: Products[]; // Productos que contiene el carrito Carrito
  total: string = '0';
  constructor(
    private router: Router,
    private productoService: ProductoService,
    private alertController: AlertController
  ) {
    this.productoService
      .getProductos()
      .snapshotChanges()
      .subscribe((val) => {
        this.productos = [];
        val.forEach((v) => {
          const producto = v.payload.doc.data();
          producto.id = v.payload.doc.id;
          this.productos.push(producto);
        });
        this.calcularTotal();
      });
  }

  ngOnInit() {}

  public abrirDetalle(clave: string): void {
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

  calcularTotal() {
    // Arreglo del carrito
    this.total = this.productos
      .reduce<number>((total, item) => {
        // Los sumamos al total
        return total + item.precio * item.cantidad;
      }, 0)
      .toFixed(2);
  }

  /* eliminar(producto: Products) {
    this.productos = this.productoService.removeProduct(producto);
  }*/

  agregarMasArticulos(producto: Products) {
    producto.cantidad++;
    this.productoService
      .updateProduct(producto)
      .then(() => this.calcularTotal())
      .catch((e) => console.log(e));
  }

  quitarArticulos(producto: Products) {
    producto.cantidad--;
    if (producto.cantidad == 0) {
      this.eliminar(producto);
      return;
    }
    this.productoService
      .updateProduct(producto)
      .then(() => this.calcularTotal())
      .catch((e) => console.log(e));
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
          handler: () => {
            if (producto.cantidad == 0) {
              producto.cantidad = 1;
            }
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.productoService
              .removeProduct(producto)
              .then()
              .catch((e) => console.log(e));
          },
        },
      ],
    });
    await alert.present();
  }
}
