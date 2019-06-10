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
import { ceramicTypes } from './ceramic-types';
import * as _ from 'lodash';  

interface CeramicTypes {
  image: string,
  objectNums: string[],
  typeDesc: string,
  family: string,
  familyDesc: string,
}

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
  public ceramicFamilyTypes;
  selectedValue = '';
  typeDescription = '';
  public familyImages;

  visibleTab = 'input';

  public typeNums: Array<string> = [];
  public typeVariants: Array<string> = [];
  public data: Array<string> = [];
  selecteType: any = undefined;
  found = false;

  public isOnline: any;
  public imageObjectData: any;
  public webCamImages = [];

  // CAMERA

    public todaysDate = new Date();
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

          this._typeService.getTypeVariantsLocations().subscribe(item => {
            this.typeNums = item.typeNum.map(ele => { return ele.typenum });
            this.data = this.typeNums.slice();
            this.typeVariants = item.variants.map(ele => { return ele.typeVariant }).filter((ele) => { return ele !== null});
          });

    this.createFamilyTypes();

    this.ceramicsForm = fb.group({
      locusNumber: ['', Validators.compose([Validators.required])],
      // locusNumPre: ['', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(1),
      //   Validators.pattern('[a-zA-z]*'),
      //   Validators.maxLength(1)])],
      // locusNumSuf: ['', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('[a-zA-z]*'),
      //   Validators.minLength(1),
      //   Validators.maxLength(1)])],
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
      typeDescription: null,
      typeFamily: ['', Validators.compose([Validators.required])],
      typeNumber: null,
      typeVariant: null,
      weight: null,
      fabric: null,
      ware: null,
      fabricVariant: null,
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
      processedBy: ['', Validators.compose([Validators.required])],
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

  createFamilyTypes() {
    this.ceramicFamilyTypes = _.uniqBy(ceramicTypes, (e) => {
      return e.family;
    });
  }

  submitForm(formValue: any) {
    if (this.webcamImage !== null) {
      console.log(this.webcamImage.imageAsBase64);
      console.log(this.webcamImage.imageData);
      formValue.image = this.webcamImage.imageAsBase64;
    }

    formValue.typeNumber = this.selectedValue;
    formValue.typeDescription = this.typeDescription;
    this.formsSubmitted.push(formValue);
    this.ceramicsForm.reset();
    // if (this.isOnline) {
    //   //Send Straight to DataServices to post to API
    // } else {
    //   //Save to local DB to save when Online
    // }
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

  public handleFilter(value: any) {
    this.data = this.typeNums.filter((s) => s.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public toggleScreens(value: string): void {
    this.visibleTab = value;
  }

  public onFamilySelect(value: any) {
    const matchingFamily = ceramicTypes.filter(e => {
      return e.family === value;
    });

    this.selectedValue = matchingFamily[0].image;
    this.typeDescription = matchingFamily[0].typeDesc;
    this.familyImages = matchingFamily;
  }

  public getImage(item: any) {
    const image =  'assets/ceramics/' + item.image + '.png';
    return image;
  }

  public onSelectImage(item: any) {

    const words = item.image.split('.');
    console.log(item);
    this.selectedValue = item.image;
    this.ceramicsForm.value.typeNumber = item.image;
    console.log(words);
    this.typeDescription = item.typeDesc;
  }

  public getTypeImage() {
    let found = false;
    let foundImage = '/assets/ceramics/BSD.png'
    for (let i = 0; i < ceramicTypes.length; i++) {
      if (ceramicTypes[i].image === this.ceramicsForm.value.typeNumber) {
        found = true;
      }
    }

    if (found === true) {
      const selected = this.ceramicsForm.value.typeNumber ? this.ceramicsForm.value.typeNumber : 'NO_IMAGE'
      // console.log('selected', selected);
      const imageObjectData = ceramicTypes.map(ele => {
        if (ele.image === selected) { return ele; } else { return undefined }})
        .filter(( ele ) => { return ele !== undefined; });

      this.imageObjectData = imageObjectData[0] === undefined ? {
        image: 'O.A1.2',
        objectNums: ['47501C/b-1-17 (Ø13, NS III)', '47501L/b-1-10 (Ø11, NS III.b)'],
        typeDesc: 'fine dish with direct rim',
        family: 'O.A1',
        familyDesc: 'Dishes with direct rim'
      } : imageObjectData[0];


      foundImage =  '/assets/ceramics/' + selected + '.png';
    }

    return foundImage;

  }


}
