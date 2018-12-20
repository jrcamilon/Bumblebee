import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-rednotebook-form',
  templateUrl: './rednotebook-form.component.html',
  styleUrls: ['./rednotebook-form.component.scss']
})
export class RednotebookFormComponent implements OnInit {

  @Input() title: string;
  @Input() rednotebookForm: any;
  @Output() send: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.send.emit();
  }

}
