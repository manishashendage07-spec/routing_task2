import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signforms!: FormGroup
 hidePassword: boolean = true;
  allreadyhasaccount: boolean = false
  loginforms!: FormGroup
  constructor(
    @Inject(AuthService) private _authservice: AuthService,
    @Inject(SnackbarService) private _snackbar: SnackbarService,
    private _router: Router,
    @Inject(SpinnerService) private _spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.createloginform()
    this.createsignform()
  }
  
  togglePassword() {
  this.hidePassword = !this.hidePassword;
}

  createloginform() {
    this.loginforms = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  createsignform() {
    this.signforms = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required])
    })
  }

  onLogin() {
    if (this.loginforms.invalid) {
      this.loginforms.markAllAsTouched()
    } else {
      let details = this.loginforms.value
      this._authservice.login(details)
        .subscribe({
          next: data => {
            console.log(data);
            this._snackbar.openSuccessSnackbar(data.message)
            this._authservice.saveToken(data.token)
            this._authservice.saveUserRole(data.userRole)
            this._router.navigate(['/home'])
            this._spinner.emitLoadingflag(false)
          },
          error: err => {
            this._snackbar.openErrorSnackbar(`Login Fialed`)
            this._spinner.emitLoadingflag(false)
          }
        })
    }
  }

  onSignup() {
    if (this.signforms.invalid) {
      this.signforms.markAllAsTouched()
    }
    else {
      let userdetails = this.signforms.value
      this._authservice.signup(userdetails)
        .subscribe({
          next: data => {
            this._snackbar.openSuccessSnackbar(data.message)
            this.allreadyhasaccount = true
          },
          error: err => {
            this._snackbar.openErrorSnackbar(err.message)
          }
        })
    }
  }
}