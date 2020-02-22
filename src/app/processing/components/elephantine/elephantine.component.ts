import { Component, OnInit } from '@angular/core';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
// import { ElephantineFormsService } from '/'

@Component({
  selector: 'app-elephantine',
  templateUrl: './elephantine.component.html',
  styleUrls: ['./elephantine.component.scss']
})
export class ElephantineComponent implements OnInit {

  public opened = false;
  recordToDelete = null;
  isOnline: boolean;
  visibleTab = 'input';

  tagHasError = false;
  validTagChar = true;

  isFormBodyVisible = false;
  isBasicVisible = true;

  isKhppFormValid = false;
  buttonValue = 'SUBMIT';
  isEditing = false;

  editFormID: number;

  // Form records
  tagNumber = '';
  processedby = '';
  dueDate = '';
  basicRecords = [];
  detailedRecords = [];

  offlineDBRecords = [];
  onlineDBRecords = [];
  onlineDBRecordsCopy = [];
  filteredDBRecords = [];

  detailed = [];
  basic = [];


  isEditingOnlineDB = false;


  constructor(
    public editService: KhppFormService
  ) {

    const d = new Date();
    this.dueDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  ngOnInit() {
  }

  public restrictTagChars(e: any) {
    // const char = e.target.value;
    return this.validTagChar;
  }

  public onTagChange(e: any) {

    // console.log(e.key);
    if (e.key === 'Backspace') { return; }

    this.validTagChar = true;
    this.tagHasError = false

    const position = e.target.selectionStart;
    // console.log(position);

    if (position === 1 || position === 2 || position === 3 || position === 4 || position === 5) {
        console.log(position)
        if (isNaN(e.target.value[position - 1])) {
          this.validTagChar = false;
          this.tagHasError = true;
        }
    }

    if (position === 6) {
      e.target.value = e.target.value.toUpperCase();
         if (!isNaN(e.target.value[position - 1])) {
            this.validTagChar = false;
            this.tagHasError = true;
        }
        e.target.value = e.target.value + '/';
    }

    if (position === 7) {
      if (e.target.value !== '/') {
        this.validTagChar = false;
        this.tagHasError = true;
      }
    }

    if (position === 8) {
      // e.target.value = e.target.value.toLowerCase();
        if (!isNaN(e.target.value[position - 1])) {
          this.validTagChar = false;
          this.tagHasError = true;
        }
        const dash = e.target.value + '-';
        e.target.value = dash;
    }

    if (position === 9) {
      if (e.target.value !== '-') {
        this.validTagChar = false;
        this.tagHasError = true;
      }
    }

    this.tagNumber = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  public onDueDateChange(e: any) {
    console.log(e.target.value);
    this.dueDate = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  /** Custom function to check weather the to show the body based on three fields */
  private showBody() {
    this.isFormBodyVisible = (this.editService.tagNumberElephantineFiledValid(this.tagNumber)
    && this.processedby !== '' && this.dueDate !== '') ? true : false;
  }

  public onProcessedByChange(e: any) {
    this.processedby = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  public onFormSubmit() {

  }

  public onCancelEdit() {
    // this.isEditing = false;
    // this.visibleTab = 'offlineDB';
    // this.editFormID = undefined;
    // this.formSerivce.recordToEdit.next([]);
    // this.offlineDB.getAll().then(res => {
    //     this.offlineDBRecords = res;
    //     this.editService.responseObject.next(res);
    // });
    // this.buttonValue = 'SUBMIT';
    // this.clearForm();
    // this.clearSubFormsArray();
  }

  public onProcessingTypeChange(value: any) {
    this.isBasicVisible = value === 'basic' ? true : false;
  }

  public checkFormValidity() {
    this.isKhppFormValid = this.isFormBodyVisible && this.detailedRecords.length !== 0 || this.basicRecords.length !== 0;
  }


  public toggleScreens(value: string): void {
    // Fetch Data and make section visible
    switch (value) {
        case 'onlineDB':
            // fetch
            // if (this.isOnline) {
            //     this.formSerivce.readFromKHPP().subscribe(res => {
            //         // console.log('online db records', res);
            //         this.onlineDBRecords = res;
            //     });
            // }
            break;
        case 'offlineDB':
            break;
        case 'input':
            break;
    }
    this.visibleTab = value;
}
}
