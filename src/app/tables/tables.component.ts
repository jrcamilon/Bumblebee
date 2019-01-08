import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { TableGridService } from './components/table-grid/table-grid.service';
import { config } from '../maps/map-config';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [TableGridService]
})
export class TablesComponent implements OnInit {

  public selection: string;
  public data: any;
  public forms = ['Red Notebook', 'Elephantine'];
  public mapStyles = config.styles;
  public markers = [{lat: 24.08532911, lng: 32.88544272}];
  public tableHeight = 650;
  public isMapVisible = false;

  constructor(
    private _ds: DataService,
    private _tableGirdService: TableGridService
    ) {
      this._tableGirdService.selectedMarkers.subscribe(data => {
        this.loadMapMarkers(data);
      })
    }

  ngOnInit() {
    this.selection = this.forms[1];
    console.log(this.selection);
    this.onFormSelect(this.selection);
  }

  loadMapMarkers(idArray: any) {
    if (idArray.length !== 0) {
      this.tableHeight = 350;
      this.isMapVisible = true;
      const arr = [];
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < idArray.length; j++) {
          if (idArray[j] === this.data[i].id) {
            arr.push(this.data[i]);
          }
        }
      }

      this.markers = arr.map(ele => {
        return {lat: ele.lat, lng: ele.lng}
      })


    } else {
      this.tableHeight = 650;
      this.isMapVisible = false;
    }
  }

  onFormSelect(selection: any) {
    console.log(selection);
    this.selection = selection;
    switch (this.selection) {
      case 'Red Notebook':
        this.getAllRedData();
        break;
      case 'Elephantine':
        this.getAllElephantine();
        break;
    }
  }

  getAllElephantine(): void {
    this._ds.getElephantineData()
    .subscribe((res) => {
      this.data = this._tableGirdService.processElephantine(res);
      this._ds.selectedData.next(this._tableGirdService.processElephantine(res));
        this.markers = res.map(rec => {
          return new Object({lat: rec.lat, lng: rec.lng});
        });
      console.log(this.data);
      console.log(this.selection);
    },
    (err) => {
      alert('error with api');
    });

  }

  getAllRedData(): void {
    this._ds.getRedNotebookData()
    .subscribe((res) => {
      this.data = this._tableGirdService.processRed(res);
      this._ds.selectedData.next(this._tableGirdService.processRed(res));
      console.log(this.data);
    },
    (err) => {
      alert('error with api');
    });
  }

}
