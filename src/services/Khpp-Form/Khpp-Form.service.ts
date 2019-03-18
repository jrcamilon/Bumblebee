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
  responseObject = new BehaviorSubject<any[]>([]);

  private khppData: any[] = [];
  private bodyData: any[] = [];
  private offLineArray: any[] = [];
  processedBy: any;
  dueDate: any;
  tagNumber: any;



  constructor() {
    // this.createAPIObject();
  }

  combineObjects(tagNumber, processedBy, dueDate) {
    let obj = {
      tagNumber: tagNumber,
      processedBy: processedBy,
      dueDate: dueDate,
      triageData: this.khppData,
      bodySherdData: this.bodyData,
      diagnosticData: []
    };

    this.offLineArray.push(obj);
    this.responseObject.next(this.offLineArray);

    console.log(this.offLineArray, console.log(this.responseObject.subscribe(item => {
      return item;
    })));

    this.data.next([]);
    this.bodySherdsData.next([]);
  }
  setProcessedBy(processedBy) {
    this.processedBy = processedBy;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }
  setTagNumber(tagNumber) {
    this.tagNumber = tagNumber;
  }
  save(item, isNew) {
    if (isNew) {
      this.khppData.push(item);

    }

    this.data.next(this.khppData);
  }
  saveBody(item, isNew) {
    if (isNew) {
      this.bodyData.push(item);
    }

    this.data.next(this.bodyData);
  }
  removeBody(item) {
    let newArr: any[] = [];
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
    this.bodyData = newArr;
  }

  createAPIObject(): any {
    throw new Error("Method not implemented.");
  }
  remove(item) {
    let newArr: any[] = [];
    for (let i = 0; i < this.khppData.length; i++) {
      if (item !== this.khppData[i]) {
        newArr.push(this.khppData[i]);
      }
    }
    this.data.next(newArr);
    this.reset(newArr);

  }

  private reset(newArr) {
    this.khppData = [];
    this.khppData = newArr;
  }
}
