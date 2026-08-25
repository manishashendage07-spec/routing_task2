import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import {ProductService} from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<Iproduct> = []
  constructor(
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.products=this._routes.snapshot.data['products'];
    this._router.navigate(['/product',this.products[0].pid])
  }

  ngOnInit(): void {

    // this._productsService.fetchProducts()
    // .subscribe({
    //   next:data=>{
    //     this.products=data
    //     this._router.navigate(['/product',this.products[0].pid])
    //   },
    //   error:err=>{
    //     console.log(err);
    //   }
    // })
  }
}