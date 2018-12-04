import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public mockData = new Subject<any>();

  constructor(private _http: Http) { }

  public getMockData(): Observable<any> {
    return this._http.get('src/data/elephant.json');
  }

  public getData(): Observable<any> {
    return this._http.get('http://localhost:3090/elephant');
  }

  postElephantData(record) {
    // post to the db
    console.log(record);
  }

}
