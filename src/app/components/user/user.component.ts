import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Iusers } from 'src/app/models/users';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [RouterOutlet]
})
export class UserComponent implements OnInit {
usersArr:Array<Iusers>=[]
  constructor(
    @Inject(UsersService) private _usersservice: UsersService,
    private _router:Router,
    private _routes:ActivatedRoute
  ) { 
    this.usersArr=this._routes.snapshot.data['users'];
    this._router.navigate(['/users',this.usersArr[0].userId])
  }

  ngOnInit(): void {
//  this.getUsers()
  }

  getUsers(){
    this._usersservice.fetchuserdata()
    .subscribe({
      next:(data: Iusers[])=>{
        this.usersArr=data
        this._router.navigate(['/users',this.usersArr[0].userId])
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}