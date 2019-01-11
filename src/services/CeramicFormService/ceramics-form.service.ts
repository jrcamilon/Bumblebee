import { DataService } from 'app/data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CeramicsFormService {

public formValue = new Subject<any>();

constructor(private _dataService: DataService) { }

}
