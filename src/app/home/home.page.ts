import { AlertController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductoService } from '../services/producto.service';
import { Products } from '../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public products: Products[] = [];
  public products2: Products;
  public clave: string = '';
  public descripcion: string = '';
  public precio: number;
  public foto: string =
    'https://www.apple.com/v/iphone-14-pro/a/images/meta/iphone-14-pro_overview__e2a7u9jy63ma_og.png';

  @ViewChild('inputClave') inputClave: IonInput;
  @ViewChild('inputFoto') inputFoto: IonInput;
  @ViewChild('inputDescripcion') inputDescripcion: IonInput;
  @ViewChild('inputPrecio') inputPrecio: IonInput;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.productoService
      .getProductos()
      .snapshotChanges()
      .subscribe((valProducto) => {
        this.products = [];
        //logica carrito
        valProducto.forEach((valor) => {
          const producto = valor.payload.doc.data();
          producto.id = valor.payload.doc.id;
          this.products.push(producto);
        });
      });
  }

  ngOnInit() {}

  public getProdyctByClave(clave: string): void {
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

  public abrirCarrito(): void {
    this.router.navigate(['/carrito']);
  }

  public obtenerCampos(
    clave: string,
    foto: string,
    descripcion: string,
    precio: number,
    cantidad: number
  ): Products {
    return {
      clave,
      descripcion,
      precio,
      foto,
      cantidad,
    };
  }

  public addProduct(products2act: Products) {
    if (!this.validaciones()) return;

    const producto = this.products.find((p) => {
      //si se encuentra un producto con la misma clave
      return p.clave === products2act.clave;
    });
    if (producto) {
      producto.cantidad++;
      this.productoService
        .updateProduct(producto)
        .then()
        .catch((e) => console.log(e));
    } else {
      this.productoService
        .addProduct(products2act)
        .then()
        .catch((e) => console.log(e));
    }
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
