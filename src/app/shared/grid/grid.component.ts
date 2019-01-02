import { GridDataService } from './grid-data.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { products } from './products';
import { DataService } from 'app/data.service';
import { ElephantModel } from 'app/processing/components/models/elephant-model';
import { customers } from './customers';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class DataGridComponent implements OnInit, OnDestroy {

  public data: any[];
  public loading = true;
  public elephantineSubscription: Subscription;

  constructor(private _ds: DataService, private _gridDataService: GridDataService) {
    this.elephantineSubscription = this._ds.elephantineData.subscribe(res => {
      console.log(res);
      if (res !== []) {
        this.loading = false;
      }
        this.data = this._gridDataService.processData(res);
    });
  }

  ngOnDestroy(): void {
    this.elephantineSubscription.unsubscribe();
  }
  ngOnInit(): void {

  }
}
