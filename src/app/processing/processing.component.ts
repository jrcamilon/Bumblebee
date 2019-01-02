import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';


@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  public data: any[];

  lat = 51.678418;
  lng = 7.809007;

  constructor(private _ds: DataService) {

  }

  ngOnInit() {
    this._ds.getElephantineData()
    .subscribe((res) => {
      // console.log(res);
      this.data = res;
      this._ds.elephantineData.next(res);
    },
    (err) => {
      alert('error with api');
    });

    this._ds.getRedNotebookData()
    .subscribe((res) => {
      // console.log(res);
      this._ds.redNotebookData.next(res);
    },
    (err) => {
      alert('error with api');
    });
  }
}
