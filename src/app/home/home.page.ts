import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../models/products';
import { Input,ViewChild } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public products: Products[];
  public products2: Products;
  public clave: string;
  public descripcion: string;
  public precio: number;
  public foto: string;
  @ViewChild('inputProduct') myInput  ;

  constructor(private productoService: ProductoService, private router: Router) {
    this.products = this.productoService.getProductos();
    this.foto = "Escoje foto";
    this.clave = "Escribe la clave";
    this.descripcion = "Escribe un descripcion";
    this.precio = 10;
  }

  ionViewLoaded() {

    setTimeout(() => {
      this.myInput.setFocus();
    },150);

 }

  public getProdyctByClave(clave: string): void{
    this.router.navigate(['/detalles'], {
      queryParams: { clave: clave },
    });
  }

  public obtenerCampos(clave2: string, foto2: string, descripcion2: string, precio2: number): Products{
    let item: Products = {clave: clave2, descripcion: descripcion2, precio: precio2, foto:foto2};
      return item;
  }
  
  public addProduct(products2act: Products){
    this.productoService.addProduct(products2act);
    this.products=this.productoService.getProductos();
    console.log(this.products);
  }

}
