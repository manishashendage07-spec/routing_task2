import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Iusers } from '../models/users';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NewUsersResolver implements Resolve<Iusers | Iusers[]> {
  private _userservice=inject(UsersService)
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iusers | Iusers[]> {
   let  userId=route.paramMap.get('uid')
   if(userId){
    return this._userservice.fetchuserId(userId)
   }else{
    return this._userservice.fetchuserdata()
   }
  }
}