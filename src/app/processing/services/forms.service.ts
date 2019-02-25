import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  public activeForm = new BehaviorSubject<any>([]);

  constructor(public _http: Http) { }

  // /write/elephantine

  public writeElephantineToDB (_form: any): Observable<any> {
    const body = {form: _form};
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3090/write/elephantine', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }
}
