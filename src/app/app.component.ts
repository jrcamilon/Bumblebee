import { Todo, TodoWithID } from './../services/OfflineDB/offline-db.service';
import { DataService } from 'app/data.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
     todosList: Array<TodoWithID> = [];

    constructor(public location: Location, public offlineDB: OfflineDBService) {
      // Add to offlineDB
      // const todo: Todo = {
      //   title: 'hello',
      //   done: false,
      // };
      // this.offlineDB
      //   .add(todo)
      //   .then((id) => {
      //     this.todosList = [...this.todosList, Object.assign({}, todo, { id })];
      //   });
    }


    ngOnInit() {
      this.offlineDB.getAll().then( res => {
        console.log(res);
      })
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
