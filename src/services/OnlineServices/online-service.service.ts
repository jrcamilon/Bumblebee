import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineServiceService implements OnInit {

  public isOnline = new BehaviorSubject<any>(true);


  constructor() {
    window.addEventListener('online', () => {
    this.isOnline.next(navigator.onLine);
    });
    window.addEventListener('offline', () => {
      this.isOnline.next(navigator.onLine);
    });
  }

  ngOnInit() {
    // window.addEventListener('online', () => {
    //   this.isOnline.next(navigator.onLine);
    //   });
    //   window.addEventListener('offline', () => {
    //     this.isOnline.next(navigator.onLine);
    //   });
  }


}
