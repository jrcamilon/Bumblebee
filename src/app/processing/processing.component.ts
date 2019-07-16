import { OnlineServiceService } from './../../services/OnlineServices/online-service.service';
import { TableGridService } from 'services/TableGridService/table-grid.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { CeramicsFormService } from 'services/CeramicFormService/ceramics-form.service';
import {MatSnackBar} from '@angular/material';
import { FormsService } from './services/forms.service';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';



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
  public completedCeramics = [];
  public formValue: any;


  // // Camera
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
    public webcamImageArray: WebcamImage[] = [];
    public isOnline = true;


    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  // onFormSelect(form: any) {
  //   this.selection = form;
  // }

  constructor(
    public snackBar: MatSnackBar,
    public _formsService: FormsService,
    public _onlineService: OnlineServiceService,
    public offlineDB: OfflineDBService,
    public _khpp: KhppFormService
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

  }

  ngOnInit() {
    this.selection = this.forms[1];
    // this.onFormSelect(this.selection);
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  save() {
    let toInsert: any = " ";
    switch (this.selection) {
      case 'Elephantine':
        console.log('Saving Elephantine');

        toInsert = this.completedCeramics.map(ele => {
          // console.log(ele);
          return new Object({
            locusNumber: ele.locusNumber ,
            application: ele.application === null ? 'null' : String(ele.application),
            blackened: ele.blackened === null ? 'null' : String(ele.blackened),
            comments: ele.comments === null ? 'null' : String(ele.comments),
            diameter: ele.diameter === null ? 'null' : String(ele.diameter),
            enteredBy: ele.enteredBy === null ? 'null' : String(ele.enteredBy),
            enteredDate: String(ele.enteredDate),
            fabric: ele.fabric === null ? 'null' : String(ele.fabric),
            ware: ele.ware === null ? 'null' : String(ele.ware),
            fabricVariant: ele.fabricVariant === null ? 'null' : String(ele.fabricVariant),
            typeVariant: ele.typeVariant === null ? 'null' : String(ele.typeVariant),
            incisedDecoration: String(ele.incisedDecoration),
            numberOfObjects: String(ele.numberOfObjects),
            objectGroupNum: String(ele.objectGroupNumber),
            objectNum: String(ele.objectNumber),
            paintedDecoration: ele.paintedDecoration === null ? 'null' : String(ele.paintedDecoration),
            photo: ele.image,
            preservations : ele.preservation === null ? 'null' : String(ele.preservation),
            processedDate: String(ele.processDate),
            processedBy: ele.processedBy === null ? 'null' : String(ele.processedBy),
            rlNum: ele.rlNumber === null ? 'null' : String(ele.rlNumber),
            sfCoating: ele.sfCoating === null ? 'null' : String(ele.sfCoating),
            sfTreatment : ele.sfTreatment === null ? 'null' : String(ele.sfTreatment),
            sheetNum: ele.sheetNumber === null ? 'null' : String(ele.sheetNumber),
            typeDescription: ele.typeDescription === null ? 'null' : String(ele.typeDescription),
            typeNum: ele.typeNumber === null ? 'null' : String(ele.typeNumber) + '.' + String(ele.typeVariant),
            weight: ele.weight === null ? 'null' : String(ele.weight),
         
          })
        });

        console.log(toInsert);
        this._formsService.writeElephantineToDB(toInsert[0]).subscribe(res => {
              if (res.status === 201) {
                console.log(res);
                this.openSnackBar();
              }
            });
        // for (let i = 0; i < toInsert.length; i++) {
        //   console.log(toInsert[i]);
        //   this._formsService.writeElephantineToDB(toInsert[i]).subscribe(res => {
        //     if (res.status === 201) {
        //       console.log(res);
        //       this.openSnackBar();
        //     }
        //   });
        // }

        // Clear the completed forms array and clear the service store.
        // this.completedForms = [];
        // this._formsService.activeForm.next(this.completedForms);

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
                this.openSnackBar();
              } else {

              }
            });
          }
        } else {
          console.log('cant post online;')
        }


          // Clear the completed forms array and clear the service store.
          // this.deleteOfflineDB();
          // this.completedForms = [];
          // // this._formsService.activeForm.next(this.completedForms);
          // this.offlineDB.clearAll();
          // this._khpp.responseObject.next([]);


        break;
    }
  }

  deleteOfflineDB() {
    this.offlineDB.clearAll();
    this.completedForms = [];
    this._khpp.responseObject.next([]);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 6000,
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
    // console.info('received webcam image', webcamImage, this.webcamImageArray);
    this.webcamImage = webcamImage;
    this.webcamImageArray.push(webcamImage);
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
