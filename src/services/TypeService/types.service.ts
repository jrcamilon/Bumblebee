import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http,Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  Types = new BehaviorSubject<any>([]);
  Variants = new BehaviorSubject<any>([]);



  constructor(private _http: Http) {
    
  }
  


public getTypeVariantsLocations(): Observable<any> {


  return this._http.get('http://localhost:3092/typevariants')
  .map((response: Response) => {
    const tmpData = response.json();
    console.log(tmpData);
    return tmpData;
    // this.Types.next(tmpData.typeNum);
    // this.Variants.next(tmpData.variants);

  })
}
}
