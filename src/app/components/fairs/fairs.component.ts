import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFairs } from 'src/app/models/fairs';
import { FairsService } from 'src/app/service/fairs.service';

@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.scss']
})
export class FairsComponent implements OnInit {
fairsArr:Array<IFairs>=[]
  constructor(
    @Inject(FairsService) private _fairsService: FairsService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.getFairsArr()
  }
    getFairsArr() {
    this._fairsService.fetchFairsArr()
      .subscribe({
        next: resp => {
          this.fairsArr = resp;
          this._router.navigate(['fairs',resp[0].fairId])
        },
        error: err => {
          console.log(err.msg);
        }
      })
  }
}