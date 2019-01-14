import { Component, OnInit } from '@angular/core';
import { FiltersService} from 'services/FilterService/Filters.service';
@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})
export class FilterbarComponent {
  public listItems: any[];
  public value: any[];
  constructor(private fs: FiltersService) {
    this.fs.DefaultFilterArray.subscribe(item=>{
      this.listItems = item;
    });
    this.fs.LocationFilterValues.subscribe(item=>{
      this.value = item;
    });
  }
   ngOnInit(): void {
    this.fs.DefaultFilterArray.subscribe(item=>{
      this.listItems = item;
    });
    this.fs.LocationFilterValues.subscribe(item=>{
      this.value = item;
    });
   }
   public sayHello(value:any):void{
    // console.log(value);
      this.fs.LocationFilterValues.next(value);
      // this.fs.DefaultFilterArray.subscribe(item=>{
      //   this.fs.LocationFilterValues.next(item);
      // });
  }
}
