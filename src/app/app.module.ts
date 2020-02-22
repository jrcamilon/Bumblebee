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
// import { DetailedEleProcessingComponent } from './processing/components/elephantine/components/detailed-ele-processing/detailed-ele-processing.component';
// import { ElephantineComponent } from './processing/components/elephantine/elephantine.component';
// import { BasicProcessingComponent } from './processing/components/elephantine/components/basic-processing/basic-processing.component';
// // tslint:disable-next-line: max-line-length
// import { DetailedProcessingComponent } from './processing/components/elephantine/components/detailed-processing/detailed-processing.component';


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
      // DetailedEleProcessingComponent,
      // ElephantineComponent,
      // BasicProcessingComponent,
      // DetailedProcessingComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
