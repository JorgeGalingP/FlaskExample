import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { WordcountSevice } from './wordcount/wordcount.service';
import { ResultsChartComponent } from './results-chart/results-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [ WordcountSevice, Title ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
