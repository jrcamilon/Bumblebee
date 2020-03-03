import { Injectable } from '@angular/core';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElephantineFormService {

  eleData = new BehaviorSubject<any>(null);
  eleBodySherdsData = new BehaviorSubject<any>(null);
  eleResponseObject = new BehaviorSubject<any>([]);

  offlineDBrecordToEdit = new Subject<any>();

  broadDate = [
    {value: 'Old Kingdom', name: 'Old Kingdom'},
    {value: 'First Intermediate Period', name: 'First Intermediate Period'},
    {value: 'Middle Kingdom', name: 'Middle Kingdom'},
    {value: 'Second Intermediate Period', name: 'Second Intermediate Period'},
  ]

  dynasticDate = [
    {value: 'Dyn 4/5', name: 'Dyn 4/5'},
    {value: 'Dyn 6', name: 'Dyn 6'},
    {value: 'Dyn 6, late', name: 'Dyn 6 late'},
    {value: 'Early FIP', name: 'Early FIP'},
    {value: 'Late FIP', name: 'Late FIP'},
    {value: 'Late FIP/early Dyn 11', name: 'Late FIP/early Dyn 11'},
    {value: 'LateD11/early D12', name: 'LateD11/early D12'},
    {value: 'Early-mid D12', name: 'Early-mid D12'},
    {value: 'Late D12', name: 'Late D12'},
    {value: 'Late D12/early D13', name: 'Late D12/early D13'},
    {value: 'Mid D13', name: 'Mid D13'},
    {value: 'Mid/late D13', name: 'Mid/late D13'},
  ]

  // object number is not NULL
  fabricTypeOptions = [
    {value: 'NS I', name: 'NS I'},
    {value: 'NS I.s', name: 'NS I.s'},
    {value: 'NS I.b', name: 'NS I.b'},
    {value: 'NS I.v', name: 'NS I.v'},
    {value: 'NS II', name: 'NS II'},
    {value: 'NS III', name: 'NS III'},
    {value: 'NS III.b', name: 'NS III.b'},
    {value: 'NS III.s', name: 'NS III.s'},
    {value: 'NS IV', name: 'NS IV'},
    {value: 'NS IV.m', name: 'NS IV.m'},
    {value: 'NS IV.x', name: 'NS IV.x'},
    {value: 'NS V', name: 'NS V'},
    {value: 'NS V.b', name: 'NS V.b'},
    {value: 'M I.a', name: 'M I.a'},
    {value: 'M I.b', name: 'M I.b'},
    {value: 'M I.c', name: 'M I.c'},
    {value: 'M II.a', name: 'M II.a'},
    {value: 'M II.b', name: 'M II.b'},
    {value: 'M III', name: 'M III'},
    {value: 'M IV', name: 'M IV'},
  ];

  fabricTypeOptionsNullObjectNumber = [
    {value: 'NS I', name: 'NS I'},
    {value: 'NS II+', name: 'NS II+'},
    {value: 'NS V', name: 'NS V'},
    {value: 'M I', name: 'M I'},
    {value: 'M II', name: 'M II'},
    {value: 'M III', name: 'M III'},
    {value: 'M IV', name: 'M IV'}
  ];

  wareOptions = [
    {value: 'Coarse', name: 'Coarse'},
    {value: 'Medium', name: 'Medium'},
    {value: 'Fine', name: 'Fine'},
    {value: 'NS V', name: 'NS V'},
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

  public elephantineData: any[] = [];
  public eleBodyData: any[] = [];
  public eleOffLineArray: any[] = [];
  processedBy: any;
  dueDate: any;
  tagNumber: any;
  count = 0;


  constructor(public offlineDB: OfflineDBService) { }

  getFabricTypeOptions(objectField: any): any[] {
    if (objectField !== null) {
      return this.fabricTypeOptions
    } else {
      return this.fabricTypeOptionsNullObjectNumber;
    }
  }


  getSurfaceTreatmentOptions(fabricType?: string): any[] {
    // if (fabricType === 'Coarse' || fabricType === 'Medium' || fabricType === 'Fine') {
    //   return this.surfaceTreatmentOptions;
    // } else {
    //   return this.surfaceTreatmentOptions_other;
    // }
    return this.surfaceTreatmentOptions;
  }

  public getDynasticDate() {
    return this.dynasticDate;
  }

  public getBroadDate() {
    return this.broadDate;
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


    this.offlineDB.addEle(form);

    this.offlineDB.getAllEle().then( res => {
      console.log('OFFLINE DB ELE', res);
      this.eleResponseObject.next(res);
    });

    // this.responseObject.next(this.offLineArray);

    console.log(this.eleOffLineArray);

    this.eleOffLineArray = [];
    this.eleData.next([]);
    this.elephantineData = [];
    this.eleBodySherdsData.next([]);
    this.eleBodyData = [];
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
      this.elephantineData.push(item);
      this.eleData.next(this.elephantineData);

    } else {
      const currentRecord = this.elephantineData.findIndex(record => record.id === item.id);
      this.elephantineData[currentRecord] = item;
      this.eleData.next(this.elephantineData);
    }

  }
  saveBody(item, isNew) {
    if (isNew) {
      item.id = this.count;
      this.count++;
      this.eleBodyData.push(item);
      this.eleBodySherdsData.next(this.eleBodyData);

    } else {
      const currentRecord = this.eleBodyData.findIndex(record => record.id === item.id);
      this.eleBodyData[currentRecord] = item;
      this.eleBodySherdsData.next(this.eleBodyData);
    }
  }
  removeBody(item) {
    const newArr: any[] = [];
    for (let i = 0; i < this.eleBodyData.length; i++) {
      if (item !== this.eleBodyData[i]) {
        newArr.push(this.eleBodyData[i]);
      }
    }
    this.eleBodySherdsData.next(newArr);
    this.resetBody(newArr);

  }
  resetBody(newArr: any[]): any {
    this.eleBodyData = [];
    this.eleBodyData = newArr;
  }


  remove(item) {
    const newArr: any[] = [];
    for (let i = 0; i < this.elephantineData.length; i++) {
      if (item !== this.elephantineData[i]) {
        newArr.push(this.elephantineData[i]);
      }
    }
    this.eleData.next(newArr);
    this.reset(newArr);

  }

  private reset(newArr) {
    this.elephantineData = [];
    this.elephantineData = newArr;
  }

  tagNumberFiledValid(tagNumber: string) {
    return (tagNumber.length >= 12)
  }

  tagNumberElephantineFiledValid(tagNumber: string) {
    return (tagNumber.length === 10)
  }


}
