import { Injectable } from '@angular/core';
import { ElephantModel } from 'app/processing/components/models/elephant-model';

@Injectable({
  providedIn: 'root'
})
export class TableGridService {

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
        dateOfEntry: this.dateFormatter(res.dateOfEntry),
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

dateFormatter(stringDate: string) {
  return new Date(stringDate);
}

processElephantine(data: ElephantModel[]) {
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
      Category: {
        typeDescription: res.typeDescription,
        comments: res.comments,
        paintedDecoration: res.paintedDecoration,
        photo: res.photo,
        processedBy: res.processedBy,
        processedDate: res.processedDate,
        enteredBy: res.enteredBy,
        enteredDate: res.enteredDate,
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
