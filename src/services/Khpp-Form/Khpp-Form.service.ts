import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
import { Injectable } from '@angular/core';
import { KHPPForm } from './KHPPForm';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { GridDataResult } from '@progress/kendo-angular-grid';
@Injectable({
  providedIn: 'root'
})
export class KhppFormService {

  data = new BehaviorSubject<any>(null);
  bodySherdsData = new BehaviorSubject<any>(null);
  responseObject = new BehaviorSubject<any>([]);

  offlineDBrecordToEdit = new Subject<any>();

  // Detailed Fabric Type Options
  // Add KHB.6, KHB.5, and KHA.4
  fabricTypeOptions = [
    {value: 'KHA.1', name: 'KHA.1'},
    {value: 'KHA.2', name: 'KHA.2'},
    {value: 'KHA.3', name: 'KHA.3'},
    {value: 'KHA.4', name: 'KHA.4'},

    {value: 'KHB.1', name: 'KHB.1'},
    {value: 'KHB.2', name: 'KHB.2'},
    {value: 'KHB.3', name: 'KHB.3'},

    {value: 'KHB.5', name: 'KHB.5'},

    {value: 'KHB.6', name: 'KHB.6'},


    {value: 'KHB.4', name: 'KHB.4'},
    {value: 'KHC.1', name: 'KHC.1'},
    {value: 'KHC.2', name: 'KHC.2'},
    {value: 'KHC.3', name: 'KHC.3'},
    {value: 'Marl A1', name: 'Marl A1'},
    {value: 'Marl A2', name: 'Marl A2'},
    {value: 'Marl A3', name: 'Marl A3'},
    {value: 'Marl A4', name: 'Marl A4'},
    {value: 'Marl C1', name: 'Marl C1'},
    {value: 'Marl C2', name: 'Marl C2'},
  ];

  wareOptions = [
    {value: 'Coarse', name: 'Coarse'},
    {value: 'Medium', name: 'Medium'},
    {value: 'Fine', name: 'Fine'},
    {value: 'Marl-A', name: 'Marl-A'},
    {value: 'Marl-A2', name: 'Marl-A2'},
    {value: 'Marl-A4', name: 'Marl-A4'},
    {value: 'Marl-C', name: 'Marl-C'},
    {value: 'Marl-C', name: 'Marl-C1'},
    {value: 'Marl-C', name: 'Marl-C2'},
    {value: 'Other Marl', name: 'Other Marl'},
  ];

  // Detailed Surface Treatment Options
  surfaceTreatmentOptions = [
    {value: 'Unslipped', name: 'Unslipped'},
    {value: 'R Slip Out', name: 'R Slip Out'},
    {value: 'R Slip In', name: 'R Slip In'},
    {value: 'R Slip Both', name: 'R Slip Both'},
    {value: 'Cream Slip In', name: 'Cream Slip In'},
    {value: 'Cream Slip Out', name: 'Cream Slip Out'},
    {value: 'Cream Slip In/Out', name: 'Cream Slip In/Out'},

    {value: 'Black Slip In', name: 'Black Slip In'},
    {value: 'Black Slip Out', name: 'Black Slip In'},
    {value: 'Black Slip In/Out', name: 'Black Slip In/Out'},
    {value: 'Black Other', name: 'Black Other'},

  ];

  burnishingOptions = [
    {value: 'none', name: 'None'},
    {value: 'In', name: 'Burnishing in'},
    {value: 'Out', name: 'Burnishing Out'},
    {value: 'In/Out', name: 'Burnishing In/Out'},
  ]

  decorationOptions = [
    {value: 'none', name: 'None'},
    {value: 'lines', name: 'Lines'},
    {value: 'wavy', name: 'Wavy'},
    {value: 'other', name: 'Other'},
    {value: 'red rim band', name: 'Red Rim Band'},
    {value: 'black rim band', name: 'Black Rim Band'},
    {value: 'white rim band', name: 'White Rim Band'},
  ];

  blackeningOptions = [
    {value: 'none', name: 'None'},
    {value: 'In', name: 'In'},
    {value: 'Out', name: 'Out'},
    {value: 'In/Out', name: 'In / Out'}
  ];

  // Detailed Surface Treatment Options for anything other than Coarse, Medium, Fine Fabric Type
  surfaceTreatmentOptions_other = [
    {value: 'See Comments', name: 'See Comments'}
  ];

  // Detailed sherd Type Options
  sherdTypeOptions = [
    {value: 'Normal', name: 'Normal'},
    {value: 'Fire In', name: 'Fire In'},
    {value: 'Fire Out', name: 'Fire Out'},
    {value: 'Fire Both', name: 'Fire Both'},
    {value: 'Cream Slip In', name: 'Cream Slip In'},
    {value: 'Cream Slip Out', name: 'Cream Slip Out'},
    {value: 'Cream Slip Both', name: 'Cream Slip Out'},
    {value: 'Burnished R Slip In', name: 'Burnished R Slip In'},
    {value: 'Burnished R Slip Out', name: 'Burnished R Slip Out'},
    {value: 'Burnished R Slip Both', name: 'Burnished R Slip Out'},
    {value: 'Burnished R Slip Other', name: 'Burnished R Sli Other'},
  ]

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

  getFabricTypeOptions(): any[] {
    return this.fabricTypeOptions;
  }


  getSurfaceTreatmentOptions(fabricType?: string): any[] {
    // if (fabricType === 'Coarse' || fabricType === 'Medium' || fabricType === 'Fine') {
    //   return this.surfaceTreatmentOptions;
    // } else {
    //   return this.surfaceTreatmentOptions_other;
    // }
    return this.surfaceTreatmentOptions;
  }

  getBlackeningOptions() {
    return this.blackeningOptions;
  }

  getDecorationOptions(): any[] {
    return this.decorationOptions;
  }

  getBurnihsingOptions(): any[] {
    return this.burnishingOptions;
  }

  getWareOptions(): any[] {
    return this.wareOptions;
  }
  getSurfaceTreatmentOption(): any[] {
    return this.surfaceTreatmentOptions_other;
  }

  getSherdTypeOptions() {
    return this.sherdTypeOptions;
  }

  combineObjects(form: any) {
    console.log('combineObjects', form);


    this.offlineDB.add(form);

    this.offlineDB.getAll().then( res => {
      console.log('OFFLINE DB', res);
      this.responseObject.next(res);
    });

    // this.responseObject.next(this.offLineArray);

    console.log(this.offLineArray);

    this.offLineArray = [];
    this.data.next([]);
    this.khppData = [];
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

  tagNumberFiledValid(tagNumber: string) {
    return (tagNumber.length >= 12)
  }

  tagNumberElephantineFiledValid(tagNumber: string) {
    return (tagNumber.length === 10)
  }

}
