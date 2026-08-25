import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iloginuser, Isignupuser } from '../models/auth';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
AUTH_BASE_URL:string=environment.authBaseUrl
  constructor(
    private _http:HttpClient,
    private _spinner:SpinnerService
  ) { }

  login(userDetails:Iloginuser):Observable<any>{
    this._spinner.emitLoadingflag(true)
    const login=`${this.AUTH_BASE_URL}/api/auth/login`;
   return this._http.post(login,userDetails)
  }

  signup(userDetails:Isignupuser):Observable<any>{
    const signup=`${this.AUTH_BASE_URL}/api/auth/signup`
    return this._http.post(signup,userDetails)
  }

  logout():Observable<any>{
    localStorage.removeItem('token'),
    localStorage.removeItem('userRole')
  return of({
    msg:`LogOut Successfully!!`
  })
  }

  fetchpost():Observable<any>{
    return this._http.get(`https://jsonplaceholder.typicode.com/posts`)
  }

  saveToken(token:string){
    localStorage.setItem('token',token)
  }
  saveUserRole(userRole:string){
    localStorage.setItem('userRole',userRole)
  }

  getToken():string|null{
    return localStorage.getItem('token')
  }

  getUserRole():string|null{
    return localStorage.getItem('userRole')
  }
}