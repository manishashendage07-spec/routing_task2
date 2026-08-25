import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/models/products';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  constructor(
    @Inject(AuthService) private _authers: AuthService,
    private _router:Router,
    @Inject(SnackbarService) private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onlogOut(){
   this._authers.logout()
   .subscribe({
    next:(data: { msg: any; })=>{
      this.snackbar.openSuccessSnackbar(data.msg)
      this._router.navigate([''])
    },
    error:(err: { msg: any; })=>{
      this.snackbar.openErrorSnackbar(err.msg)
    }
   })
  }

  

}