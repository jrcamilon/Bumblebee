import { FormsService } from './../../services/forms.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from 'app/data.service';
import { Subscription } from 'rxjs';
import { ElephantModel } from '../models/elephant-model';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import { TypesService} from 'services/TypeService/types.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-ceramics-form',
  templateUrl: './ceramics-form.component.html',
  styleUrls: ['./ceramics-form.component.scss']
})
export class CeramicsFormComponent implements OnInit {

  public ceramicsForm: FormGroup;
  public formBuilder: FormBuilder = new FormBuilder();
  public elephantData: any;
  public currentRecordIndex = 0;
  public isFormsDisabled = true;
  public mockData: Subscription;
  public buttonMode = 'Save';
  public formsSubmitted = [];
  isOnline: any;
  public webCamImages = [];
  // CAMERA

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


  constructor(public _onlineService: OnlineServiceService,
       public fb: FormBuilder,
        public _dataService: DataService, 
        public _formsService: FormsService,
        public _typeService: TypesService) {

          // this._typeService.Types.subscribe(item=>{
          //   console.log('Available Types: ',item);
          // })
          // this._typeService.Variants.subscribe(item=>{
          //   console.log('Available Variants: ',item);
          // })
          this._typeService.getTypeVariantsLocations().subscribe(item=>{
            console.log(item);
          })
    this.ceramicsForm = fb.group({
      locusNumber: ['', Validators.compose([Validators.required])],
      locusNumPre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[a-zA-z]*'),
        Validators.maxLength(1)])],
      locusNumSuf: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-z]*'),
        Validators.minLength(1),
        Validators.maxLength(1)])],
      objectGroupNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.pattern('[0-9]*')])],
      objectNumber: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.pattern('[0-9]*')])],
      numberOfObjects: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(4),
        Validators.pattern('[0-9]*')])],
      typeDescription: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      typeNumber: null,
      weight: null,
      fabric: null,
      diameter: null,
      preservation: null,
      sfCoating: null,
      sfTreatment: null,
      blackened: null,
      incisedDecoration: null,
      application: null,
      paintedDecoration: null,
      comments: null,
      photo: null,
      processedBy: null,
      processDate: null,
      enteredBy: null,
      enteredDate: null,
      rlNumber: null,
      sheetNumber: null
    });

    this._onlineService.isOnline.subscribe(item=>{
      this.isOnline = item;
    })
  }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  submitForm(formValue: any) {
    if (this.webcamImage !== null) {
      console.log(this.webcamImage.imageAsBase64);
      console.log(this.webcamImage.imageData);
      formValue.image = this.webcamImage.imageAsBase64;
    }
    console.log(formValue);
    this.formsSubmitted.push(formValue);
    this.ceramicsForm.reset();
    if (this.isOnline) {
      //Send Straight to DataServices to post to API
    } else {
      //Save to local DB to save when Online
    }
    this._formsService.activeForm.next(this.formsSubmitted);

  }

  disable() {
    const state = this.isFormsDisabled;
    if (state) {
      this.ceramicsForm.disable();
    } else { this.ceramicsForm.enable(); }
    this.isFormsDisabled = !state;
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
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    console.log(webcamImage.imageAsBase64);
    console.log(webcamImage.imageData);
    this.webcamImage = webcamImage;
    this.webCamImages.push(webcamImage);
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
