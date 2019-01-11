import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  LocationFilterArray = new BehaviorSubject<any>([
    { text: "46501", value: 1,category: 'locusnum' },
    { text: "44501", value: 2,category: 'locusnum' },
    { text: "43501", value: 3,category: 'locusnum' },
    { text: "45502", value: 4,category: 'locusnum' },
    { text: "54502", value: 5,category: 'locusnum' },
    { text: "45501", value: 6,category: 'locusnum' }]);
  LocationFilterValues = new BehaviorSubject<any>([
    { text: "46501", value: 1,category: 'locusnum' },
    { text: "44501", value: 2,category: 'locusnum' },
    { text: "43501", value: 3,category: 'locusnum' },
    { text: "45502", value: 4,category: 'locusnum' },
    { text: "54502", value: 5,category: 'locusnum' },
    { text: "45501", value: 6,category: 'locusnum' }])
constructor() { }


}
