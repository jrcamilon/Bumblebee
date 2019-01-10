import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MaterialcardService {

public isCount = new Subject<any>();

constructor() { }

}
