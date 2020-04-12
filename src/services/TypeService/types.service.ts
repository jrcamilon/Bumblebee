import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http,Response } from '@angular/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  Types = new BehaviorSubject<any>([]);
  Variants = new BehaviorSubject<any>([]);



  constructor(private _http: Http) {
    
  }
  


public getTypeVariantsLocations(): Observable<any> {


  return this._http.get(environment.API.domain + ':' + environment.API.port + '/typevariants')
  .map((response: Response) => {
    const tmpData = response.json();
    console.log(tmpData);
    return tmpData;
    // this.Types.next(tmpData.typeNum);
    // this.Variants.next(tmpData.variants);

  })
}
}
