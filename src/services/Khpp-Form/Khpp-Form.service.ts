import { Injectable } from '@angular/core';
import {KHPPForm} from './KHPPForm';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class KhppFormService {
  KHPPRecords = new BehaviorSubject<any>([])


constructor() { }

 
}
