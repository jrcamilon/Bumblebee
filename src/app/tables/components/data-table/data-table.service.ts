import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor() { }

  createDataRows(res: any) {
    return res.map(ele => {
      return Object.keys(ele).map( function(e) { return ele[e].toString(); });
    });
  }

  createHeaderRows(objectArr: any) {
    return Object.keys(objectArr[0]).map(ele => {
        return ele.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str) { return str.toUpperCase(); });
    });
  }



}
