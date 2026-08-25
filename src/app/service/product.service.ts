import { Injectable } from '@angular/core';
import { Iproduct, Iresproduct } from '../models/products';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
productsArr:Array<Iproduct>= [
  {
    pname: 'Dell Inspiron Laptop',
    pid: '201',
    pstatus: 'In-Progress',
    canReturn: 1,
    pimg: 'https://picsum.photos/id/180/300/200'
  },
  {
    pname: 'HP Laser Printer',
    pid: '202',
    pstatus: 'Delivered',
    canReturn: 0,
    pimg: 'https://picsum.photos/id/250/300/200'
  },
  {
    pname: 'Boat Rockerz 550',
    pid: '203',
    pstatus: 'Dispatched',
    canReturn: 1,
    pimg: 'https://picsum.photos/id/20/300/200'
  },
  {
    pname: 'Apple iPad Air',
    pid: '204',
    pstatus: 'In-Progress',
    canReturn: 1,
    pimg: 'https://picsum.photos/id/30/300/200'
  },
  {
    pname: 'Canon EOS Camera',
    pid: '205',
    pstatus: 'Delivered',
    canReturn: 0,
    pimg: 'https://picsum.photos/id/96/300/200'
  },
  {
    pname: 'JBL Bluetooth Speaker',
    pid: '206',
    pstatus: 'Dispatched',
    canReturn: 1,
    pimg: 'https://picsum.photos/id/1080/300/200'
  }
];
  constructor() { }

  fetchProducts(): Observable<Iproduct[]> {
    return of(this.productsArr)
  }

  fetchProductById(id: string): Observable<Iproduct> {
    let productObj = this.productsArr.find(p => p.pid === id)!
    return of(productObj)
  }

  createProduct(product: Iproduct): Observable<Iresproduct<Iproduct>> {
    this.productsArr.unshift(product)
    console.log(product);

    return of({
      msg: `The product ${product.pname} is Created Successfully!!.`,
      data: product
    })
  }

  updateProduct(product: Iproduct): Observable<Iresproduct<Iproduct>> {
    let getIndex = this.productsArr.findIndex(t => t.pid === product.pid)
    this.productsArr[getIndex] = product
    return of({
      msg: `The new product ${product.pname} is Updated successfully!.`,
      data: product
    })
  }

  removeProduct(id: string): Observable<Iresproduct<Iproduct>> {
    let get_index = this.productsArr.findIndex(t => t.pid === id)
    let product = this.productsArr.splice(get_index, 1)
    return of({ 
      msg: `The product ${product[0].pname} is removed Successfully!.`,
      data: product[0]
    })
  }
}