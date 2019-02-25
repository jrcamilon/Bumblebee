import { TableGridService } from 'services/TableGridService/table-grid.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { CeramicsFormService } from 'services/CeramicFormService/ceramics-form.service';
import {MatSnackBar} from '@angular/material';
import { FormsService } from './services/forms.service';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';



@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  public data: any[];
  public selection: string;
  public forms = ['Red Notebook', 'Elephantine'];
  public completedForms = [];
  public formValue: any;

  // Camera
    // toggle webcam on/off
    public showWebcam = false;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
      // width: {ideal: 1024},
      // height: {ideal: 576}
    };
    public errors: WebcamInitError[] = [];

    // latest snapshot
    public webcamImage: WebcamImage = null;

    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  onFormSelect(form: any) {
    this.selection = form;
  }

  constructor(
    public snackBar: MatSnackBar,
    public _formsService: FormsService
    ) {
      this._formsService.activeForm.subscribe(res => {
        console.log(res);
        this.completedForms = res;
      })
  }

  ngOnInit() {
    this.selection = this.forms[1];
    this.onFormSelect(this.selection);
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  save() {
    switch (this.selection) {
      case 'Red Notebook':
        console.log('Saving Red Notebook');

        break;
      case 'Elephantine':
        console.log('Saving Elephantine');

        const toInsert = this.completedForms.map(ele => {
          return new Object({
            locusNumber: ele.locusNumber + String(ele.locusNumPre).toUpperCase() + '/' + String(ele.locusNumSuf).toLowerCase(),
            application: ele.application === null ? 'null' : String(ele.application),
            blackened: ele.blackened === null ? 'null' : String(ele.blackened),
            comments: ele.comments === null ? 'null' : String(ele.comments),
            diameter: ele.diameter === null ? 'null' : String(ele.diameter),
            enteredBy: ele.enteredBy === null ? 'null' : String(ele.enteredBy),
            enteredDate: String(ele.enteredDate),
            fabric: ele.fabric === null ? 'null' : String(ele.fabric),
            incisedDecoration: String(ele.incisedDecoration),
            numberOfObjects: String(ele.numberOfObjects),
            objectGroupNum: String(ele.objectGroupNumber),
            objectNum: String(ele.objectNumber),
            paintedDecoration: ele.paintedDecoration === null ? 'null' : String(ele.paintedDecoration),
            photo: null,
            preservations : ele.preservation === null ? 'null' : String(ele.preservation),
            processedDate: String(ele.processDate),
            processedBy: ele.processedBy === null ? 'null' : String(ele.processedBy),
            rlNum: ele.rlNumber === null ? 'null' : String(ele.rlNumber),
            sfCoating: ele.sfCoating === null ? 'null' : String(ele.sfCoating),
            sfTreatment : ele.sfTreatment === null ? 'null' : String(ele.sfTreatment),
            sheetNum: ele.sheetNumber === null ? 'null' : String(ele.sheetNumber),
            lat: 0,
            lng: 0,
            typeDescription: ele.typeDescription === null ? 'null' : String(ele.typeDescription),
            typeNum: ele.typeNumber === null ? 'null' : String(ele.typeNumber),
            weight: ele.weight === null ? 'null' : String(ele.weight),
            room: 'null',
            phase: 'null'
          })
        });

        for (let i = 0; i < toInsert.length; i++) {
          console.log(toInsert[i]);
          this._formsService.writeElephantineToDB(toInsert[i]).subscribe(res => {
            if (res.status === 201) {
              console.log(res);
              this.openSnackBar();
            }
          });
        }

        // Clear the completed forms array and clear the service store.
        // this.completedForms = [];
        // this._formsService.activeForm.next(this.completedForms);

        break;
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
    });
  }

  // CAMERA
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public onCapturedImageClick(): void {
    this.webcamImage = null;
  }

}

@Component({
  selector: 'app-snack-bar-component',
  templateUrl: './snack-bar-component-example-snack.html',
  styles: [`
    .snackbar-container {
      background: black;
      color: black;
    }`],
})
export class SnackBarComponent {

}
