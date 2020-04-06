import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardTwoService {

  public headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http) { }

  public getTagNumbers(): Observable<any> {
    return this._http.get('http://localhost:3092/sites/tagNumbers')
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
    return this._http.post('http://localhost:3092/sites/sherdCount', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getSumOfCount(_selectedTagNumbers: any[], _broadDates: any[], _detailedDates: any[], _site: string): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      site: _site
    };
    return this._http.post('http://localhost:3092/sites/sumOfCount', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getSumOfWeight(_selectedTagNumbers: any[], _broadDates: any[], _detailedDates: any[], _site: string): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      site: _site
    };
    return this._http.post('http://localhost:3092/sites/sumOfWeight', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }


  public getWareDistribution(_selectedTagNumbers: any[],
     _site: string, _broadDates: any[], _detailedDates: any[], isWeight: boolean): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      site: _site,
      type: isWeight ? 'weight' : 'count'
    };
    console.log(body);
    return this._http.post('http://localhost:3092/sites/distribution/wares', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getFlowChartData(_selectedTagNumbers: any[], 
    _broadDates: any[],
    _detailedDates: any[],
    _site: string, isWeight: boolean): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      site: _site,
      type: isWeight ? 'weight' : 'count'
    };
    return this._http.post('http://localhost:3092/sites/relationships/all', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }

  public getDirectedTreeData(_selectedTagNumbers: any[],
    _broadDates: any[], _detailedDates: any[], _site: string, isWeight: boolean): Observable<any> {
    const body = {
      tagNumbers: _selectedTagNumbers,
      broadDates: _broadDates,
      detailedDates: _detailedDates,
      site: _site,
      type: isWeight ? 'weight' : 'count'
    };
    return this._http.post('http://localhost:3092/sites/treedata/all', body, { headers: this.headers })
      .map((response: Response) => {
        const tmpData = response.json();
        return tmpData;
      })
  }




}
