import { ElephantModel } from 'app/processing/components/models/elephant-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridDataService {

constructor() { }

processData(data: ElephantModel[]) {
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
