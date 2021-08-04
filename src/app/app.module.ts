import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MaterialModule } from "@app/material.module";
import { AdminModule } from '@pages/admin/admin.module';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { AdminInterceptor } from '@shared/interceptors/admin.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    SidebarModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
