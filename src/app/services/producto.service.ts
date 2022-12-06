import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  coleccion: AngularFirestoreCollection<Products>;
  constructor(private firestore: AngularFirestore) {
    this.coleccion = firestore.collection<Products>('Producto');
  }
  public getProductos() {
    //return this.productos;
    return this.coleccion;
  }

  public getProdyctByClave(clave: string) {
    // let item: Products = this.productos.find((producto) => {
    //   return producto.clave === clave;
    // });
    // return item;
    return this.coleccion.ref.where('clave', '==', clave).get();
  }

  public addProduct(product: Products) {
    // this.productos.push(product); //Servidor agrega producto
    // return this.productos; //Respuesta del servidor
    return this.coleccion.add(product);
  }

  public updateProduct(product: Products) {
    return this.coleccion.doc(product.id).update(product);
  }

  public removeProduct(product: Products) {
    // this.productos = this.productos.filter((p) => {
    //   return p !== product;
    // });
    // return this.productos;
    return this.coleccion.doc(product.id).delete();
  }
}
