import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public treeMapData = new Subject<any>();

  constructor() { }
}
