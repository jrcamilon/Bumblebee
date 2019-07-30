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

  public removeArray = [];

  constructor(public _http: Http) { }

  public addToRemoveArray(item: any) {
    this.removeArray.push(item);
  }

  public clearToRemoveArray() {
    this.removeArray = [];
  }

  public getRemoveArray() {
    return this.removeArray;
  }

  public writeElephantineToDB (_form: any): Observable<any> {
    const body = {form: _form};
    // console.log(body);

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3092/write/elephant', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public updateToKHPP (_form: any, toDelete) {
    let body = {
      form: {
        formId: _form.idForm,
        processedBy: _form.processedBy,
        tagNumber: _form.tagNumber,
        dueDate: _form.dueDate
      },
      sherds: _form.detailedRecords == null ? [] : _form.detailedRecords,
      triage: _form.basicRecords == null ? [] : _form.basicRecords,
      type: _form.type,
      toDelete: toDelete,
      toAdd: []
    }


    if (body.sherds.length !== 0 || body.sherds !== null) {
      body.toAdd = body.sherds.map(ele => {
        if (ele.id == null) {
          return ele
        }
      }).filter(x => x !== undefined);

    }

    // if (body.triage.length !== 0 || body.triage !== null) {
    //   body.toAdd  = body.sherds.map(ele => {
    //     if (ele.id == null) {
    //       return ele
    //     }
    //   }).filter(x => x !== undefined);
      // console.log('TRIAGE TO ADD',body.toAdd);
      // for (let i = 0; i < body.triage.length; i++) {
      //   const element = body.triage[i];
      //   if (element.id == null || element.formId == null) {
      //     body.triage.splice(i, 1);
      //   }
      // }
    // }

    console.log('HERE', body);

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3092/update/khpp', body, {headers: headers})
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
    return this._http.post('http://vm1.infosol.com:3092/write/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public readFromKHPP (): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get('http://vm1.infosol.com:3092/read/khpp', {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public deleteFromKHPP (formId: number): Observable<any> {
    const body = {
      formId: formId
    }
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3092/delete/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public editFromKHPP (formId: number, type: string): Observable<any> {
    const body = {
      formId: formId,
      type: type
    }
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://vm1.infosol.com:3092/edit/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }


}
