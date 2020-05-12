import { KHPPForm, TodoWithID } from './../services/OfflineDB/offline-db.service';
import { DataService } from 'app/data.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
import { LoginService } from './login-page/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
     todosList: Array<TodoWithID> = [];

    //  isAuthenticated = false;

    constructor(public location: Location, public offlineDB: OfflineDBService, public auth: LoginService) {
      // auth.isAuthenticated.subscribe(res => {
      //   console.log('RES', res);
      //   this.isAuthenticated = res;
      // });
    }


    ngOnInit() {

    }

    isMap (path) {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if (path === titlee) {
        return false;
      } else {
        return true;
      }
    }
}
