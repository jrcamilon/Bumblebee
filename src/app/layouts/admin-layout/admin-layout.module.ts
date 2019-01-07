import { LoadingComponent } from './../../shared/loading/loading.component';
import { DataGridComponent } from './../../shared/grid/grid.component';
import { DataTableComponent } from './../../tables/components/data-table/data-table.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ProcessingComponent, SnackBarComponent } from '../../processing/processing.component';
import { CeramicsFormComponent } from '../../processing/components/ceramics-form/ceramics-form.component';
import {Panel1radarComponent} from '../../visualizations/panel1radar/panel1radar.component'
import {Panel2radarComponent} from '../../visualizations/panel2radar/panel2radar.component'
import { MaterialcardComponent} from '../../materialcard/materialcard.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import 'hammerjs';
import { TableGridComponent } from 'app/tables/components/table-grid/table-grid.component';
import { MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';
import { SplitterPaneRowComponent } from 'app/maps/components/splitter-pane-row/splitter-pane-row.component';
import { RednotebookFormComponent } from 'app/processing/components/rednotebook-form/rednotebook-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDFRoFDXtk-oTtHGvxEebGS_Bl8TQABdAM'}),
    ChartsModule,
    GridModule,
    ExcelModule,
    PDFModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDFRoFDXtk-oTtHGvxEebGS_Bl8TQABdAM'}),
    AgmJsMarkerClustererModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    DialogModule,
    ButtonsModule,
    LayoutModule
  ],
  entryComponents: [ProcessingComponent, SnackBarComponent],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ProcessingComponent,
    CeramicsFormComponent,
    RednotebookFormComponent,
    DataTableComponent,
    DataGridComponent,
    LoadingComponent,
    TableGridComponent,
    Panel1radarComponent,
    Panel2radarComponent,
    MaterialcardComponent,
    SplitterPaneRowComponent,
    SnackBarComponent
  ]
})

export class AdminLayoutModule {}
