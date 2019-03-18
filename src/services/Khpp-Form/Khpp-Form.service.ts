import { Injectable } from '@angular/core';
import { KHPPForm } from './KHPPForm';
import { BehaviorSubject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
@Injectable({
  providedIn: 'root'
})
export class KhppFormService {
  
  data = new BehaviorSubject<any>(null);
  bodySherdsData = new BehaviorSubject<any>(null);

  private khppData: any[] = [];
  private bodyData: any[] = [];


  constructor() {
    // this.createAPIObject();
   }

 
  save(item, isNew) {
    if (isNew) {
      this.khppData.push(item);

    }

    this.data.next(this.khppData);
  }
  saveBody(item,isNew) {
    if (isNew) {
      this.bodyData.push(item);

    }

    this.data.next(this.bodyData);
  }
  removeBody(item) {
    let newArr:any[] = [];
    for (let i = 0; i < this.bodyData.length; i++) {
      if (item !== this.bodyData[i]) {
        newArr.push(this.bodyData[i]);
      }
    }
    this.bodySherdsData.next(newArr);
    this.resetBody(newArr);

  }
  resetBody(newArr: any[]): any {
    this.bodyData = [];
    this.bodyData = newArr;  }

  createAPIObject(): any {
    throw new Error("Method not implemented.");
  }
  remove(item) {
    let newArr:any[] = [];
    for (let i = 0; i < this.khppData.length; i++) {
      if (item !== this.khppData[i]) {
        newArr.push(this.khppData[i]);
      }
    }
    this.data.next(newArr);
    this.reset(newArr);

  }

  private reset(newArr){
    this.khppData = [];
    this.khppData = newArr;
  }
}
