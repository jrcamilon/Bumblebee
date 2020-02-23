import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  // KHPP Form Stuff
  public activeForm = new BehaviorSubject<any>([]);
  public recordToEdit = new BehaviorSubject<any>([]);
  public triageFormArray = new BehaviorSubject<any>([]);
  public detailedFormArray = new BehaviorSubject<any>([]);
  public removeArray = [];

  // Elephantine Form Stuff
  public activeEleForm = new BehaviorSubject<any>([]);
  public eleRecordToEdit = new BehaviorSubject<any>([]);
  public eleTriageFormArray = new BehaviorSubject<any>([]);
  public eleDetailedFormArray = new BehaviorSubject<any>([]);
  public removeEleArray = [];

  constructor(public _http: Http) { }

  /**
   * For KHPP
   * @param _detailed: []
   * @param _basic: []
   */
  public getExcelRecords(_detailed: any[], _basic: any[]) {
    const body = {detailed: _detailed, basic: _basic};

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/khpp/excel/export', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // KHPP
  public addToRemoveArray(item: any) {
    this.removeArray.push(item);
  }

  // KHPP
  public clearToRemoveArray() {
    this.removeArray = [];
  }

  // KHPP
  public getRemoveArray() {
    return this.removeArray;
  }

  // KHPP
  public writeElephantineToDB (_form: any): Observable<any> {
    const body = {form: _form};
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/write/elephant', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // KHPP
  public updateToKHPP (_form: any, toDelete) {
    const body = {
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

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/update/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });

  }
  // KHPP
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
    return this._http.post('http://localhost:3092/write/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // KHPP
  public readFromKHPP (): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get('http://localhost:3092/read/khpp', {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // KHPP
  public deleteFromKHPP (formId: number): Observable<any> {
    const body = {
      formId: formId
    }
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/delete/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // KHPP
  public editFromKHPP (formId: number, type: string): Observable<any> {
    const body = {
      formId: formId,
      type: type
    }
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/edit/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  /**
   * Elephantine
   */

     /**
   * For Elephantine
   * @param _detailed: []
   * @param _basic: []
   */
  public getElephantineExcelRecords(_detailed: any[], _basic: any[]) {
    const body = {detailed: _detailed, basic: _basic};

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/khpp/excel/export', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // Elephantine
  public addToRemoveArray_elephantine(item: any) {
    this.removeArray.push(item);
  }

  // Elephantine
  public clearToRemoveArray_elephantine() {
    this.removeArray = [];
  }

  // Elephantine
  public getRemoveArray_elephantine() {
    return this.removeArray;
  }

  // // Elephantine
  // public writeElephantineToDB_ (_form: any): Observable<any> {
  //   const body = {form: _form};
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this._http.post('http://localhost:3092/write/elephant', body, {headers: headers})
  //   .map((response: Response) => {
  //     const tmpData = response.json();
  //     return tmpData;
  //   });
  // }

  // Elephantine
  public updateToElephantine(_form: any, toDelete) {
    const body = {
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

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/update/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });

  }
  // Elephantine
  public writeToElephantine(_form: any): Observable<any> {
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
    return this._http.post('http://localhost:3092/write/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // Elephantine
  public readFromElephantine(): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get('http://localhost:3092/read/khpp', {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // Elephantine
  public deleteFromElephantine(formId: number): Observable<any> {
    const body = {
      formId: formId
    }
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/delete/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  // Elephantine
  public editFromElephantine(formId: number, type: string): Observable<any> {
    const body = {
      formId: formId,
      type: type
    }
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3092/edit/khpp', body, {headers: headers})
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }


}
