import { Injectable } from '@angular/core';
import { KHPPForm } from './KHPPForm';
import { BehaviorSubject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
@Injectable({
  providedIn: 'root'
})
export class KhppFormService {
  data = new BehaviorSubject<any>(null);

  private khppData: any[] = [];

  constructor() { }

  save(item, isNew) {
    if (isNew) {
      this.khppData.push(item);

    }

    this.data.next(this.khppData);
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
