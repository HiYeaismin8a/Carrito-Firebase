import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../models/products';
import { ProductoService } from '../services/producto.service';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})

export class CarritoPage implements OnInit {
  productos: Products[];
  constructor(
    private router: Router,
    private productoService: ProductoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.productos = this.productoService.getProductos();
  }

  public abrirDetalle(clave: string): void {
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

 /* eliminar(producto: Products) {
    this.productos = this.productoService.removeProduct(producto);
  }*/

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
          }
        }
      ]
    });

    await alert.present();

  }
}
