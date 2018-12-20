import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {


  @Input() noCard: boolean;
  @Input() title: string;
  @Input() subtitle: string;
  tableData: any;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    this.tableData = {
      headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],
      dataRows: [
          ['1', 'Dakota Rice', '', 'Oud-Turnhout', ''],
          ['2', 'Minerva Hooper', '', 'Sinaai-Waas', '$23,789'],
          ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
          ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
          ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
          ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
    };

  }

}
