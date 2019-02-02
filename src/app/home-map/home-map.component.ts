import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent implements OnInit {

  public layer1 = false;
  public layer2 = false;
  constructor() { }

  toggleLayer(layer: string) {
    switch (layer) {
      case 'layer1':
      this.layer1 = !this.layer1;
      break;
      case 'layer2':
      this.layer2 = !this.layer2;
      break;
    }


  }

  ngOnInit() {
  }

}
