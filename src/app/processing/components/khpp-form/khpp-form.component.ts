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

    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    public isKGs = false;

    public tagNumber = '';
    public processedby = '';
    public dueDate = '';

    public isFormBodyVisible = false;
    public isFieldsLocked = false;

    // Coarse Triage
    public view: any[];
    public formGroup: FormGroup;
    public chosenFabric: any = {
        FabricID: 1, FabricType: 'Coarse'
    };
    public chosenBodyOrDiagnostic: any = { bdID: 1, BD: 'Body'};
    public chosenOption: any = { optID: 1, type: 'Body' };
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
        { bdID: 1, BD: 'Body'},
        { bdID: 2, BD: 'Diagnostic'}];


    public optionsList: any[] = [
        { optID: 1, type: 'Body'},
        { optID: 1, type: 'Rim'},
        { optID: 1, type: 'Base'},
        { optID: 1, type: 'Decorated'},
    ];

    private editedRowIndex: number;

    // Body Sherds
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
    public stList: any[] = [
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
    public allBodySurfaceTreatments: any[] = [
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
        },
        {
            stID: 1, ST: 'See Comments'
        },
        {
            stID: 1, ST: 'Untreated'
        }];
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
        }
    ];
    public bodyMarlSurfaceTreatments: any[] = [{
        stID: 1, ST: 'See Comments'
    }];
    public bodyFineSurfaceTreatments: any[] = [{
        stID: 1, ST: 'Untreated'
    }];
    private bodyEditedRowIndex: number;

    public diagnostics: any[];
    bodyGridState: State;

    constructor(private editService: KhppFormService, public isOnline: OnlineServiceService, public offlineDB: OfflineDBService) {

        this.editService.data.subscribe(item => {
            this.view = item;
        });
        this.editService.bodySherdsData.subscribe(item => {
            this.bodySherd = item;
        })
        this.editService.responseObject.subscribe(item => {
            console.log('Response Object', item);
        })


    }


    public ngOnInit(): void {
        // this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        // this.editService.read();
        this.tagNumber = 'D1234567891234';
        this.dueDate = '07-11-1987';
        this.processedby = ' JR';
    }
    /** Body Sherds Processing Functions */

    public bodyFabric(id: number): any {
        return this.bodyFabrics.find(x => x.FabricType === id);

    }
    public surfaceTreatment(id: number): any {
        switch (this.chosenBodyFabric) {
            case 'Coarse':
                this.stList = this.bodyAllSurfaceTreatments;
                break;
            case 'Medium':
                this.stList = this.bodyAllSurfaceTreatments;
                break;
            case 'Fine':
                this.stList = this.bodyFineSurfaceTreatments;
                break;
            default:
                this.stList = this.bodyMarlSurfaceTreatments;
                break;
        }
        return this.allBodySurfaceTreatments.find(x => x.ST === id);

    }

    public onCheckBoxChange() {
        this.isKGs = !this.isKGs;
    }

    public addBodyHandler({ sender }) {
        console.log(sender);
        this.closeEditor(sender);

        this.bodySherdFormGroup = new FormGroup({
            'FabricType': new FormControl('', Validators.required),
            'SurfaceTreatment': new FormControl('', Validators.required),
            'NormalWeight': new FormControl('', Validators.required),
            'NormalCount': new FormControl('', Validators.required),
            'FireInWeight': new FormControl('', Validators.required),
            'FireInCount': new FormControl('', Validators.required),
            'FireOutWeight': new FormControl('', Validators.required),
            'FireOutCount': new FormControl('', Validators.required),
            'FireBothWeight': new FormControl('', Validators.required),
            'FireBothCount': new FormControl('', Validators.required),
            'RimsTSTC': new FormControl('', Validators.required),
            'Other': new FormControl('', Validators.required),
        });
        sender.addRow(this.bodySherdFormGroup);
    }

    public editBodyHandler({ sender, rowIndex, dataItem }) {
        this.closeEditor(sender);


        this.bodySherdFormGroup = new FormGroup({
            'FabricType': new FormControl('', Validators.required),
            'SurfaceTreatment': new FormControl('', Validators.required),
            'NormalWeight': new FormControl('', Validators.required),
            'NormalCount': new FormControl('', Validators.required),
            'FireInWeight': new FormControl('', Validators.required),
            'FireInCount': new FormControl('', Validators.required),
            'FireOutWeight': new FormControl('', Validators.required),
            'FireOutCount': new FormControl('', Validators.required),
            'FireBothWeight': new FormControl('', Validators.required),
            'FireBothCount': new FormControl('', Validators.required),
            'RimsTSTC': new FormControl('', Validators.required),
            'Other': new FormControl('', Validators.required),
        });
        this.bodyEditedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.bodySherdFormGroup);
    }

    public cancelBodyHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }


    public onTagChange(e: any) {
        this.tagNumber = e.target.value;
        this.showBody();
    }
    public onProcessedByChange(e: any) {
        this.processedby = e.target.value;
        this.showBody();
    }
    public onDueDateChange(e: any) {
        console.log(e);
        this.dueDate = e.target.value;
        this.showBody();
    }

    /** Custom function to check weather the to show the body based on three fields */
    private showBody() {
        if (this.editService.tagNumberFiledValid(this.tagNumber) && this.processedby !== '' && this.dueDate !== '') {
            this.isFormBodyVisible = true;
            // this.isFieldsLocked = true;
        } else {
            this.isFormBodyVisible = false;
            // this.isFieldsLocked  = false
        }
    }


    public saveBodyHandler({ sender, rowIndex, formGroup, isNew }) {
        console.log('Saving', formGroup.value);
        formGroup.value.FabricType = this.chosenBodyFabric;
        formGroup.value.SurfaceTreatment = this.chosenSurfaceTreatment;
        console.log('UPDATED', formGroup.value);
        this.editService.saveBody(formGroup.value, isNew);
        sender.closeRow(rowIndex);
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
        switch (this.chosenBodyFabric) {
            case 'Coarse':
                this.stList = this.bodyAllSurfaceTreatments;
                break;
            case 'Medium':
                this.stList = this.bodyAllSurfaceTreatments;
                break;
            case 'Fine':
                this.stList = this.bodyFineSurfaceTreatments;
                break;
            default:
                this.stList = this.bodyMarlSurfaceTreatments;
                break;
        }

    }
    public onBodySurfaceChange(e) {
        this.chosenSurfaceTreatment = e;
        console.log(this.chosenSurfaceTreatment);


    }
    /**Coarse Triage Functions */
    public fabric(id: number): any {
        return this.fabrics.find(x => x.FabricType === id);
    }
    public bodyOrDiagnostic(id): any {
        return this.bodOrDiagnostic.find(x => x.BD === id);
    }

    public options(id): any {
        return this.optionsList.find(x => x.type === id);
    }



    public onBodyStateChange(state: State) {
        this.bodyGridState = state;

        // this.editService.read();
    }
    public onStateChange(state: State) {
        this.gridState = state;

        // this.editService.read();
    }

    public addHandler({ sender }) {
        this.isKGs = false;
        console.log(sender);
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'FabricType': new FormControl('', Validators.required),
            'BodyOrDiagnostic': new FormControl('', Validators.required),
            'Options': new FormControl('', Validators.required),
            'KGs': new FormControl('', Validators.required),
            'Count': new FormControl('', Validators.required),
            'Weight': new FormControl('', Validators.required),
            'Comments': new FormControl(''),
            'Notes': new FormControl('')
        });

        sender.addRow(this.formGroup);
    }

    public editHandler({ sender, rowIndex, dataItem, formGroup}) {
        this.closeEditor(sender);
        console.log('SENDER', sender);
        console.log('FORMGROUP', formGroup);
        console.log('DATA ITEM', dataItem);
        this.formGroup = new FormGroup({
            'FabricType': new FormControl(dataItem.FabricType, Validators.required),
            'BodyOrDiagnostic': new FormControl(dataItem.BodyOrDiagnostic, Validators.required),
            'Options': new FormControl(dataItem.Options, Validators.required),
            'KGs': new FormControl(dataItem.KGs, Validators.required),
            'Count': new FormControl(dataItem.Count, Validators.required),
            'Weight': new FormControl(dataItem.Weight, Validators.required),
            'Comments': new FormControl(dataItem.Comments),
            'Notes': new FormControl(dataItem.Notes)
        });

        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler({ sender, rowIndex }) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }) {
        formGroup.value.KGs = this.isKGs ? 'kg' : 'g';
        formGroup.value.FabricType = this.chosenFabric;
        formGroup.value.Options = this.chosenOption;
        formGroup.value.BodyOrDiagnostic = this.chosenBodyOrDiagnostic;
        formGroup.value.Notes = formGroup.value.FabricType + ' Notes - ' + formGroup.value.Notes;
        // console.log('UPDATED', formGroup.value);

        // Offline Save
        // this.offlineDB.add(formGroup.value);

        this.editService.save(formGroup.value, isNew);

        sender.closeRow(rowIndex);
    }

    public removeHandler({ dataItem }) {
        this.editService.remove(dataItem);
    }

    public removeBodyHandler({ dataItem }) {
        this.editService.removeBody(dataItem);
    }


    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        console.log('closing editor');
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

    public onOptionsChange(e) {
        this.chosenOption = e;
        console.log(this.chosenOption);
    }

    public submitData(e) {
        console.log(this.tagNumber);
        this.editService.combineObjects(this.tagNumber, this.processedby, this.dueDate);
        this.clearForm();

        this.bodySherdFormGroup = new FormGroup({
            'FabricType': new FormControl('', Validators.required),
            'SurfaceTreatment': new FormControl('', Validators.required),
            'NormalWeight': new FormControl('', Validators.required),
            'NormalCount': new FormControl('', Validators.required),
            'FireInWeight': new FormControl('', Validators.required),
            'FireInCount': new FormControl('', Validators.required),
            'FireOutWeight': new FormControl('', Validators.required),
            'FireOutCount': new FormControl('', Validators.required),
            'FireBothWeight': new FormControl('', Validators.required),
            'FireBothCount': new FormControl('', Validators.required),
            'RimsTSTC': new FormControl('', Validators.required),
            'Other': new FormControl('', Validators.required),
        });

        this.formGroup = new FormGroup({
            'FabricType': new FormControl('', Validators.required),
            'BodyOrDiagnostic': new FormControl('', Validators.required),
            'Options': new FormControl('', Validators.required),
            'KGs': new FormControl('', Validators.required),
            'Count': new FormControl('', Validators.required),
            'Weight': new FormControl('', Validators.required),
            'Comments': new FormControl(''),
            'Notes': new FormControl('')
        });
    }

    public clearForm() {
        this.isKGs = false;
        this.tagNumber = "";
        this.processedby = "";
        this.dueDate = '';
    }
}
