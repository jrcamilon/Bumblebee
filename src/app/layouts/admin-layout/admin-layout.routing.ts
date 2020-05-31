import { Routes } from '@angular/router';
import { ProcessingComponent } from '../../processing/processing.component';
import { DashboardTwoComponent } from '../../dashboard-two/dashboard-two.component';
import { AuthGuard } from 'app/login-page/services/auth.guard';
import { DashboardThreeComponent } from '../../dashboard-three/dashboard-three.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'site',
    component: DashboardTwoComponent,
    canActivate: [AuthGuard] },
    { path: 'comparisson',
    component: DashboardThreeComponent,
    canActivate: [AuthGuard] },
    { path: 'processing',
    component: ProcessingComponent,
    canActivate: [AuthGuard] },
];
