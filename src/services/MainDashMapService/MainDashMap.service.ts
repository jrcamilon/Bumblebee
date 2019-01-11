import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainDashMapService {
public currentLocusGroup = new BehaviorSubject<String>('46501');
constructor() { }

}
