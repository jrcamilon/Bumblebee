import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeFilterService {

    public DefaultPhaseFilters = new BehaviorSubject<any>(['Phase E1', 'Phase E2', 'Phase E3']);
    public DefaultRoomFilters = new BehaviorSubject<any>([
        { room: 'E1R1', imagePath: 'assets/img/E1R1.png', isVisible: true },
        { room: 'E1R2', imagePath: 'assets/img/E1R2.png', isVisible: true },
        { room: 'E1R3', imagePath: 'assets/img/E1R3.png', isVisible: true },
        { room: 'E1R4', imagePath: 'assets/img/E1R4.png', isVisible: true },
        { room: 'E1R5', imagePath: 'assets/img/E1R5.png', isVisible: true },
        { room: 'E1R6', imagePath: 'assets/img/E1R6.png', isVisible: true },
    ]);
    public ChosenPhaseFilters = new BehaviorSubject<any>('Phase E1');
    public ChosenRoomFilters = new BehaviorSubject<any>([]);

    public E1FloorPlan = new BehaviorSubject<boolean>(true);
    public E2FloorPlan = new BehaviorSubject<boolean>(false);
    public E3FloorPlan = new BehaviorSubject<boolean>(false);

    public DefaultE1Layers = new BehaviorSubject<any>([
        { room: 'E1R1', imagePath: 'assets/img/E1R1.png', isVisible: true },
        { room: 'E1R2', imagePath: 'assets/img/E1R2.png', isVisible: true },
        { room: 'E1R3', imagePath: 'assets/img/E1R3.png', isVisible: true },
        { room: 'E1R4', imagePath: 'assets/img/E1R4.png', isVisible: true },
        { room: 'E1R5', imagePath: 'assets/img/E1R5.png', isVisible: true },
        { room: 'E1R6', imagePath: 'assets/img/E1R6.png', isVisible: true },
    ]);

    public DefaultE2Layers = new BehaviorSubject<any>([
        { room: 'E2R2', imagePath: 'assets/img/E2R2.png', isVisible: true },
        { room: 'E2R3', imagePath: 'assets/img/E2R3.png', isVisible: true },
        { room: 'E2R4', imagePath: 'assets/img/E2R4.png', isVisible: true },
        { room: 'E2R5', imagePath: 'assets/img/E2R5.png', isVisible: true },
        { room: 'E2R7', imagePath: 'assets/img/E2R7.png', isVisible: true },
        { room: 'E2R8', imagePath: 'assets/img/E2R8.png', isVisible: true },
        { room: 'E2R9', imagePath: 'assets/img/E2R9.png', isVisible: true },
    ]);

    public DefaultE3Layers = new BehaviorSubject<any>([
        { room: 'E3R2', imagePath: 'assets/img/E3R2.png', isVisible: true },
        { room: 'E3R3', imagePath: 'assets/img/E3R3.png', isVisible: true },
        { room: 'E3R4', imagePath: 'assets/img/E3R4.png', isVisible: true },
        { room: 'E3R5', imagePath: 'assets/img/E3R5.png', isVisible: true },
        { room: 'E3R7', imagePath: 'assets/img/E3R7.png', isVisible: true },
        { room: 'E3R8', imagePath: 'assets/img/E3R8.png', isVisible: true },
        { room: 'E3R9', imagePath: 'assets/img/E3R9.png', isVisible: true },
        { room: 'E3R10', imagePath: 'assets/img/E3R10.png', isVisible: true },
    ]);
    public E1Layers = new BehaviorSubject<any>([
        { room: 'E1R1', imagePath: 'assets/img/E1R1.png', isVisible: true },
        { room: 'E1R2', imagePath: 'assets/img/E1R2.png', isVisible: true },
        { room: 'E1R3', imagePath: 'assets/img/E1R3.png', isVisible: true },
        { room: 'E1R4', imagePath: 'assets/img/E1R4.png', isVisible: true },
        { room: 'E1R5', imagePath: 'assets/img/E1R5.png', isVisible: true },
        { room: 'E1R6', imagePath: 'assets/img/E1R6.png', isVisible: true },
    ]);

    public E2Layers = new BehaviorSubject<any>([
        { room: 'E2R2', imagePath: 'assets/img/E2R2.png', isVisible: true },
        { room: 'E2R3', imagePath: 'assets/img/E2R3.png', isVisible: true },
        { room: 'E2R4', imagePath: 'assets/img/E2R4.png', isVisible: true },
        { room: 'E2R5', imagePath: 'assets/img/E2R5.png', isVisible: true },
        { room: 'E2R7', imagePath: 'assets/img/E2R7.png', isVisible: true },
        { room: 'E2R8', imagePath: 'assets/img/E2R8.png', isVisible: true },
        { room: 'E2R9', imagePath: 'assets/img/E2R9.png', isVisible: true },
    ]);

    public E3Layers = new BehaviorSubject<any>([
        { room: 'E3R2', imagePath: 'assets/img/E3R2.png', isVisible: true },
        { room: 'E3R3', imagePath: 'assets/img/E3R3.png', isVisible: true },
        { room: 'E3R4', imagePath: 'assets/img/E3R4.png', isVisible: true },
        { room: 'E3R5', imagePath: 'assets/img/E3R5.png', isVisible: true },
        { room: 'E3R7', imagePath: 'assets/img/E3R7.png', isVisible: true },
        { room: 'E3R8', imagePath: 'assets/img/E3R8.png', isVisible: true },
        { room: 'E3R9', imagePath: 'assets/img/E3R9.png', isVisible: true },
        { room: 'E3R10', imagePath: 'assets/img/E3R10.png', isVisible: true },
    ]);


    constructor() { }


}
