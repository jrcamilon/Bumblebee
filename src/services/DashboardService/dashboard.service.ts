import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public headers = new Headers({ 'Content-Type': 'application/json' });
  private http: String = 'http://';
  private port: String = ':3090';
  private domain: String = '192.168.1.2';

  constructor(private _http: Http) { }

  // Get Elephantine Count Blackened Data
  public getElephantineCountBlackenedProportions(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/dash/ele/count/blackened`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine Weight Blackened Data
  public getElephantineWeightBlackenedProportions(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/dash/ele/weight/blackened`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine  Fabric Data
  public getElephantineFabricProportions(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/dash/ele/fabric`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine Count Fabric Data
  public getElephantineCountTypeProportions(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/dash/ele/count/type`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine Weight Fabric Data
  public getElephantineWeightTypeProportions(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/dash/ele/weight/type`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }

  // Get KHPP Weight Fabric Data
  public getKHPPFabricTypeProportions(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/dash/khpp/fabric`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get KHPP Weight Fabric Data
  public getKHPPBlackenedProportions(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/dash/khpp/blackened`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
}
