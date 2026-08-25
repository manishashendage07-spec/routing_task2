import { Injectable } from '@angular/core';
import { BehaviorSubject, flatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  hide() {
    throw new Error('Method not implemented.');
  }
  show() {
    throw new Error('Method not implemented.'); 
  }
private isloading$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
isLoadingObj$=this.isloading$.asObservable()
  constructor() { }

  emitLoadingflag(flag:boolean){
       this.isloading$.next(flag)
  }
}