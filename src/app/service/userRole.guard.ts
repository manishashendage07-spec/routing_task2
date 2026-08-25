import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})
export class UserRoleGuard implements CanActivate{
 private _authser=inject (AuthService)    
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       let userRoleArr=route.data['userRole']
       let loggeduser=this._authser.getUserRole()!//form local Storage
       return userRoleArr.includes(loggeduser)
   }
}