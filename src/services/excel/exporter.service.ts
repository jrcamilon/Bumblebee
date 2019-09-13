import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ; charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor() { }

  public exportToExcel(data: any, excelFileName: string): void {
    console.log('exporting to excel');
    const detailedWorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.detailed);
    const basicWorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.basic);

    const workbook: XLSX.WorkBook = {
      Sheets: {},
      SheetNames: []
    };


    workbook.SheetNames.push('Detailed'); workbook.Sheets['Detailed'] = detailedWorkSheet;
    workbook.SheetNames.push('Basic'); workbook.Sheets['Basic'] = basicWorkSheet;

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    // call method buffer and fileName
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    console.log('saving as excel');
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_EXPORT_' + new Date().toLocaleDateString() + EXCEL_EXTENSION);
  }
}
