import { GridDataService } from './shared/grid/grid-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public elephantineData = new Subject<any>();
  public redNotebookData = new Subject<any>();
  public selectedData = new Subject<any>();

  constructor(private _http: Http) { }

  // Get All Data
  public getElephantineData(): Observable<any> {
    return this._http.get('http://localhost:3090/elephant')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }

  //Processing and Input Data Services
  // Get All Data
  public getRedNotebookData(): Observable<any> {
    return this._http.get('http://localhost:3090/red')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public postElephantData(record) {
    // post to the db
    console.log(record);
  }

  // Dashboard Services

  // Panel 1 - Total weight and count percentages for fabrics
  public getTotalWeightCountPerFabric(): Observable<any> {
    return this._http.get('http://localhost:3090/dash/panel1')
    .map((response: Response)=>{
      const tmpData= response.json();
      return tmpData;
    })
  }

  // Panel 2 - Total count percentages for blackened fabrics
  public getTotalPercentBlackened(): Observable<any> {
    return this._http.get('http://localhost:3090/dash/panel2/count')
    .map((response: Response)=>{
      const tmpData= response.json();
      return tmpData;
    })
  }
  // Panel 2 - Total weight percentages for blackened fabrics
  public getWeightPercentBlackened(): Observable<any> {
    return this._http.get('http://localhost:3090/dash/panel2/weight')
    .map((response: Response)=>{
      const tmpData= response.json();
      return tmpData;
    })
  }

  // Panel 3 - Total count percentages for types 
  public getTotalPercentType(): Observable<any> {
    return this._http.get('http://localhost:3090/dash/panel3/count')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }
  // Panel 3 - Total count percentages for types 
  public getWeightPercentType(): Observable<any> {
    return this._http.get('http://localhost:3090/dash/panel3/weight')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }
  // public getCountOfWeightPerFabric(): Observable<any> {
  //   return this._http.get('http://localhost:3090/weight/count')
  //   .map((response: Response) => {
  //     const tmpData = response.json();
  //     return tmpData;
  //   })
  // }

  public getPercentOfDiagnostics(): Observable<any> {
    return this._http.get('http://localhost:3090/percent/diagnostics')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }

  public getPercentOfFireBlackenedExt(): Observable<any> {
    return this._http.get('http://localhost:3090/percent/blackened/ext')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }

  public getCountOfFireBlackenedExt(): Observable<any> {
    return this._http.get('http://localhost:3090/weight/blackened/total/ext')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }

  public getPercentOfFireBlackenedInt(): Observable<any> {
    return this._http.get('http://localhost:3090/percent/blackened/int')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }

  public getCountOfFireBlackenedInt(): Observable<any> {
    return this._http.get('http://localhost:3090/weight/blackened/total/int')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }

  public getPercentOfFireBlackenedIntExt(): Observable<any> {
    return this._http.get('http://localhost:3090/percent/blackened/both')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }

  public getCountOfFireBlackenedIntExt(): Observable<any> {
    return this._http.get('http://localhost:3090/weight/blackened/total/both')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    })
  }


}
