import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClassService } from '../service/class.service';
import { RaceService } from '../service/race.service';
import { CRService } from '../service/cr.service';
import { EnumPipe } from '../pipe/enum.pipe';
import { AbilityPipe } from '../pipe/ability.pipe';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandingComponent } from './landing.component';

describe('BannerComponent (inline template)', () => {

  let comp: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
      ],
      declarations: [
        LandingComponent,
        EnumPipe,
        AbilityPipe
      ],
      providers: [
        RaceService,
        CRService,
        ClassService,
      ]
    });

    fixture = TestBed.createComponent(LandingComponent);

    comp = fixture.componentInstance; // LandingComponent test instance
  });

  it('should find a header', () => {
    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    expect(el).toBeDefined();
  });
});
