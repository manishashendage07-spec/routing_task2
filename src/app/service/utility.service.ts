import { Injectable } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  utilitycontrol(dataarr:Array<any>, formcontrol:FormArray){
    formcontrol.clear()
   dataarr.forEach(val => {
     let cntrl=new FormControl(val, Validators.required)
     formcontrol.push(cntrl)
    })
  }
}