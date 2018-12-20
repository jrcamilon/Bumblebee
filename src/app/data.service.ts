import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public elephantineData = new Subject<any>();
  public redNotebookData = new Subject<any>();

  constructor(private _http: Http) { }

  // Get All Data
  public getElephantineData() {
    return this._http.get('http://localhost:3090/elephant')
    .map((response: Response) => {
      const data = response.json();
      return data;
    });
  }

  // Get All Data
  public getRedNotebookData(): Observable<any> {
    return this._http.get('http://localhost:3090/red')
    .map((response: Response) => {
      const data = response.json();
      return data;
    });
  }

  postElephantData(record) {
    // post to the db
    console.log(record);
  }

}
