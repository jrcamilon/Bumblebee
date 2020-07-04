
import { BodyProcessingComponent } from './../../processing/components/body-processing/body-processing.component';
// import { HomeMapComponent } from './../../home-map/home-map.component';
import { LoadingComponent } from './../../shared/loading/loading.component';
// import { DataGridComponent } from './../../shared/grid/grid.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule } from '@ngui/map';
import { AdminLayoutRoutes } from './admin-layout.routing';

// import { HomeComponent } from '../../home/home.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { UserComponent } from '../../user/user.component';
// import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
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
// import { DetailgridComponent } from '../../detailgrid/detailgrid.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// import { MainDashboardComponent } from '../../main-dashboard/main-dashboard.component'
// import { SiteMapComponent } from '../../main-dashboard/components/site-map/site-map.component'
// import { MainDashMenuComponent } from '../../main-dashboard/components/main-dash-menu/main-dash-menu.component'
import { KhppFormComponent } from '../../processing/components/khpp-form/khpp-form.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { KhppFabricRadarComponent } from '../../dashboard/visualizations/KhppFabricRadar/khpp-fabric-radar/khpp-fabric-radar.component';
// import { AgmCoreModule } from '@agm/core';
// import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { ElephantineComponent } from '../../processing/components/elephantine/elephantine.component';
import { BasicProcessingComponent } from '../../processing/components/elephantine/components/basic-processing/basic-processing.component';
// tslint:disable-next-line: max-line-length
import { DetailedEleProcessingComponent } from '../../processing/components/elephantine/components/detailed-ele-processing/detailed-ele-processing.component';
import { DetailedProcessingComponent } from '../../processing/components/detailed-processing/detailed-processing.component';
// tslint:disable-next-line: max-line-length

import { TreeMapComponent } from '../../dashboard-two/components/tree-map/tree-map.component';
import { FlowChartComponent } from '../../dashboard-two/components/flow-chart/flow-chart.component';
import { ChordChartComponent } from '../../dashboard-two/components/chord-chart/chord-chart.component';
import { PartitionedBarChartComponent } from '../../dashboard-two/components/partitioned-bar-chart/partitioned-bar-chart.component';
import { TimelineChartComponent } from '../../dashboard-two/components/timeline-chart/timeline-chart.component';
import { RadarChartComponent } from '../../dashboard-two/components/radar-chart/radar-chart.component';
import { ClusteredColumnComponent } from '../../dashboard-three/components/clustered-column/clustered-column.component';
import { DashboardThreeComponent } from '../../dashboard-three/dashboard-three.component';


import { PopupAnchorDirective } from '../../processing/components/khpp-form/popupanchor.directive';
import 'hammerjs';
// import { TableGridComponent } from 'app/tables/components/table-grid/table-grid.component';
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
// import { SplitterPaneRowComponent } from 'app/maps/components/splitter-pane-row/splitter-pane-row.component';
import { RednotebookFormComponent } from 'app/processing/components/rednotebook-form/rednotebook-form.component';
// tslint:disable-next-line: max-line-length
import { KhppBlackenedChartComponent } from 'app/dashboard/visualizations/KhppBlackenedChart/khpp-blackened-chart/khpp-blackened-chart.component';
// tslint:disable-next-line: max-line-length
import { FabricComparisonChartComponent } from 'app/dashboard/visualizations/FabricComparison/fabric-comparison-chart/fabric-comparison-chart.component';

import { DashFilterBarComponent } from 'app/dashboard/filterbar/filterbar.component';
import { FilterPipe } from 'app/processing/components/ceramics-form/filter.pipe';
import { DashboardTwoComponent } from 'app/dashboard-two/dashboard-two.component';
// import { LoginPageComponent } from 'app/login-page/login-page.component';
// import { KhppFabricRadarComponent } from 'app/dashboard/visualizations/KhppFabricRadar/khpp-fabric-radar/khpp-fabric-radar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../../../services/security/token-interceptor.service';
// import { AuthGuard} from '../../login-page/services/auth.guard';
import { DashboardTwoService } from 'app/dashboard-two/Services/dashboard-two.service';
// import { DashboardService } from 'services/DashboardService/dashboard.service';

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
    // AgmCoreModule.forRoot({ apiKey: 'AIzaSyDFRoFDXtk-oTtHGvxEebGS_Bl8TQABdAM' }),
    // AgmJsMarkerClustererModule,
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
    DropDownsModule,
    PopupModule
  ],
  entryComponents: [ProcessingComponent, SnackBarComponent],
  declarations: [
    // HomeComponent,
    UserComponent,
    // TablesComponent,
    TypographyComponent,
    IconsComponent,
    // MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ProcessingComponent,
    CeramicsFormComponent,
    RednotebookFormComponent,
    // DataGridComponent,
    LoadingComponent,
    // TableGridComponent,
    MaterialcardComponent,
    // SplitterPaneRowComponent,
    SnackBarComponent,
    DualseriesradarComponent,
    QuadseriesstackedbarComponent,
    FunnelComponent,
    FilterbarComponent,
    MaindashmapComponent,
    DetailspanelComponent,
    // DetailgridComponent,
    // MainDashboardComponent,
    // SiteMapComponent,
    // MainDashMenuComponent,
    // HomeMapComponent,
    KhppFormComponent,
    PopupAnchorDirective,
    BodyProcessingComponent,
    DetailedProcessingComponent,
    DashboardComponent,
    DashboardTwoComponent,
    DashboardThreeComponent,
    KhppFabricRadarComponent,
    KhppBlackenedChartComponent,
    FabricComparisonChartComponent,
    DashFilterBarComponent,
    FilterPipe,
    ElephantineComponent,
    BasicProcessingComponent,
    DetailedEleProcessingComponent,
    TreeMapComponent,
    FlowChartComponent,
    RadarChartComponent,
    ChordChartComponent,
    PartitionedBarChartComponent,
    TimelineChartComponent,
    ClusteredColumnComponent
  ],
  providers: [ DashboardTwoService,
   {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
   }
  ]
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminLayoutModule { }
