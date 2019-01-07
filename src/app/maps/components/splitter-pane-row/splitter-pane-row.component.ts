import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splitter-pane-row',
  templateUrl: './splitter-pane-row.component.html',
  styleUrls: ['./splitter-pane-row.component.scss']
})
export class SplitterPaneRowComponent implements OnInit {

  @Input() rowTitle: string;
  @Input() rowValue: any;

  constructor() { }

  ngOnInit() {
  }

}
