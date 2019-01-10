import { Component, OnInit } from '@angular/core';
import { FiltersService} from './Filters.service'
@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})
export class FilterbarComponent {
  public listItems: any[];
  public value: any[];
  constructor(private fs: FiltersService) {
  }
   ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.
      this.fs.LocationFilterArray.subscribe(res=>{
        this.listItems = res;
        this.value = res;
      });
   }
   public sayHello(value:any):void{
    console.log(value);
  }
}