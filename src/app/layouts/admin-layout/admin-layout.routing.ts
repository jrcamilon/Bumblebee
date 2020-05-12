import { HomeMapComponent } from './../../home-map/home-map.component';
import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ProcessingComponent } from '../../processing/processing.component';
import { DashboardTwoComponent } from '../../dashboard-two/dashboard-two.component';
import { MainDashboardComponent } from '../../main-dashboard/main-dashboard.component';
import { AuthGuard } from 'app/login-page/services/auth.guard';
import { DashboardThreeComponent } from '../../dashboard-three/dashboard-three.component';
// import { LoginPageComponent } from '../../login-page/login-page.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard', component: MainDashboardComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    // { path: 'user', component: UserComponent },
    { path: 'site', component: DashboardTwoComponent, canActivate: [AuthGuard] },
    { path: 'comparisson', component: DashboardThreeComponent, canActivate: [AuthGuard] },
    // { path: 'maps', component: MapsComponent },
    // { path: 'notifications', component: NotificationsComponent },
    { path: 'processing', component: ProcessingComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: LoginPageComponent }
    // { path: 'homemap', component: HomeMapComponent }


];
