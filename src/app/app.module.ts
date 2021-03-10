import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { CustomNumberPipe } from './pipes/custom-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CustomDatePipe,
    CustomNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
