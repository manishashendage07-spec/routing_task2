import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import { ProductService } from 'src/app/service/product.service';
import { GetConfirmComponent } from 'src/app/components/get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId!: string
  productObj!: Iproduct
  constructor(
    private _routes: ActivatedRoute,
    @Inject(ProductService) private _productService: ProductService,
    private _router: Router,
    private _matdilaog:MatDialog,
    @Inject(SnackbarService) private _snackbar: SnackbarService
  ) { 
    this._routes.data
    .subscribe(res=>{
      this.productObj=res['products']
    })
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.productId = this._routes.snapshot.params['pid']
    this._routes.params.subscribe(params => {
      this.productId = params['pid'];
      this._productService.fetchProductById(this.productId)
        .subscribe({
          next: (data: Iproduct) => {
            this.productObj = data;
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    });
  }

onRemove() {
    let matconfig = new MatDialogConfig()
    matconfig.data = `Are you sure do you want to remove this product!!`;
    matconfig.disableClose = true;
    matconfig.width = '400px';
    let dialogref = this._matdilaog.open(GetConfirmComponent, matconfig)
    dialogref.afterClosed()
      .subscribe(res => {
        if (res) {
          this._productService.removeProduct(this.productId)
            .subscribe({
              next: (data: { msg: any; }) => {
                this._productService.fetchProducts()
                  .subscribe((products: string | any[]) => {
                    if (products.length > 0) {
                      this._router.navigate(['/product', products[0].pid]);
                this._snackbar.openSuccessSnackbar(data.msg)
                    } else {
                      this._router.navigate(['/product']);
                    }
                  });
              },
              error: (err: { msg: any; }) => {
                this._snackbar.openErrorSnackbar(err.msg)
              }
            })
        }
        else {
          this._snackbar.openErrorSnackbar(`Product removale cancelled!!`)
          this._router.navigate(['./product',this.productObj.pid])

        }
      })
  }
}