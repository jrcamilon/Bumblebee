import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-two',
  templateUrl: './dashboard-two.component.html',
  styleUrls: ['./dashboard-two.component.scss']
})
export class DashboardTwoComponent implements OnInit {

  constructor() {
    console.log('dashboard - two')
   }

  ngOnInit() {
    console.log('dashboard -two')
  }

}
