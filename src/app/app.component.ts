import { Component, inject, Inject, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  islogidIn: boolean = false
  private _authservice = Inject(AuthService)
  title = 'rounting-main';

  private _spinnerService=inject(SpinnerService)
  ngOnInit(): void {
   setTimeout(()=>{
     this._spinnerService.isLoadingObj$.subscribe(res=>{
      this.islogidIn=res
    })
   },1000)
  }
}