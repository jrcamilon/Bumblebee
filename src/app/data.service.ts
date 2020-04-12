import { GridDataService } from './shared/grid/grid-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public elephantineData = new Subject<any>();
  public redNotebookData = new Subject<any>();
  public selectedData = new Subject<any>();
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public env = 'localhost';


  constructor(private _http: Http) { }

  // Get All Data
  public getElephantineData(): Observable<any> {
    return this._http.get(environment.API.domain + ':' + environment.API.port + '/elephant')
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  //Processing and Input Data Services
  // Get All Data
  public getRedNotebookData(): Observable<any> {
    return this._http.get(environment.API.domain + ':' + environment.API.port + '/red')
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      });
  }

  // Dashboard Services
  // Get All Data
  public getFilteredElephantineData(_body): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/elephant', _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }
  // Panel 1 - Total weight and count percentages for fabrics
  public getTotalWeightCountPerFabric(_body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/panel1', _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  // Panel 2 - Total count percentages for blackened fabrics
  public getTotalPercentBlackened(_body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/panel2/count', _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }
  // Panel 2 - Total weight percentages for blackened fabrics
  public getWeightPercentBlackened(_body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/panel2/weight', _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  // Panel 3 - Total count percentages for types 
  public getTotalPercentType(_body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/panel3/count', _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }
  // Panel 3 - Total count percentages for types 
  public getWeightPercentType(_body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/panel3/weight', _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }
  // Latitude and longitude for each locus group
  public getLatLangsLocusGroup(_body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/latlang', _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  // Dashboard Details Totals
  public getDashboardDetailTotals(body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/details/totals', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }
  // Dashboard Details Table
  public getDashboardDetailTable(body: any): Observable<any> {
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/details/table', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getEndpointWithParams(_body: any): Observable<any> {

    const body = { message: 'hello node!' }

    return this._http.post(environment.API.domain + ':' + environment.API.port + '/test', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }
  public getSiteLocations(_body: any): Observable<any> {

    const body = _body;

    return this._http.post(environment.API.domain + ':' + environment.API.port + '/dash/siteLocations', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }



}
