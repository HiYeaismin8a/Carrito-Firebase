import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../services/producto.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  public product: Products;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!router.getCurrentNavigation().extras.queryParams) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params) {
        this.productoService.getProdyctByClave(params.clave).then((val) => {
          this.product = val.docs[0].data();
        });
      }
    });
  }
}
