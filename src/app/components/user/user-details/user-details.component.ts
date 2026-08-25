import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iusers } from 'src/app/models/users';
import { UsersService } from 'src/app/service/users.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userIds!: string
  userDetails!: Iusers
  constructor(
    private _routers: ActivatedRoute,
    @Inject(UsersService) private _usersservice: UsersService,
    private _matdilaog: MatDialog,
    private _router: Router,
    @Inject(SnackbarService) private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this._routers.params.subscribe(params => {
      this.userIds = params['uid'];
      this._usersservice.fetchuserId(this.userIds)
        .subscribe({
          next: (data: Iusers) => {
            this.userDetails = data
          },
          error: (err: any) => {
            console.log(err);
          }
        })
    })
  }

  onRemoveUser() {
    let matconfig = new MatDialogConfig()
    matconfig.width = '450px',
      matconfig.disableClose = true,
      matconfig.data = `Are yo sure do you want to remove this user!`
    let config = this._matdilaog.open(GetConfirmComponent, matconfig)
    config.afterClosed()
      .subscribe(params => {
        if (params) {
          this._usersservice.removeuser(this.userIds)
            .subscribe({
              next:(res: { msg: any; }) =>{
                this._usersservice.fetchuserdata();
                this._snackbar.openSuccessSnackbar(res.msg)
                const user = this._usersservice.UsersDetails;
                if (user.length > 0){
                  this._router.navigate(['/users', user[0].userId]);
                } else {
                  this._router.navigate(['/users']);
                }
              }
            })
        }
      })
  }
}