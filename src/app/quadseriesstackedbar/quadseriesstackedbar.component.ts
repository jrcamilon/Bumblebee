import { MaterialcardService } from './../materialcard/materialcard.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-quadseriesstackedbar',
  templateUrl: './quadseriesstackedbar.component.html',
  styleUrls: ['./quadseriesstackedbar.component.scss']
})
export class QuadseriesstackedbarComponent implements OnInit {
  public panel2interior = [];
  public panel2exterior = [];
  public panel2both = [];
  public panel2null = [];
  public model = [{
    stat: 'Body Sherds ',
    count: 434823,
    color: '#0e5a7e'
  }, {
    stat: 'Rim Tstc',
    count: 356854,
    color: '#166f99'
  }, {
    stat: 'Hem Cups ',
    count: 280022,
    color: '#2185b4'
  }, {
    stat: 'Flattened Base',
    count: 190374,
    color: '#319fd2'
  }, {
    stat: 'Other',
    count: 120392,
    color: '#3eaee2'
  }];
  constructor(
    private _ds: DataService,
    public _materialCardService: MaterialcardService) {
    this.runQueries();

  }
  ngOnInit() {
    this.runQueries();
  }

  runQueries(): void {
    this._materialCardService.isCount.subscribe(res => {
      if (res === true) {
        this.getTotalPercentType();
      } else {
        this.getWeightPercentType();
      }
    });
  }
  getWeightPercentType(): void {
    this._ds.getWeightPercentBlackened().subscribe(data => {

      this.panel2exterior = data.exterior;
      this.panel2interior = data.interior;
      this.panel2both = data.both;
      this.panel2null = data.empty;
    });
  }
  getTotalPercentType(): void {
    this._ds.getTotalPercentBlackened().subscribe(data => {
      this.panel2exterior = data.exterior;
      this.panel2interior = data.interior;
      this.panel2both = data.both;
      this.panel2null = data.empty;
    });
  }
}
