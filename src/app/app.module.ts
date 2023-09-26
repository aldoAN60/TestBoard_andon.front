import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphsComponent } from './graphs/graphs.component';
import { NgChartsModule } from 'ng2-charts';
import { ExcelComponent } from './excel/excel.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphsComponent,
    ExcelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
