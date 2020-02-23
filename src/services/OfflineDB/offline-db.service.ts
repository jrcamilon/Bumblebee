import { DexieService } from './core/dexie.service';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import Dexie from 'dexie';



export interface KHPPForm {
  bodySherdData: any[],
  diagnosticData: any[],
  dueDate: Date,
  processedBy: string,
  tagNumber: string,
  triageData: any[]
}


export interface TodoWithID extends KHPPForm {
  id: number;
}


@Injectable({
  providedIn: 'root'
})
export class OfflineDBService {

  table: Dexie.Table<TodoWithID, number>; // khpp
  eleTable: Dexie.Table<TodoWithID, number>; // elephantine


  tableSubject = new Subject<any>();
  eleTableSubject = new Subject<any>();

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('todos'); // KHPP
    this.eleTable = this.dexieService.table('todos2'); // Elephantine
  }

  // KHPP
  getAll() {
    return this.table.toArray();
  }
  // KHPP
  add(data: any) {
    return this.table.add(data);
  }
  // KHPP
  update(id, data) {
    return this.table.update(id, data);
  }
  // KHPP
  remove(id) {
    return this.table.delete(id);
  }
  // KHPP
  clearAll() {
    console.log('CLEARING ALL KHPP OFFLINE DB RECORDS');
    return this.table.clear();
  }


  // Elephantine
  getAllEle() {
    return this.eleTable.toArray();
  }
  addEle(data: any) {
    return this.eleTable.add(data);
  }
  // Elephantine
  updateEle(id, data) {
    return this.eleTable.update(id, data);
  }
  // Elephantine
  removeEle(id) {
    return this.eleTable.delete(id);
  }
  // Elephantine
  clearAllEle() {
    console.log('CLEARING ALL ELEPHANTINE OFFLINE DB RECORDS');
    return this.eleTable.clear();
  }



}
