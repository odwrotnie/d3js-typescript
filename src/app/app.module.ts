import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpinTheBottleComponent } from './chart/spin-the-bottle.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinTheBottleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
