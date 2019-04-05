import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { DashboardService } from 'services/DashboardService/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  DefaultFilterArray = new BehaviorSubject<any>([{ text: "46501", value: 1, category: 'locusnum' },
  { text: "44501", value: 2, category: 'locusnum' },
  { text: "43501", value: 3, category: 'locusnum' },
  { text: "45502", value: 4, category: 'locusnum' },
  { text: "54502", value: 5, category: 'locusnum' },
  { text: "45501", value: 6, category: 'locusnum' }]);
  // DetailsFiltersArray= new BehaviorSubject<any>([ { text: "46501", value: 1,category: 'locusnum' },
  // { text: "44501", value: 2,category: 'locusnum' },
  // { text: "43501", value: 3,category: 'locusnum' },
  // { text: "45502", value: 4,category: 'locusnum' },
  // { text: "54502", value: 5,category: 'locusnum' },
  // { text: "45501", value: 6,category: 'locusnum' }]);
  LocationFilterArray = new BehaviorSubject<any>([
    { text: "46501", value: 1, category: 'locusnum' },
    { text: "44501", value: 2, category: 'locusnum' },
    { text: "43501", value: 3, category: 'locusnum' },
    { text: "45502", value: 4, category: 'locusnum' },
    { text: "54502", value: 5, category: 'locusnum' },
    { text: "45501", value: 6, category: 'locusnum' }]);
  LocationFilterValues = new BehaviorSubject<any>([])
  DefualtSiteFilterArray = new BehaviorSubject<any>([
    { text: "Elephantine", value: 1, category: 'locusnum' },
    { text: "Kom El Hisn", value: 2, category: 'locusnum' }])
  DefualtSiteFilterValue = new BehaviorSubject<any>([
  ])
  SiteFilterValue = new BehaviorSubject<any>([])


  DefaultEleLocusNumbers = new BehaviorSubject<any>([]);
  EleLocusNumberArray = new BehaviorSubject<any>([]);
  EleFilterValues = new BehaviorSubject<any>([])
  KhppFilterValues = new BehaviorSubject<any>([])
  DefaultKhppTagNumbers = new BehaviorSubject<any>([]);
  constructor(private dashService: DashboardService) {
        this.dashService.getDashboardFilters().subscribe(item => {
          this.DefaultEleLocusNumbers.next(item.ele);
          this.DefaultKhppTagNumbers.next(item.khpp);
          this.EleLocusNumberArray.next(item.ele);
          
    
        })
    

  }


}
