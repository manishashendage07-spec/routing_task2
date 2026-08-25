import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { elementAt, Observable, of } from 'rxjs';
import { Iproduct } from '../models/products';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class NewProductsResolver implements Resolve<Iproduct| Iproduct[]> {
private productser=inject (ProductService)
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct| Iproduct[]> {
   let productid=route.paramMap.get('pId')
   if(productid){
    return this.productser.fetchProductById(productid)
   }else{
    return this.productser.fetchProducts()
   }
  }
}