import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LandingComponent } from './component/landing.component';

import { ClassService } from './service/class.service';
import { RaceService } from './service/race.service';
import { CRService } from './service/cr.service';
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
    EnumPipe,
    RaceService,
    CRService,
    ClassService,
  ],
  bootstrap: [LandingComponent]
})
export class AppModule { }
