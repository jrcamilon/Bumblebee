import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'app/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
