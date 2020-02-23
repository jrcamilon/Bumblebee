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

  public elephantineData: any[] = [];
  public eleBodyData: any[] = [];
  public eleOffLineArray: any[] = [];
  processedBy: any;
  dueDate: any;
  tagNumber: any;
  count = 0;


  constructor(public offlineDB: OfflineDBService) { }

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
