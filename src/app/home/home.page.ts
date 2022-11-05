import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public products: Products[];
  public products2: Products;
  public clave: string = '';
  public descripcion: string = '';
  public precio: number;
  public foto: string;
  @ViewChild('inputClave') inputClave: IonInput;
  @ViewChild('inputFoto') inputFoto: IonInput;
  @ViewChild('inputDescripcion') inputDescripcion: IonInput;
  @ViewChild('inputPrecio') inputPrecio: IonInput;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.products = this.productoService.getProductos();
    this.foto = 'https://picsum.photos/id/237/200/300';
    this.router.events.subscribe((observer) => {
      if (observer instanceof NavigationEnd) {
        // console.log(observer instanceof NavigationEnd);
        if (observer.url === '/') {
          this.ngOnInit();
          console.log('ejecutado');
        }
      }
    });
  }

  ngOnInit() {
    this.products = this.productoService.getProductos();
  }

  public getProdyctByClave(clave: string): void {
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

  public abrirCarrito(clave: string): void {
    this.router.navigate(['/carrito'], {
      queryParams: { clave: clave },
    });
  }


  public obtenerCampos(
    clave2: string,
    foto2: string,
    descripcion2: string,
    precio2: number
  ): Products {
    let item: Products = {
      clave: clave2,
      descripcion: descripcion2,
      precio: precio2,
      foto: foto2,
    };
    return item;
  }

  public addProduct(products2act: Products) {
    if (!this.validaciones()) return;
    this.products = this.productoService.addProduct(products2act);
    console.log(this.products);
  }

  public validaciones(): Boolean {
    if (!this.clave.trim()) {
      this.presentAlert(this.inputClave);
      return false;
    }
    if (!this.foto.trim()) {
      this.presentAlert(this.inputFoto);
      return false;
    }
    if (!this.descripcion.trim()) {
      this.presentAlert(this.inputDescripcion);
      return false;
    }
    if (!this.precio) {
      this.presentAlert(this.inputPrecio);
      return false;
    }
    return true;
  }

  async presentAlert(input: IonInput) {
    let etiqueta = '';
    switch (input) {
      case this.inputClave:
        etiqueta = 'clave';
        break;
      case this.inputDescripcion:
        etiqueta = 'descipción';
        break;
      case this.inputPrecio:
        etiqueta = 'precio';
        break;
    }
    const alert = await this.alertController.create({
      header: 'Rellene:' + etiqueta,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
        },
      ],
    });
    alert.onDidDismiss().then(() => {
      setTimeout(() => {
        input.setFocus();
      }, 100);
    });
    await alert.present();
  }
}

function isBlank() {
  throw new Error('Function not implemented.');
}
