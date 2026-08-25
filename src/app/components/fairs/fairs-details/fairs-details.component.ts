import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IFairs } from 'src/app/models/fairs';
import { FairsService } from 'src/app/service/fairs.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
fairsObj!:IFairs;
fairsId!:string;
  constructor(
    private _routes:ActivatedRoute,
    @Inject(FairsService) private _fairsService: FairsService,
    @Inject(SnackbarService) private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
     this._routes.params.subscribe((param: Params) => {
      this.fairsId = param['id'];
      if (this.fairsId) {
        this._fairsService.fetchFairById(this.fairsId)
          .subscribe({
            next: res => {
              this.fairsObj = res;
              this._snackbar.openSuccessSnackbar(res.fairName)
            },
            error: err => {
              this._snackbar.openErrorSnackbar(err.msg);
            }
          })
      }
    })
  }
}