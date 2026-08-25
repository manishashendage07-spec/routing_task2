import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICanDeactivate } from 'src/app/models/ican-deactivate';
import { Iproduct } from 'src/app/models/products';
import { ProductService } from 'src/app/service/product.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit,ICanDeactivate {
  productForm!: FormGroup
  isInEditMode: boolean = false;
  productId!: string
  constructor(
    @Inject(ProductService) private _productservice: ProductService,
    private _router: Router,
    private _routes: ActivatedRoute,
    @Inject(SnackbarService) private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createProductForm()
    this.patchproductdata()
  }

  createProductForm() {
    this.productForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('In-Progress'),
      canReturn: new FormControl(1),
      pimg: new FormControl(null, [Validators.required])
    })
  }

  onProductSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
      return
    } else {
      let productobj: Iproduct = {
        ...this.productForm.value,
        pid: Date.now().toString()
      };
      console.log(productobj);
      this._productservice.createProduct(productobj)
        .subscribe({
          next: res => {
            console.log(res);
            this.productForm.reset()
            this._snackbar.openSuccessSnackbar(res.msg)
            this._router.navigate(['/product', productobj.pid])
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }

  patchproductdata() {
    // this.productId = this._routes.snapshot.paramMap.get('pid')!
    this._routes.params.subscribe(params => {
      this.productId = params['pid'];
      if (this.productId) {
        this.isInEditMode = true;
        this._productservice.fetchProductById(this.productId)
          .subscribe({
            next: data => {
              console.log(data);
              this.productForm.patchValue(data)
            },
            error: err => {
              console.log(err);
            }
          })
      }
    })
  }
  
  onupdate() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let upd_obj:Iproduct = {
        ...this.productForm.value,
      pid:this.productId
      }
      // console.log(upd_obj);
      this._productservice.updateProduct(upd_obj)
        .subscribe({
          next: data => {
            console.log(data);
            this.isInEditMode = false
            this._snackbar.openSuccessSnackbar(data.msg)
            this.productForm.reset()
            this._router.navigate(['/product', upd_obj.pid])
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }
  
canDeactivate() {
  if (this.productForm.dirty&&this.isInEditMode) {
    return confirm("Are you sure you want to discard the changes?");
  }
  return true;
}
}