import { Component, OnInit } from '@angular/core';
import { HomeFilterService } from 'services/HomeFilterService/HomeFilterService';
@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent implements OnInit {

  public E1FloorPlan: any;
  public E2FloorPlan: any;
  public E3FloorPlan: any;
  public E1Layers: any;
  public E2Layers: any;
  public E3Layers: any;
  // public E1FloorPlan = false;
  // public E2FloorPlan = false;
  // public E3FloorPlan = true;

  // public E1Layers = [
  //   { room: 'E1R1', imagePath: 'assets/img/E1R1.png', isVisible: true },
  //   { room: 'E1R2', imagePath: 'assets/img/E1R2.png', isVisible: true },
  //   { room: 'E1R3', imagePath: 'assets/img/E1R3.png', isVisible: true },
  //   { room: 'E1R4', imagePath: 'assets/img/E1R4.png', isVisible: true },
  //   { room: 'E1R5', imagePath: 'assets/img/E1R5.png', isVisible: true },
  //   { room: 'E1R6', imagePath: 'assets/img/E1R6.png', isVisible: true },
  // ];

  // public E2Layers = [
  //   { room: 'E2R2', imagePath: 'assets/img/E2R2.png', isVisible: true },
  //   { room: 'E2R3', imagePath: 'assets/img/E2R3.png', isVisible: true },
  //   { room: 'E2R4', imagePath: 'assets/img/E2R4.png', isVisible: true },
  //   { room: 'E2R5', imagePath: 'assets/img/E2R5.png', isVisible: true },
  //   { room: 'E2R7', imagePath: 'assets/img/E2R7.png', isVisible: true },
  //   { room: 'E2R8', imagePath: 'assets/img/E2R8.png', isVisible: true },
  //   { room: 'E2R9', imagePath: 'assets/img/E2R9.png', isVisible: true },
  // ];

  // public E3Layers = [
  //   { room: 'E3R2', imagePath: 'assets/img/E3R2.png', isVisible: true },
  //   { room: 'E3R3', imagePath: 'assets/img/E3R3.png', isVisible: true },
  //   { room: 'E3R4', imagePath: 'assets/img/E3R4.png', isVisible: true },
  //   { room: 'E3R5', imagePath: 'assets/img/E3R5.png', isVisible: true },
  //   { room: 'E3R7', imagePath: 'assets/img/E3R7.png', isVisible: true },
  //   { room: 'E3R8', imagePath: 'assets/img/E3R8.png', isVisible: true },
  //   { room: 'E3R9', imagePath: 'assets/img/E3R9.png', isVisible: true },
  //   { room: 'E3R10', imagePath: 'assets/img/E3R10.png', isVisible: true },
  // ];

  constructor(private _HFS: HomeFilterService) {
    this._HFS.E1FloorPlan.subscribe(item => {
      this.E1FloorPlan = item;
    });
    this._HFS.E2FloorPlan.subscribe(item => {
      this.E2FloorPlan = item;
    });
    this._HFS.E3FloorPlan.subscribe(item => {
      this.E3FloorPlan = item;
    });

    this._HFS.E1Layers.subscribe(item => {
      this.E1Layers = item;
    });
    this._HFS.E2Layers.subscribe(item => {
      this.E2Layers = item;
    });
    this._HFS.E3Layers.subscribe(item => {
      this.E3Layers = item;
    });

  }

  togglePhases(phase) {
    console.log(phase);
    // this._HFS.togglePhases(phase);
    switch (phase) {
      case 'E1':
        this._HFS.E1FloorPlan.next(!this.E1FloorPlan);
        this._HFS.E2FloorPlan.next(false);
        this._HFS.E3FloorPlan.next(false);
        break;
      case 'E2':
        this._HFS.E1FloorPlan.next(false);
        this._HFS.E2FloorPlan.next(!this.E1FloorPlan);
        this._HFS.E3FloorPlan.next(false);
        break;
      case 'E3':
        this._HFS.E1FloorPlan.next(false);
        this._HFS.E2FloorPlan.next(false);
        this._HFS.E3FloorPlan.next(!this.E1FloorPlan);
        break;
    }
  }

  toggleE1Layers(layerToToggle: string) {

    for (let i = 0; i < this.E1Layers.length; i++) {
      if (layerToToggle === this.E1Layers[i].room) {
        this.E1Layers[i].isVisible = !this.E1Layers[i].isVisible;
      }
    }
  }

  toggleE2Layers(layerToToggle: string) {

    for (let i = 0; i < this.E2Layers.length; i++) {
      if (layerToToggle === this.E2Layers[i].room) {
        this.E2Layers[i].isVisible = !this.E2Layers[i].isVisible;
      }
    }
  }

  toggleE3Layers(layerToToggle: string) {

    for (let i = 0; i < this.E3Layers.length; i++) {
      if (layerToToggle === this.E3Layers[i].room) {
        this.E3Layers[i].isVisible = !this.E3Layers[i].isVisible;
      }
    }
  }


  ngOnInit() {
    this._HFS.E1FloorPlan.subscribe(item => {
      this.E1FloorPlan = item;
    });
    this._HFS.E2FloorPlan.subscribe(item => {
      this.E2FloorPlan = item;
    });
    this._HFS.E3FloorPlan.subscribe(item => {
      this.E3FloorPlan = item;
    });

    this._HFS.E1Layers.subscribe(item => {
      this.E1Layers = item;
    });
    this._HFS.E2Layers.subscribe(item => {
      this.E2Layers = item;
    });
    this._HFS.E3Layers.subscribe(item => {
      this.E3Layers = item;
    });

  }

}
