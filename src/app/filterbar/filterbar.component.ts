import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'services/FilterService/Filters.service';
import { HomeFilterService } from 'services/HomeFilterService/HomeFilterService';
@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})
export class FilterbarComponent {
  public E1FloorPlan: any;
  public E2FloorPlan: any;
  public E3FloorPlan: any;
  public phase: any;
  public listItems: any[];
  public value: any[];
  public phaseFilterList: any[];
  public roomFilterList: any[];
  public copyOfLayers: any[];
  public rooms: any[];
  constructor(
    private fs: FiltersService,
    private hfs: HomeFilterService) {
    this.fs.DefaultFilterArray.subscribe(item => {
      this.listItems = item;
    });
    this.fs.LocationFilterValues.subscribe(item => {
      this.value = item;
    });
    this.hfs.DefaultPhaseFilters.subscribe(item => {
      this.phaseFilterList = item;
    });
    this.hfs.DefaultRoomFilters.subscribe(item => {
      this.roomFilterList = item;
    });
    this.hfs.E1FloorPlan.subscribe(item => {
      this.E1FloorPlan = item;
    });
    this.hfs.E2FloorPlan.subscribe(item => {
      this.E2FloorPlan = item;
    });
    this.hfs.E3FloorPlan.subscribe(item => {
      this.E3FloorPlan = item;
    });
    this.hfs.ChosenPhaseFilters.subscribe(item => {
      this.phase = item;
    })
    this.hfs.ChosenRoomFilters.subscribe(item => {
      this.rooms = item;
    })
  }
  ngOnInit(): void {
    this.fs.DefaultFilterArray.subscribe(item => {
      this.listItems = item;
    });
    this.fs.LocationFilterValues.subscribe(item => {
      this.value = item;
    });
    // this.hfs.DefaultPhaseFilters.subscribe(item => {
    //   this.phaseFilterList = item;
    // });
    // this.hfs.DefaultRoomFilters.subscribe(item => {
    //   this.roomFilterList = item;
    // });
    this.hfs.E1FloorPlan.subscribe(item => {
      this.E1FloorPlan = item;
    });
    this.hfs.E2FloorPlan.subscribe(item => {
      this.E2FloorPlan = item;
    });
    this.hfs.E3FloorPlan.subscribe(item => {
      this.E3FloorPlan = item;
    });
  }
  public sayHello(value: any): void {
    console.log(value);
    this.fs.LocationFilterValues.next(value);
    // this.fs.DefaultFilterArray.subscribe(item=>{
    //   this.fs.LocationFilterValues.next(item);
    // });
  }
  public changePhase(value: any): void {
    this.rooms = [];
    this.phase = value;
    this.hfs.ChosenPhaseFilters.next(value);
    switch (value) {
      case 'Phase E1':
        this.hfs.DefaultE1Layers.subscribe(item => {
          this.hfs.E1Layers.next(item.map(layer => {
            return { ...layer, isVisible: true }
          }));
          this.hfs.DefaultRoomFilters.next(item);
        });

        this.hfs.E1FloorPlan.next(true);
        this.hfs.E2FloorPlan.next(false);
        this.hfs.E3FloorPlan.next(false);
        break;
      case 'Phase E2':

        this.hfs.DefaultE2Layers.subscribe(item => {
          this.hfs.E2Layers.next(item.map(layer => {
            return { ...layer, isVisible: true }
          }));
          this.hfs.DefaultRoomFilters.next(item);

        });
        this.hfs.E1FloorPlan.next(false);
        this.hfs.E2FloorPlan.next(true);
        this.hfs.E3FloorPlan.next(false);
        break;
      case 'Phase E3':

        this.hfs.DefaultE3Layers.subscribe(item => {
          this.hfs.E3Layers.next(item.map(layer => {
            return { ...layer, isVisible: true }
          }));
          this.hfs.DefaultRoomFilters.next(item);

        });
        this.hfs.E1FloorPlan.next(false);
        this.hfs.E2FloorPlan.next(false);
        this.hfs.E3FloorPlan.next(true);
        this.hfs.E3Layers.subscribe(item => {
        })
        break;
    }
    this.hfs.ChosenRoomFilters.next([]);
  }

  public changeRoom(value: any): void {
    this.rooms = value;
    this.hfs.ChosenRoomFilters.next(value);
    if (this.E1FloorPlan) {
      this.hfs.E1Layers.subscribe(item => {
        this.copyOfLayers = Object.assign([], item);
      })

      if (value.length === 0) {
        this.hfs.E1Layers.next(this.copyOfLayers.map(item => {
          return { ...item, isVisible: true }
        }))
      } else {
        this.copyOfLayers.forEach(item => {
          item.isVisible = false;
          value.forEach(room => {
            if (item.room == room.room) {
              item.isVisible = true;
            }
          })
        })

        this.hfs.E1Layers.next(this.copyOfLayers);
      }
    } else if (this.E2FloorPlan) {
      this.hfs.E2Layers.subscribe(item => {
        this.copyOfLayers = Object.assign([], item);
      })

      if (value.length === 0) {
        this.hfs.E2Layers.next(this.copyOfLayers.map(item => {
          return { ...item, isVisible: true }
        }))
      } else {
        this.copyOfLayers.forEach(item => {
          item.isVisible = false;
          value.forEach(room => {
            if (item.room == room.room) {
              item.isVisible = true;
            }
          })
        })
        this.hfs.E2Layers.next(this.copyOfLayers);
      }
    } else {
      this.hfs.E3Layers.subscribe(item => {
        this.copyOfLayers = Object.assign([], item);
      })

      if (value.length === 0) {
        this.hfs.E3Layers.next(this.copyOfLayers.map(item => {
          return { ...item, isVisible: true }
        }))
      } else {
        this.copyOfLayers.forEach(item => {
          item.isVisible = false;
          value.forEach(room => {
            if (item.room == room.room) {
              item.isVisible = true;
            }
          })
        })

        this.hfs.E3Layers.next(this.copyOfLayers);
      }
    }
  }
}
