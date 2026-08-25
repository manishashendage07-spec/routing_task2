import { inject, Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { Iproduct } from '../models/products';

@Injectable({
  providedIn: 'root'
})

export class ProductResolver implements Resolve<Iproduct[]> {
  private _productservice: ProductService = inject(ProductService);
 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Iproduct[]>{
    console.log('Product Resolver Called');
  return this._productservice.fetchProducts()
 }
}