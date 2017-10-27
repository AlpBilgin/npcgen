import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { LandingComponent } from './landing.component';

describe('BannerComponent (inline template)', () => {
    
      let comp:    LandingComponent;
      let fixture: ComponentFixture<LandingComponent>;
      let de:      DebugElement;
      let el:      HTMLElement;
    
      beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [ LandingComponent ], // declare the test component
        });
    
        fixture = TestBed.createComponent(LandingComponent);
    
        comp = fixture.componentInstance; // LandingComponent test instance
    
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
      });
    });