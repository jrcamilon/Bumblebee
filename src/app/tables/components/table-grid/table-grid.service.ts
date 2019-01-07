import { Injectable } from '@angular/core';
import { ElephantModel } from 'app/processing/components/models/elephant-model';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class TableGridService {

public selectedMarkers = new Subject<any>();


constructor() { }

processRed(data: any[]) {
  return data.map(res => {
    return new Object({
      id: res.id,
      locusNum: res.locusNum,
      objectNum: res.objectNum,
      unitNum: res.unitNum,
      specialNotes: res.specialNotes,
      Category: {
        bodyCoarseCount: res.bodyCoarseCount,
        bodyCoarseWeight: res.bodyCoarseWeight,
        bodyFineCount: res.bodyFineCount,
        bodyFineWeight: res.bodyFineWeight,
        bodyMarlCount: res.bodyMarlCount,
        bodyMarlWeight:  res.bodyMarlWeight,
        bodyMediumCount: res.bodyMediumCount,
        bodyMediumWeight: res.bodyMediumWeight,
        bodyTotalCount: res.bodyTotalCount,
        bodyTotalWeight: res.bodyTotalWeight,
        dateOfEntry: this.dateFormatter(res.dateOfEntry, 'dd/mm/yyyy'),
        diagnosticCoarseCount: res.diagnosticCoarseCount,
        diagnosticCoarseWeight: res.diagnosticCoarseWeight,
        diagnosticFineCount: res.diagnosticFineCount,
        diagnosticFineWeight: res.diagnosticFineWeight,
        diagnosticMarlCount: res.diagnosticMarlCount,
        diagnosticMarlWeight: res.diagnosticMarlWeight,
        diagnosticMediumCount: res.diagnosticMediumCount,
        diagnosticMediumWeight: res.diagnosticMediumWeight,
        diagnosticTotalCount: res.diagnosticTotalCount,
        specialNotes: res.specialNotes
      }
    })
  })
}

dateFormatter(stringDate: string, currentFormat: string) {
  let returnDate;
  switch (currentFormat) {
    case 'dd/mm/yyyy':
      returnDate = new Date(stringDate);
      break;
    case 'mm/dd/yyyy':
      const datearray = stringDate.split("/");
      returnDate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
      break;
  }
  return returnDate;
}

processElephantine(data: any[]) {
  return data.map(res => {
    return new Object({
      locusNum: res.locusNum,
      id: res.id,
      objectGroupNum: res.objectGroupNum,
      objectNum: res.objectNum,
      numberOfObjects: res.numberOfObjects,
      typeNum: res.typeNum,
      weight: res.weight,
      fabric: res.fabric,
      diameter: res.diameter,
      lat: res.lat,
      lng: res.lng,
      Category: {
        typeDescription: res.typeDescription,
        comments: res.comments,
        paintedDecoration: res.paintedDecoration,
        photo: res.photo,
        processedBy: res.processedBy,
        processedDate: this.dateFormatter(res.processedDate, 'mm/dd/yyyy'),
        enteredBy: res.enteredBy,
        enteredDate: this.dateFormatter(res.enteredDate, 'dd/mm/yyyy'),
        preservations:  res.preservations,
        sfCoating: res.sfCoating,
        sfTreatment: res.sfTreatment,
        blackened:  res.blackened,
        incisedDecoration: res.incisedDecoration,
        application: res.application,
        rlNum: res.rlNum,
        sheetNum: res.sheetNum,
      }
    });
  });
}
}
