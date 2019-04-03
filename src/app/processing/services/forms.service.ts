import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  public activeForm = new BehaviorSubject<any>([]);

  public recordToEdit = new BehaviorSubject<any>([]);

  // KHPP
  public triageFormArray = new BehaviorSubject<any>([]);
  public detailedFormArray = new BehaviorSubject<any>([]);

  constructor(public _http: Http) { }

  public writeElephantineToDB (_form: any): Observable<any> {
    const body = {form: _form};
    // console.log(body);

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3090/write/elephantine', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public writeToKHPP (_form: any): Observable<any> {
    const body = {
      form: {
        id: _form.id,
        processedBy: _form.processedBy,
        tagNumber: _form.tagNumber,
        dueDate: _form.dueDate
      },
      sherds: _form.bodySherdData,
      triage: _form.triageData
    }

    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3090/write/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }
}
