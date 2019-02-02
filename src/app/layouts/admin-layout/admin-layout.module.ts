import { HomeMapComponent } from './../../home-map/home-map.component';
import { LoadingComponent } from './../../shared/loading/loading.component';
import { DataGridComponent } from './../../shared/grid/grid.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule } from '@ngui/map';

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
import { DualseriesradarComponent } from '../../dualseriesradar/dualseriesradar.component';
import { MaterialcardComponent } from '../../materialcard/materialcard.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { QuadseriesstackedbarComponent } from '../../quadseriesstackedbar/quadseriesstackedbar.component';
import { FunnelComponent } from '../../funnel/funnel.component';
import { FilterbarComponent } from '../../filterbar/filterbar.component';
import { MaindashmapComponent } from '../../maindashmap/maindashmap.component';
import { DetailspanelComponent } from '../../detailspanel/detailspanel.component';
import { DetailgridComponent } from '../../detailgrid/detailgrid.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MainDashboardComponent } from '../../main-dashboard/main-dashboard.component'
import { SiteMapComponent } from '../../main-dashboard/components/site-map/site-map.component'
import { MainDashMenuComponent } from '../../main-dashboard/components/main-dash-menu/main-dash-menu.component'

import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';


import 'hammerjs';
import { TableGridComponent } from 'app/tables/components/table-grid/table-grid.component';
import {
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
  MatTooltipModule
} from '@angular/material';
import { SplitterPaneRowComponent } from 'app/maps/components/splitter-pane-row/splitter-pane-row.component';
import { RednotebookFormComponent } from 'app/processing/components/rednotebook-form/rednotebook-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDFRoFDXtk-oTtHGvxEebGS_Bl8TQABdAM' }),
    ChartsModule,
    GridModule,
    ExcelModule,
    PDFModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDFRoFDXtk-oTtHGvxEebGS_Bl8TQABdAM' }),
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
    LayoutModule,
    InputsModule,
    DropDownsModule
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
    DataGridComponent,
    LoadingComponent,
    TableGridComponent,
    MaterialcardComponent,
    SplitterPaneRowComponent,
    SnackBarComponent,
    DualseriesradarComponent,
    QuadseriesstackedbarComponent,
    FunnelComponent,
    FilterbarComponent,
    MaindashmapComponent,
    DetailspanelComponent,
    DetailgridComponent,
    MainDashboardComponent,
    SiteMapComponent,
    MainDashMenuComponent,
    HomeMapComponent


  ],
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminLayoutModule { }
