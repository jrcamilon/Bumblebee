
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
import { ProcessingComponent } from '../../processing/processing.component';
import { CeramicsFormComponent } from '../../processing/components/ceramics-form/ceramics-form.component';


import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule } from '@progress/kendo-angular-grid';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import 'hammerjs';
import { TableGridComponent } from 'app/tables/components/table-grid/table-grid.component';
import { MatCardModule, MatButtonModule, MatSelectModule} from '@angular/material';

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
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDFRoFDXtk-oTtHGvxEebGS_Bl8TQABdAM'}),
    AgmJsMarkerClustererModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule

  ],
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
    DataTableComponent,
    DataGridComponent,
    LoadingComponent,
    TableGridComponent
  ]
})

export class AdminLayoutModule {}
