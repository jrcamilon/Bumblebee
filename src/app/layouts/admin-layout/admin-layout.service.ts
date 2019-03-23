import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutService {
  public isNavbarOpen = new BehaviorSubject<any>(true);

  constructor() { }
}
