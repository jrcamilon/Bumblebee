import { DexieService } from './core/dexie.service';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import Dexie from 'dexie';

export interface Todo {
  title: string;
  done: boolean;
}

export interface TodoWithID extends Todo {
  id: number;
}


@Injectable({
  providedIn: 'root'
})
export class OfflineDBService {

  table: Dexie.Table<TodoWithID, number>;

  // public test = new BehaviorSubject<any>('hello');

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('todos');
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  


  remove(id) {
    return this.table.delete(id);
  }


}
