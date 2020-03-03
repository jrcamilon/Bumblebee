import { OnlineServiceService } from './../../services/OnlineServices/online-service.service';
import { TableGridService } from 'services/TableGridService/table-grid.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { CeramicsFormService } from 'services/CeramicFormService/ceramics-form.service';
import {MatSnackBar} from '@angular/material';
import { FormsService } from './services/forms.service';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
// import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';



@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  public data: any[];
  public selection: string;
  public forms = ['Elephantine', 'KHPP'];
  public completedForms = [];
  public completedElephantineForms = [];
  public completedCeramics = [];
  public formValue: any;


  // // Camera
    // toggle webcam on/off
    public showWebcam = false;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    // public videoOptions: MediaTrackConstraints = {
    //   // width: {ideal: 1024},
    //   // height: {ideal: 576}
    // };
    // public errors: WebcamInitError[] = [];

    // // latest snapshot
    // public webcamImage: WebcamImage = null;
    // public webcamImageArray: WebcamImage[] = [];
    public isOnline = true;


    // webcam snapshot trigger
    // private trigger: Subject<void> = new Subject<void>();
    // // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    // private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  // onFormSelect(form: any) {
  //   this.selection = form;
  // }

  constructor(
    public snackBar: MatSnackBar,
    public _formsService: FormsService,
    public _onlineService: OnlineServiceService,
    public offlineDB: OfflineDBService,
    public _khpp: KhppFormService,
    public _elephantine: ElephantineFormService,
    ) {
      this._formsService.activeForm.subscribe(res => {
        console.log('CERAMICS', res);
        this.completedCeramics = res;
      });

      // KHPP Forms
      this._khpp.responseObject.subscribe(res => {
        console.log('RESPONSE OBJ', res);
        this.completedForms = res;
      });

      this.offlineDB.getAll().then( res => {
        console.log('OFFLINE DB', res);
        this.completedForms = res;
      });

      // Ele
      this._elephantine.eleResponseObject.subscribe(res => {
        console.log('RESPONSE OBJ ELE', res);
        this.completedElephantineForms = res;
      });

      this.offlineDB.getAllEle().then( res => {
        console.log('OFFLINE DB ELE', res);
        this.completedElephantineForms = res;
      });

  }

  ngOnInit() {
    this.selection = this.forms[1];
    // this.onFormSelect(this.selection);
    // WebcamUtil.getAvailableVideoInputs()
    // .then((mediaDevices: MediaDeviceInfo[]) => {
    //   this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    // });
  }

  save() {
    let toInsert: any = " ";
    switch (this.selection) {
      case 'Elephantine':
        console.log('Saving Elephantine');
        console.log(this.completedElephantineForms);

         toInsert = this.completedElephantineForms.map(ele => {
          return new Object({
            triageData: ele.basicRecords === undefined ? [] : ele.basicRecords,
            diagnosticData: [],
            dueDate: ele.dueDate,
            depositDate: ele.depositDate,
            id: ele.id,
            processedBy: ele.processedBy,
            tagNumber: ele.tagNumber,
            bodySherdData: ele.detailedRecords === undefined ? [] : ele.detailedRecords
          });
        });

        console.log(toInsert);
        //  let insertFailed = false;

        if (this.isOnline) {
          for (let i = 0; i < toInsert.length; i++) {
            console.log(toInsert[i]);
            this._formsService.writeToElephantine(toInsert[i]).subscribe(res => {
              console.log(res);
              if (res.status === 201) {
                console.log(res);
                this.deleteOfflineDB();
                this.completedForms = [];
                this.offlineDB.clearAllEle();
                this._elephantine.eleResponseObject.next([]);
                this.openSnackBar();
              } else {

              }
            });
          }
        } else {
          console.log('cant post online;')
        }

        break;
        case 'KHPP':
        console.log('Saving KHPP');
        console.log(this.completedForms);

         toInsert = this.completedForms.map(ele => {
          return new Object({
            triageData: ele.basicRecords === undefined ? [] : ele.basicRecords,
            diagnosticData: [],
            dueDate: ele.dueDate,
            id: ele.id,
            processedBy: ele.processedBy,
            tagNumber: ele.tagNumber,
            bodySherdData: ele.detailedRecords === undefined ? [] : ele.detailedRecords
          });
        });

        console.log(toInsert);
        //  let insertFailed = false;

        if (this.isOnline) {
          for (let i = 0; i < toInsert.length; i++) {
            console.log(toInsert[i]);
            this._formsService.writeToKHPP(toInsert[i]).subscribe(res => {
              console.log(res);
              if (res.status === 201) {
                console.log(res);
                this.deleteOfflineDB();
                this.completedForms = [];
                this.offlineDB.clearAll();
                this._khpp.responseObject.next([]);
                this.openSnackBar();
              } else {

              }
            });
          }
        } else {
          console.log('cant post online;')
        }

        break;
    }
  }

  deleteOfflineDB() {

    if (this.selection === 'Elephantine') {
      this.offlineDB.clearAllEle();
      this.completedForms = [];
      this._elephantine.eleResponseObject.next([]);
    } else if (this.selection === 'KHPP') {
      this.offlineDB.clearAll();
      this.completedForms = [];
      this._khpp.responseObject.next([]);
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6000,
    });
  }

  // CAMERA
  // public triggerSnapshot(): void {
  //   this.trigger.next();
  // }

  // public toggleWebcam(): void {
  //   this.showWebcam = !this.showWebcam;
  // }

  // public handleInitError(error: WebcamInitError): void {
  //   this.errors.push(error);
  // }

  // public showNextWebcam(directionOrDeviceId: boolean|string): void {
  //   // true => move forward through devices
  //   // false => move backwards through devices
  //   // string => move to device with given deviceId
  //   this.nextWebcam.next(directionOrDeviceId);
  // }

  // public handleImage(webcamImage: WebcamImage): void {
  //   // console.info('received webcam image', webcamImage, this.webcamImageArray);
  //   this.webcamImage = webcamImage;
  //   this.webcamImageArray.push(webcamImage);
  // }

  // public cameraWasSwitched(deviceId: string): void {
  //   console.log('active device: ' + deviceId);
  //   this.deviceId = deviceId;
  // }

  // public get triggerObservable(): Observable<void> {
  //   return this.trigger.asObservable();
  // }

  // public get nextWebcamObservable(): Observable<boolean|string> {
  //   return this.nextWebcam.asObservable();
  // }

  // public onCapturedImageClick(): void {
  //   this.webcamImage = null;
  // }

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
