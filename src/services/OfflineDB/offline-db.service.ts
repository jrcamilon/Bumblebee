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

  table: Dexie.Table<TodoWithID, number>;
  tableSubject = new Subject<any>();

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('todos');
  }

  getAll() {
    return this.table.toArray();
  }

  add(data: any) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }


  remove(id) {
    return this.table.delete(id);
  }

  clearAll() {
    console.log('CLEARING ALL OFFLINE DB RECORDS');
    return this.table.clear();
  }


}
