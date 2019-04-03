import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MaterialcardService {

  public isCount = new BehaviorSubject<any>(true);
  public panel3IsCount = new BehaviorSubject<any>(true);
  public panel10IsCount = new BehaviorSubject<any>(true);

  constructor() {
  }

}
