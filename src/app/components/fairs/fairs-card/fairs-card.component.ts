import { Component, ElementRef, Input, OnInit, QueryList,ViewChildren } from '@angular/core';
import { IFairs } from 'src/app/models/fairs';
import { FairsService } from 'src/app/service/fairs.service';

@Component({
  selector: 'app-fairs-card',
  templateUrl: './fairs-card.component.html',
  styleUrls: ['./fairs-card.component.scss']
})
export class FairsCardComponent implements OnInit {
@Input() fairObj !: IFairs
  constructor(
  ) { }

  ngOnInit(): void {
    
  }
}