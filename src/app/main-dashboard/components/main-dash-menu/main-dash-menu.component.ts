import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'services/FilterService/Filters.service';
@Component({
  selector: 'app-main-dash-menu',
  templateUrl: './main-dash-menu.component.html',
  styleUrls: ['./main-dash-menu.component.scss']
})
export class MainDashMenuComponent implements OnInit {

  public listItems: any[];
  public value: any[];
  constructor(private _fs: FiltersService) {
    this._fs.DefualtSiteFilterValue.subscribe(res => {
      this._fs.SiteFilterValue.next(res);
    })
  }

  ngOnInit() {
    this.getInitialSiteValue();
    this.getSitesForMenu();
  }
  getSitesForMenu(): void {
    this._fs.DefualtSiteFilterArray.subscribe(res => {
      this.listItems = res;
    })
  }
  getInitialSiteValue(): void {
    this._fs.SiteFilterValue.subscribe(res => {
      this.value = res;
    })
  }

  changeSite(e): void {
    this._fs.SiteFilterValue.next(e);
  }
}
