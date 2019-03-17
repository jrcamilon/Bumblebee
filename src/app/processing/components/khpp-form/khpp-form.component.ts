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
@Component({
    selector: 'app-khpp-form',
    templateUrl: './khpp-form.component.html',
    styleUrls: ['./khpp-form.component.scss']
})
export class KhppFormComponent implements OnInit {

    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    /**Coarse Triage */
    public view: any[];
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

    private editedRowIndex: number;
    /**Body Sherds  */
    public bodySherd: any[];
    public bodySherdFormGroup: FormGroup;
    public chosenBodyFabric: any = {
        FabricID: 1, FabricType: 'Coarse'
    };
    fabricIsValid: Boolean = false;
    public chosenSurfaceTreatment: any = {
        stID: 1, ST: 'Unslipped'
    };
    public bodyFabrics: any[] = [
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
            FabricID: 5, FabricType: 'Marl-A'
        },
        {
            FabricID: 6, FabricType: 'Marl-C'
        },
        {
            FabricID: 7, FabricType: 'Other MArl'
        }];

    public stList: any[] = [];

    public bodyAllSurfaceTreatments: any[] = [
        {
            stID: 1, ST: 'Unslipped'
        },
        {
            stID: 2, ST: 'R Slip Out'
        },
        {
            stID: 3, ST: 'R Slip In'
        },
        {
            stID: 4, ST: 'R Slip Both'
        },
        {
            stID: 5, ST: 'Cream Slip In'
        },
        {
            stID: 6, ST: 'Cream Slip Out'
        },
        {
            stID: 7, ST: 'Cream Slip Both'
        }];
    public bodyMarlSurfaceTreatments: any[] = [{
        stID: 1, ST: 'See Comments'
    }];
    public bodyFineSurfaceTreatments: any[] = [{
        stID: 1, ST: 'Untreated'
    }]

    private bodyEditedRowIndex: number;
    /**TODO: Diagnostics */
    public diagnostics: any[];

    constructor(private editService: KhppFormService) {

        
        this.editService.data.subscribe(item => {
            this.view = item;
        });
        this.editService.bodySherdsData.subscribe(item=>{
            this.bodySherd = item;
        })
        switch (this.chosenBodyFabric.FabricID) {
            case 1:
                this.stList = this.bodyAllSurfaceTreatments;
                break;
            case 2:
                this.stList = this.bodyAllSurfaceTreatments;
                break;

            case 3:
                this.stList = this.bodyFineSurfaceTreatments;
                break;

            default:
                this.stList = this.bodyMarlSurfaceTreatments;
                break;
        }
    }


    public ngOnInit(): void {
        // this.view = this.editService.pipe(map(data => process(data, this.gridState)));

        // this.editService.read();
    }
    /** Body Sherds Processing Functions */

    public bodyFabric(id: number): any {
        return this.bodyFabrics.find(x => x.FabricID === id);

    }
    public surfaceTreatment(id: number): any {
        switch (this.chosenBodyFabric.FabricID) {
            case 1:
                return this.bodyAllSurfaceTreatments.find(x => x.stID === id);
            case 2:
                return this.bodyAllSurfaceTreatments.find(x => x.stID === id);
            case 3:
                return this.bodyFineSurfaceTreatments.find(x => x.stID === id);
            default:
                return this.bodyMarlSurfaceTreatments.find(x => x.stID === id);
        }
    }

    public addBodyHandler({ sender }) {
        this.closeEditor(sender);

        this.bodySherdFormGroup = new FormGroup({
            'FabricType': new FormControl('', Validators.required),
            'SurfaceTreatment': new FormControl('', Validators.required),
            'Normal': new FormControl('', Validators.required),
            'FireIn': new FormControl('', Validators.required),
            'FireOut': new FormControl('', Validators.required),
            'FireBoth': new FormControl('', Validators.required),
            'RimsTSTC': new FormControl('', Validators.required),
            'Other': new FormControl('', Validators.required),
        });

        sender.addRow(this.bodySherdFormGroup);
    }

    public editBodyHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);


        this.bodySherdFormGroup = new FormGroup({
            'FabricType': new FormControl(dataItem.FabricType, Validators.required),
            'SurfaceTreatment': new FormControl(dataItem.SurfaceTreatment, Validators.required),
            'Normal': new FormControl(dataItem.Normal, Validators.required),
            'FireIn': new FormControl(dataItem.FireIn, Validators.required),
            'FireOut': new FormControl(dataItem.FireOut, Validators.required),
            'FireBoth': new FormControl(dataItem.FireBoth, Validators.required),
            'RimsTSTC': new FormControl(dataItem.RimsTSTC, Validators.required),
            'Other': new FormControl(dataItem.Other, Validators.required),
        });

        this.bodyEditedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.bodySherdFormGroup);
    }

    public cancelBodyHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveBodyHandler({ sender, rowIndex, bodySherdFormGroup, isNew }) {
        // const product: Product = formGroup.value;

        console.log('Saving', bodySherdFormGroup.value);
        bodySherdFormGroup.value.FabricType = this.chosenBodyFabric;
        bodySherdFormGroup.value.SurfaceTreatment = this.chosenSurfaceTreatment;
        console.log('UPDATED', bodySherdFormGroup.value);

        this.editService.saveBody(bodySherdFormGroup.value, isNew);

        sender.closeRow(rowIndex);
    }

    public removeBodyHandler({ dataItem }) {
        // this.editService.remove(dataItem);
    }

    private closeBodyEditor(grid, rowIndex = this.bodyEditedRowIndex) {
        grid.closeRow(rowIndex);
        this.bodyEditedRowIndex = undefined;
        this.bodySherdFormGroup = undefined;
    }

    public onBodyFabricChange(e) {
        console.log(e);
        this.chosenBodyFabric = e;
        console.log(this.chosenBodyFabric);

    }
    public onBodySurfaceChange(e) {
        this.chosenSurfaceTreatment = e;
        console.log(this.chosenSurfaceTreatment);


    }
    /**Coarse Triage Functions */
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
        formGroup.value.FabricType = this.chosenFabric;
        formGroup.value.BodyOrDiagnostic = this.chosenBodyOrDiagnostic;
        console.log('UPDATED', formGroup.value);

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

    public onFabricChange(e) {
        console.log(e);
        this.chosenFabric = e;
        console.log(this.chosenFabric);

    }
    public onBodDiagnosticChange(e) {
        this.chosenBodyOrDiagnostic = e;
        console.log(this.chosenBodyOrDiagnostic);


    }
}
