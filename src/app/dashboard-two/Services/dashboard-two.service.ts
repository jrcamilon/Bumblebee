import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardTwoService {

  public headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) { }

  public getTagNumbers(): Observable<any> {
    return this._http.get(environment.API.domain + ':' + environment.API.port + '/sites/tagNumbers')
    .map((response: Response) => {
      const tmpData = response.json();
      return tmpData;
    });
  }

  public getSherdCount(_selectedTagNumbers: any[], _broadDates: any[], _detailedDates: any[], _site: string): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      site: _site
    };
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/sites/sherdCount', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getSumOfCount(
    _selectedTagNumbers: any[],
    _broadDates: any[],
    _detailedDates: any[],
    _site: string,
    _houseNumbers: any[],
    _roomNumbers: any[],
      ): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      houseNumbers: _houseNumbers,
      roomNumbers: _roomNumbers,
      site: _site
    };
  
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/sites/sumOfCount', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getSumOfWeight(
    _selectedTagNumbers: any[],
    _broadDates: any[],
    _detailedDates: any[],
    _site: string,
    _houseNumbers: any[],
    _roomNumbers: any[],
    ): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      houseNumbers: _houseNumbers,
      roomNumbers: _roomNumbers,
      site: _site
    };
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/sites/sumOfWeight', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }


  public getWareDistribution(
    _selectedTagNumbers: any[],
    _site: string,
    _broadDates: any[],
    _detailedDates: any[],
    _houseNumbers: any[],
    _roomNumbers: any[],
    isWeight: boolean): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      houseNumbers: _houseNumbers,
      roomNumbers: _roomNumbers,
      site: _site,
      type: isWeight ? 'weight' : 'count'
    };
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/sites/distribution/wares', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getFlowChartData(_selectedTagNumbers: any[],
    _broadDates: any[],
    _detailedDates: any[],
    _site: string,
    _houseNumbers: any[],
    _roomNumbers: any[],
    isWeight: boolean): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      houseNumbers: _houseNumbers,
      roomNumbers: _roomNumbers,
      site: _site,
      type: isWeight ? 'weight' : 'count'
    };
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/sites/relationships/all', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getDirectedTreeData(
    _selectedTagNumbers: any[],
    _broadDates: any[],
     _detailedDates: any[],
     _site: string,
     _houseNumbers: any[],
     _roomNumbers: any[],
     isWeight: boolean): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      houseNumbers: _houseNumbers,
      roomNumbers: _roomNumbers,
      site: _site,
      type: isWeight ? 'weight' : 'count'
    };
    console.log('getDirectedTreeData', body);
    return this._http.post(environment.API.domain + ':' + environment.API.port + '/sites/treedata/all', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }




}
