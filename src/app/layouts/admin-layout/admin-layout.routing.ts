import { HomeMapComponent } from './../../home-map/home-map.component';
import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ProcessingComponent } from '../../processing/processing.component';
import { MainDashboardComponent } from '../../main-dashboard/main-dashboard.component';


export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard', component: MainDashboardComponent },
    { path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TablesComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'processing', component: ProcessingComponent },
    { path: 'homemap', component: HomeMapComponent }


];
