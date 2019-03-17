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

// import { DualseriesradarComponent } from './dualseriesradar/dualseriesradar.component';

@NgModule({
   imports: [
      BrowserAnimationsModule,
      FormsModule,
      RouterModule,
      HttpModule,
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
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
