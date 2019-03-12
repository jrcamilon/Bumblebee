import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineServiceService implements OnInit {

  public isOnline = new BehaviorSubject<any>(false);


  constructor() {
    window.addEventListener('online', () => {
    this.isOnline.next(navigator.onLine);
    // 🦄🎊🔥 we're back online!
    });
    window.addEventListener('offline', () => {
      this.isOnline.next(navigator.onLine);
      // 👨‍💻🙅‍😱 oh no!
    });
  }

  ngOnInit() {
    window.addEventListener('online', () => {
      this.isOnline.next(navigator.onLine);
      // 🦄🎊🔥 we're back online!
      });
      window.addEventListener('offline', () => {
        this.isOnline.next(navigator.onLine);
        // 👨‍💻🙅‍😱 oh no!
      });
   
  }
  

}
