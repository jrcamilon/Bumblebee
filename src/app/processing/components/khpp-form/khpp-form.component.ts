import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsService } from 'app/processing/services/forms.service';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import { DataService } from 'app/data.service';
import { Subscription, Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
import { PopupAnchorDirective } from './popupanchor.directive';
import { map } from 'rxjs/operators';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
@Component({
    selector: 'app-khpp-form',
    templateUrl: './khpp-form.component.html',
    styleUrls: ['./khpp-form.component.scss']
})
export class KhppFormComponent implements OnInit {
    public view: any[];
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public formGroup: FormGroup;
    public chosenFabric: any = {
        FabricID: 1, FabricType: 'Coarse'
    };
    public chosenBodyOrDiagnostic: any = {
        bdID: 1, BD: 'Body'
    };
    public fabrics: any[] = [
        {
            FabricID: 1, FabricType: 'Coarse'
        },
        {
            FabricID: 2, FabricType: 'Medium'
        },
        {
            FabricID: 3, FabricType: 'Fine'
        },
        {
            FabricID: 4, FabricType: 'MK BM'
        },
        {
            FabricID: 5, FabricType: 'Marl'
        }];
    public bodOrDiagnostic: any[] = [
        {
            bdID: 1, BD: 'Body'
        },
        {
            bdID: 2, BD: 'Diagnostic'
        }];

    // private editService: KhppFormService;
    private editedRowIndex: number;

    constructor(private editService: KhppFormService, public isOnline: OnlineServiceService, public offlineDB: OfflineDBService) {

     this.editService.data.subscribe(item => {
        this.view = item;
        });
    
     
    }


    public ngOnInit(): void {
        // this.view = this.editService.pipe(map(data => process(data, this.gridState)));

        // this.editService.read();
    }
    public fabric(id: number): any {
        return this.fabrics.find(x => x.FabricID === id);
    }
    public bodyOrDiagnostic(id): any {
        return this.bodOrDiagnostic.find(x => x.bdID === id);

    }
    public onStateChange(state: State) {
        this.gridState = state;

        // this.editService.read();
    }

    public addHandler({ sender }) {
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'TagNumber': new FormControl('', Validators.required),
            'ProcessedBy': new FormControl('', Validators.required),
            'DueDate': new FormControl('', Validators.required),
            'FabricType': new FormControl('', Validators.required),
            'BodyOrDiagnostic': new FormControl('', Validators.required),
            'RimCount': new FormControl('', Validators.required),
            'RimWeight': new FormControl('', Validators.required),
            'BaseCount': new FormControl('', Validators.required),
            'BaseWeight': new FormControl('', Validators.required),
            'DecoratorCount': new FormControl('', Validators.required),
            'DecoratorWeight': new FormControl('', Validators.required),
            'Comments': new FormControl(''),

        });

        sender.addRow(this.formGroup);
    }

    public editHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);


        this.formGroup = new FormGroup({
            'TagNumber': new FormControl(dataItem.TagNumber, Validators.required),
            'ProcessedBy': new FormControl(dataItem.ProcessedBy, Validators.required),
            'DueDate': new FormControl(dataItem.DueDate, Validators.required),
            'FabricType': new FormControl(dataItem.FabricType, Validators.required),
            'BodyOrDiagnostic': new FormControl(dataItem.BodyOrDiagnostic, Validators.required),
            'RimCount': new FormControl(dataItem.RimCount, Validators.required),
            'RimWeight': new FormControl(dataItem.RimWeight, Validators.required),
            'BaseCount': new FormControl(dataItem.BaseCount, Validators.required),
            'BaseWeight': new FormControl(dataItem.BaseWeight, Validators.required),
            'DecoratorCount': new FormControl(dataItem.DecoratorCount, Validators.required),
            'DecoratorWeight': new FormControl(dataItem.DecoratorWeight, Validators.required),
            'Comments': new FormControl(dataItem.Comments),
        });

        this.editedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }) {
        // const product: Product = formGroup.value;

        console.log('Saving', formGroup.value);
        formGroup.value.FabricType = this.chosenFabric.FabricType;
        formGroup.value.BodyOrDiagnostic = this.chosenBodyOrDiagnostic.BD;
        console.log('UPDATED', formGroup.value);

        // Offline Save
        this.offlineDB.add(formGroup.value);

        this.editService.save(formGroup.value, isNew);

        sender.closeRow(rowIndex);
    }

    public removeHandler({ dataItem }) {
        // this.editService.remove(dataItem);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    public onFabricChange(e){
        console.log(e);
       this.chosenFabric = e;
       console.log(this.chosenFabric);

    }
    public onBodDiagnosticChange(e) {
       this.chosenBodyOrDiagnostic = this.bodOrDiagnostic.find(item =>  item.BD );
       console.log(this.chosenBodyOrDiagnostic);

        
    }
}
