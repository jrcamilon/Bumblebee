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
  private port: String = ':3092';
  private domain: String = 'demo.infosol.com';

  constructor(private _http: Http) { }

  // Get Elephantine Count Blackened Data
  public getElephantineCountBlackenedProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/ele/count/blackened`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine Weight Blackened Data
  public getElephantineWeightBlackenedProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/ele/weight/blackened`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine  Fabric Data
  public getElephantineFabricProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/ele/fabric`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine Count Fabric Data
  public getElephantineCountTypeProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/ele/count/type`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get Elephantine Weight Fabric Data
  public getElephantineWeightTypeProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/ele/weight/type`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }

  // Get KHPP Weight Fabric Data
  public getKHPPFabricTypeProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/khpp/fabric`, _body, { headers: this.headers })
      .map((response: Response) => {
        console.log(response);
        const tmpData = response.json();
        return tmpData;
      })

  }
 
  // Get KHPP Weight Fabric Data
  public getKHPPWeightBlackenedProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/khpp/weight/blackened`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get KHPP Weight Fabric Data
  public getKHPPCountBlackenedProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/khpp/count/blackened`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
  // Get KHPP Ele Comparing Fabric Data
  public getKHPPEleFabricProportions(_body): Observable<any> {
    return this._http.post(`${this.http}${this.domain}${this.port}/dash/compare/fabric`, _body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }

  //Filters Locus and Tag
  // Get KHPP Ele Comparing Fabric Data
  public getDashboardFilters(): Observable<any> {
    return this._http.get(`${this.http}${this.domain}${this.port}/locusnumbers`)
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })

  }
}
