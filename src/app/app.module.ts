import { CoreModule } from './../services/OfflineDB/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './login-page/services/auth.guard';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../services/security/token-interceptor.service';
import { DashboardTwoService } from './dashboard-two/Services/dashboard-two.service';

@NgModule({
   imports: [
      BrowserAnimationsModule,
      FormsModule,
      RouterModule,
      HttpModule,
      HttpClientModule,
      NavbarModule,
      FooterModule,
      SidebarModule,
      AppRoutingModule,
      ReactiveFormsModule,
      GridModule,
      InputsModule,
      CoreModule
   ],
   declarations: [
      AppComponent,
      AdminLayoutComponent,
      LoginPageComponent,
   ],
   providers: [ AuthGuard, DashboardTwoService,
   {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
   }
],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
