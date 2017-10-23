import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LandingComponent } from './component/landing.component';

import { ClassService } from './service/class.service';
import { RaceService } from './service/race.service';
import { ActionService } from './service/action.service';
import { TraitService } from './service/trait.service';

import { CRService } from './service/cr.service';
import { EnumPipe } from './pipe/enum.pipe';
import { AbilityPipe } from './pipe/ability.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    LandingComponent,
    EnumPipe,
    AbilityPipe,
  ],
  providers: [
    EnumPipe,
    RaceService,
    CRService,
    ClassService,
    ActionService,
    TraitService,
  ],
  bootstrap: [LandingComponent]
})
export class AppModule { }
