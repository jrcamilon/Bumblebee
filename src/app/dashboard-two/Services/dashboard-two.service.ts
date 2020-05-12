import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardTwoService {

  constructor(public _http: HttpClient) { }

  public getTagNumbers(): Observable<any> {
    return this._http.get<any>('/sites/tagNumbers');
  }

  public getSherdCount(_selectedTagNumbers: any[], _broadDates: any[], _detailedDates: any[], _site: string): Observable<any> {
      const body = {
        tagNumbers: _selectedTagNumbers,
        broadDates: _broadDates,
        detailedDates: _detailedDates,
        site: _site
      };
      return this._http.post('/sites/sherdCount', body);
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
    return this._http.post('/sites/sumOfCount', body);
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
    return this._http.post('/sites/sumOfWeight', body);
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
    return this._http.post('/sites/distribution/wares', body);
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
    return this._http.post('/sites/relationships/all', body);
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
    return this._http.post('/sites/treedata/all', body);
  }

}
