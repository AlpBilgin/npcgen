import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { LandingComponent } from './component/landing.component';



import { EnumPipe } from './pipe/enum.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    LandingComponent,
    EnumPipe
  ],
  providers: [
    EnumPipe
  ],
  bootstrap: [LandingComponent]
})
export class AppModule { }
