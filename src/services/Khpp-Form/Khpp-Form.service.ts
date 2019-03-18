import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
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
  count = 0;


  constructor(public offlineDB: OfflineDBService) {
    // this.createAPIObject();
  }

  combineObjects(tagNumber, processedBy, dueDate) {
    const obj = {
      tagNumber: tagNumber,
      processedBy: processedBy,
      dueDate: dueDate,
      triageData: this.khppData,
      bodySherdData: this.bodyData,
      diagnosticData: []
    };

    this.offLineArray.push(obj);
    this.offlineDB.add(obj);
    this.responseObject.next(this.offLineArray);

    console.log(this.offLineArray);

    this.data.next([]);
    this.khppData=[];
    this.bodySherdsData.next([]);
    this.bodyData = [];
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
      item.id = this.count;
      this.count++;
      this.khppData.push(item);
      this.data.next(this.khppData);

    } else {
      const currentRecord = this.khppData.findIndex(record => record.id === item.id);
      this.khppData[currentRecord] = item;
      this.data.next(this.khppData);
    }

  }
  saveBody(item, isNew) {
    if (isNew) {
      item.id = this.count;
      this.count++;
      this.bodyData.push(item);
      this.bodySherdsData.next(this.bodyData);

    } else {
      const currentRecord = this.bodyData.findIndex(record => record.id === item.id);
      this.bodyData[currentRecord] = item;
      this.bodySherdsData.next(this.bodyData);
    }
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
